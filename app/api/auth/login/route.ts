import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { AuthService } from "@/service/auth.service";
import { loginSchema } from "@/validators/auth.validator";
import { errorResponse, successResponse } from "@/utils/response";

const authService = new AuthService();

const setAuthCookie = (response: NextResponse, token: string) => {
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse("Invalid login data", parsed.error.format(), 400);
    }

    const { email, password } = parsed.data;
    const result = await authService.login(email, password);

    const response = successResponse(
      "Logged in successfully",
      {
        user: {
          id: result.user._id.toString(),
          name: result.user.name,
          email: result.user.email,
        },
      },
      200
    );

    setAuthCookie(response, result.token);
    return response;
  } catch (error: any) {
    return errorResponse(error.message || "Unable to login", null, 400);
  }
}
