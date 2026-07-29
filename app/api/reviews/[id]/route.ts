import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ReviewRepository } from "@/repositories/review.repository";
import { successResponse, errorResponse } from "@/utils/response";
import { reviewUpdateSchema } from "@/validators/review.validator";

const reviewRepository = new ReviewRepository();

type ReviewRouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: ReviewRouteContext) {
  try {
    await connectDB();

    const { id } = await params;
    const review = await reviewRepository.findById(id);
    if (!review) return errorResponse("Review not found", null, 404);

    return successResponse("Fetched review", review, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Unable to fetch review", null, 400);
  }
}

export async function DELETE(_req: NextRequest, { params }: ReviewRouteContext) {
  try {
    await connectDB();

    const { id } = await params;
    const deleted = await reviewRepository.deleteById(id);
    if (!deleted) return errorResponse("Review not found", null, 404);

    return successResponse("Deleted review", deleted, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Unable to delete review", null, 400);
  }
}

export async function PATCH(req: NextRequest, { params }: ReviewRouteContext) {
  try {
    await connectDB();

    const body = await req.json();
    const parsed = reviewUpdateSchema.safeParse(body);
    if (!parsed.success) return errorResponse("Invalid update data", parsed.error.format(), 400);

    const { id } = await params;
    const updated = await reviewRepository.updateById(id, parsed.data);
    if (!updated) return errorResponse("Review not found", null, 404);

    return successResponse("Updated review", updated, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Unable to update review", null, 400);
  }
}
