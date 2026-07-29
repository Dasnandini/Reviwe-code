import mongoose, { type HydratedDocument, Schema, model, models, type Model } from "mongoose";

export interface ISuggestion {
  title?: string;
  description?: string;
  severity?: "low" | "medium" | "high";
  line?: number;
  suggestion?: string;
}

export interface IReviewScore {
  overall?: number;
  performance?: number;
  accessibility?: number;
  codeQuality?: number;
  nextjs?: number;
  security?: number;
}

export interface IReview {
  userId?: mongoose.Schema.Types.ObjectId | string;
  model?: string;
  language?: string;
  filename?: string;
  code?: string;
  score?: IReviewScore;
  summary?: string;
  bugs?: ISuggestion[];
  performance?: ISuggestion[];
  accessibility?: ISuggestion[];
  cleanCode?: ISuggestion[];
  tailwind?: ISuggestion[];
  nextjs?: ISuggestion[];
  security?: ISuggestion[];
}

export type ReviewDocument = HydratedDocument<IReview>;

const SuggestionSchema = new Schema(
  {
    title: String,

    description: String,

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    line: Number,

    suggestion: String,
  },
  {
    _id: false,
  }
);

const ScoreSchema = new Schema(
  {
    overall: Number,

    performance: Number,

    accessibility: Number,

    codeQuality: Number,

    nextjs: Number,

    security: Number,
  },
  {
    _id: false,
  }
);

const ReviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    model: String,

    language: String,

    filename: String,

    code: String,

    score: ScoreSchema,

    summary: String,

    bugs: [SuggestionSchema],

    performance: [SuggestionSchema],

    accessibility: [SuggestionSchema],

    cleanCode: [SuggestionSchema],

    tailwind: [SuggestionSchema],

    nextjs: [SuggestionSchema],

    security: [SuggestionSchema],
  },
  {
    timestamps: true,
  }
);

const Review = (models.Review as Model<IReview>) || model<IReview>("Review", ReviewSchema);

export default Review;