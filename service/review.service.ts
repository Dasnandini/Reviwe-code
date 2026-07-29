import { ReviewRepository } from '@/repositories/review.repository';
import { createProvider } from '@/providers/provider.factory';
import type { ProviderName, ReviewProviderConfig } from '@/providers/provider.types';
import { reviewSchema } from '@/validators/review.validator';
import type { ReviewInput } from '@/validators/review.validator';

export class ReviewService {
  constructor(
    private readonly reviewRepository = new ReviewRepository()
  ) {}

  async createReview(input: ReviewInput, provider: ProviderName, providerConfig: ReviewProviderConfig) {
    const validation = reviewSchema.safeParse(input);
    if (!validation.success) {
      throw new Error('Invalid review input: ' + JSON.stringify(validation.error.format()));
    }

    const reviewProvider = createProvider(provider, providerConfig);
    const rawResponse = await reviewProvider.generateReview(input.code, {
      language: input.language,
      filename: input.filename,
      model: input.model,
    });

    const parsedResponse = this.parseReviewResponse(rawResponse);
    const validatedResponse = reviewSchema.safeParse({
      ...input,
      ...parsedResponse,
      provider,
    });

    if (!validatedResponse.success) {
      throw new Error('Invalid provider response: ' + JSON.stringify(validatedResponse.error.format()));
    }

    return await this.reviewRepository.create(validatedResponse.data);
  }

  private parseReviewResponse(response: string): Partial<ReviewInput> {
    const tryParse = (text: string) => {
      try {
        return JSON.parse(text) as Partial<ReviewInput>;
      } catch {
        return null;
      }
    };

    // 1) Try parsing the whole response
    let parsed = tryParse(response);
    if (parsed) return parsed;

    // 2) Remove common markdown code fences and try again
    const withoutFences = response.replace(/```(?:json)?\s*\n?/gi, "").replace(/```/g, "");
    parsed = tryParse(withoutFences);
    if (parsed) return parsed;

    // 3) Try to extract the first {...} JSON-looking substring via regex
    const match = withoutFences.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = tryParse(match[0]);
      if (parsed) return parsed;
    }

    // 4) Fallback to slicing from first '{' to last '}' and parse
    const first = response.indexOf("{");
    const last = response.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
      const json = response.slice(first, last + 1);
      parsed = tryParse(json);
      if (parsed) return parsed;
    }

    // If all attempts fail, include a snippet of the response to aid debugging
    const snippet = response.length > 1000 ? response.slice(0, 1000) + "..." : response;
    throw new Error(`Unable to parse AI response as JSON. Response snippet: ${snippet}`);
  }
}
