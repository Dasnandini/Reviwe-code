export type ProviderName = 'openai' | 'gemini' ;

export interface ReviewRequestOptions {
  language?: string;
  filename?: string;
  model?: string;
  maxTokens?: number;
}

export interface ReviewProviderConfig {
  apiKey: string;
  model?: string;
  [key: string]: unknown;
}

export interface ReviewProvider {
  generateReview(code: string, options?: ReviewRequestOptions): Promise<string>;
}
