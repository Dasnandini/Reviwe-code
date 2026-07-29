import { z } from "zod";

export const suggestionSchema = z.object({
  title: z.string().min(1, "Suggestion title is required").max(200).optional(),
  description: z.string().min(1, "Suggestion description is required").max(1000).optional(),
  severity: z.enum(["low", "medium", "high"]).optional(),
  line: z.number().int().nonnegative().optional(),
  suggestion: z.string().min(1, "Suggestion text is required").max(1000).optional(),
});

export const scoreSchema = z.object({
  overall: z.number().min(0).max(10).optional(),
  performance: z.number().min(0).max(10).optional(),
  accessibility: z.number().min(0).max(10).optional(),
  codeQuality: z.number().min(0).max(10).optional(),
  nextjs: z.number().min(0).max(10).optional(),
  security: z.number().min(0).max(10).optional(),
});

export const reviewSchema = z.object({
  userId: z.string().optional(),
  // Model left optional; provider will select a sensible default when not provided.
  model: z.string().max(100).optional(),
  language: z.string().min(1, "Language is required").max(50),
  filename: z
    .string()
    .min(1, "Filename is required")
    .max(200, "Filename is too long"),
  code: z.string().min(1, "Code is required"),
  summary: z.string().max(1000).optional(),
  score: scoreSchema.optional(),
  bugs: z.array(suggestionSchema).optional(),
  performance: z.array(suggestionSchema).optional(),
  accessibility: z.array(suggestionSchema).optional(),
  cleanCode: z.array(suggestionSchema).optional(),
  tailwind: z.array(suggestionSchema).optional(),
  nextjs: z.array(suggestionSchema).optional(),
  security: z.array(suggestionSchema).optional(),
  // AI provider used to generate the review. Accept provider names used by the API.
  provider: z.enum(["openai", "gemini"]).optional(),
});

export const reviewUpdateSchema = reviewSchema.partial();

export type ReviewInput = z.infer<typeof reviewSchema>;
export type ReviewUpdateInput = z.infer<typeof reviewUpdateSchema>;
