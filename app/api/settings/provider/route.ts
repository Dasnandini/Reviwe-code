import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/utils/jwt";
import { UserRepository } from "@/repositories/user.repository";
import { encrypt, decrypt } from "@/utils/crypto";
import { getEnvApiKey, getEnvProvider } from "@/providers/provider.factory";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const userRepository = new UserRepository();
    const user = await userRepository.findUserById(payload.id);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const config = user.providerConfig || null;
    let providerConfig = null;

    if (config?.apiKey) {
      let maskedApiKey = null;
      try {
        const decrypted = decrypt(config.apiKey);
        const len = decrypted.length;
        maskedApiKey = len > 4 ? `****${decrypted.slice(-4)}` : "****";
      } catch {
        maskedApiKey = "****";
      }

      providerConfig = {
        providerName: config.providerName,
        apiKey: maskedApiKey,
        model: config.model,
      };
    } else {
      const envProvider = getEnvProvider();
      if (envProvider) {
        providerConfig = {
          providerName: envProvider,
          apiKey: "Configured from environment",
          model: null,
        };
      }
    }

    return NextResponse.json({ success: true, data: { providerConfig } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Unable to fetch provider config" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const body = await req.json();
    const { providerName, apiKey, model } = body;

    if (!providerName) {
      return NextResponse.json({ success: false, message: "providerName is required" }, { status: 400 });
    }

    const envApiKey = getEnvApiKey(providerName);
    const finalApiKey = apiKey || envApiKey;

    if (!finalApiKey) {
      return NextResponse.json({ success: false, message: "providerName and apiKey are required" }, { status: 400 });
    }

    const encrypted = encrypt(finalApiKey);

    const userRepository = new UserRepository();
    const updated = await userRepository.updateUser(payload.id, { providerConfig: { providerName, apiKey: encrypted, model } });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Unable to update user" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Provider config saved" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Unable to save provider config" }, { status: 500 });
  }
}
