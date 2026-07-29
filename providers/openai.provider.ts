import { buildReviewPrompt } from '@/lib/prompt-builder';
import type { ReviewProvider, ReviewProviderConfig, ReviewRequestOptions } from './provider.types';
import { generateMockReview } from './mock.provider';

export class OpenAIProvider implements ReviewProvider {
  constructor(private readonly config: ReviewProviderConfig) {}

  async generateReview(code: string, options: ReviewRequestOptions = {}): Promise<string> {
    const prompt = buildReviewPrompt(code, options);
    const apiKey = this.config.apiKey;
    const model = this.config.model || options.model || "gpt-4o-mini";

    if (!apiKey) {
      // In development if no key is configured, return a mock JSON review
      return Promise.resolve(generateMockReview(code, options, 'openai'));
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2500,
        temperature: 0.0,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`OpenAI API error: ${res.status} ${text}`);
    }

    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (!content) throw new Error("OpenAI returned no content");
    return String(content);
  }
}
