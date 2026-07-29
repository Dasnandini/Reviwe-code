import { buildReviewPrompt } from '@/lib/prompt-builder';
import type { ReviewProvider, ReviewProviderConfig, ReviewRequestOptions } from './provider.types';
import { generateMockReview } from './mock.provider';

export class GeminiProvider implements ReviewProvider {
  constructor(private readonly config: ReviewProviderConfig) {}

  async generateReview(code: string, options: ReviewRequestOptions = {}): Promise<string> {
    const prompt = buildReviewPrompt(code, options);
    const apiKey = this.config.apiKey;
    // Use a known Generative Language model id by default to avoid 404s.
    const model = this.config.model || options.model || "models/text-bison-001";

    if (!apiKey) {
      // dev fallback: return a mock JSON review for local testing
      return Promise.resolve(generateMockReview(code, options, 'gemini'));
    }

    // Use Google Generative Language API endpoint. Accept API key via query param for simplicity.
    const url = `https://generativelanguage.googleapis.com/v1beta2/models/${encodeURIComponent(model)}:generate?key=${encodeURIComponent(
      apiKey
    )}`;

    const body = {
      prompt: { text: prompt },
      temperature: 0.0,
      maxOutputTokens: 2000,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Gemini API error: ${res.status} ${txt}`);
    }

    const json = await res.json().catch(() => null);
    if (!json) throw new Error("Gemini returned no JSON");

    // Attempt to extract text from several possible response shapes
    const candidates = json.candidates || json.output || json.responses || null;
    const first = Array.isArray(candidates) && candidates.length ? candidates[0] : null;

    const content =
      (first && (first.content || first.text || first.output)) || // common shapes
      json?.content ||
      json?.answer?.content ||
      json?.response ||
      null;

    // If content is an object with 'text' or 'content' fields, try deeper
    let final = null;
    if (typeof content === "string") final = content;
    else if (content && typeof content === "object") final = content.text || content.content || JSON.stringify(content);

    if (!final) {
      // Try candidates array with 'content' property
      if (first) {
        if (typeof first === "string") final = first;
        else if (first.content) final = first.content;
        else if (first.text) final = first.text;
      }
    }

    if (!final) {
      // as a last resort, stringify the whole response
      final = JSON.stringify(json);
    }

    return String(final);
  }
}
