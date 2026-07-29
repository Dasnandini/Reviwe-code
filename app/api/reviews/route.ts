import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReviewService } from "@/service/review.service";
import { ReviewRepository } from "@/repositories/review.repository";
import { successResponse, errorResponse } from "@/utils/response";
import { getEnvApiKey } from "@/providers/provider.factory";
import type { ProviderName, ReviewProviderConfig } from "@/providers/provider.types";

const reviewService = new ReviewService();
const reviewRepository = new ReviewRepository();

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const provider = (body.provider as ProviderName) || "openai";
    const providerApiKey = body.apiKey || getEnvApiKey(provider);

    if (!providerApiKey) {
      throw new Error(`API key is required for provider ${provider}`);
    }

    const providerConfig: ReviewProviderConfig = {
      apiKey: providerApiKey,
      model: body.model,
    };

    const created = await reviewService.createReview(body, provider, providerConfig);

    return successResponse("Review created", created, 201);
  } catch (error: any) {
    return errorResponse(error.message || "Unable to create review", null, 400);
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const q = url.searchParams.get("q");

    let data;

    if (userId) {
      data = await reviewRepository.findByUserId(userId);
    } else if (q) {
      data = await reviewRepository.search(q);
    } else {
      data = await reviewRepository.findAll();
    }

    return successResponse("Fetched reviews", data, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Unable to fetch reviews", null, 400);
  }
}
