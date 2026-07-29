import mongoose from "mongoose";
import Review, { type IReview, type ReviewDocument } from "@/model/Review";

export class ReviewRepository {
  async create(review: IReview): Promise<ReviewDocument> {
    const newReview = new Review(review);
    return await newReview.save();
  }

  async findById(id: string): Promise<ReviewDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Review.findById(id);
  }

  async findByUserId(userId: string): Promise<ReviewDocument[]> {
    if (!mongoose.Types.ObjectId.isValid(userId)) return [];
    return await Review.find({ userId });
  }

  async findAll(): Promise<ReviewDocument[]> {
    return await Review.find();
  }

  async updateById(id: string, updatedData: Partial<IReview>): Promise<ReviewDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Review.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async deleteById(id: string): Promise<ReviewDocument | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Review.findByIdAndDelete(id);
  }

  async search(query: string): Promise<ReviewDocument[]> {
    const search = query.trim();
    if (!search) return [];

    return await Review.find({
      $or: [
        { model: { $regex: search, $options: "i" } },
        { language: { $regex: search, $options: "i" } },
        { filename: { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
      ],
    });
  }

  async countByUser(userId: string): Promise<number> {
    if (!mongoose.Types.ObjectId.isValid(userId)) return 0;
    return await Review.countDocuments({ userId });
  }

  async exists(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    return await Review.exists({ _id: id }) !== null;
  }
}
