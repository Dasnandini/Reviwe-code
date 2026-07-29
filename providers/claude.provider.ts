import { buildReviewPrompt } from '@/lib/prompt-builder';
import type { ReviewProvider, ReviewProviderConfig, ReviewRequestOptions } from './provider.types';

export class ClaudeProvider implements ReviewProvider {
  constructor(private readonly config: ReviewProviderConfig) {}

  async generateReview(code: string, options: ReviewRequestOptions = {}): Promise<string> {
    const prompt = buildReviewPrompt(code, options);
    // TODO: integrate with the Claude API using config.apiKey and config.model.
    return Promise.resolve(`Claude provider prompt:\n${prompt}`);
  }
}
