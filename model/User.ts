import mongoose, { type HydratedDocument, Schema, model, models, type Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  provider?: "credentials" | "google" | "github";
  isVerified?: boolean;
  providerConfig?: {
    providerName?: "openai" | "gemini";
    apiKey?: string; // encrypted
    model?: string;
  };
}

export type UserDocument = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser, Model<IUser>>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: String,

    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      default: "credentials",
    },

    providerConfig: {
      providerName: {
        type: String,
        enum: ["openai", "gemini"],
      },
      apiKey: String, // encrypted
      model: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;