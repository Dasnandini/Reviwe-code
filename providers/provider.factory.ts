
import type { ProviderName, ReviewProviderConfig, ReviewProvider } from './provider.types';
import { OpenAIProvider } from './openai.provider';
import { GeminiProvider } from './gemini.provider';

const ENV_KEY_NAMES: Record<ProviderName, Array<keyof NodeJS.ProcessEnv>> = {
  openai: ["OPENAI_API_KEY", "openai_api_key"],
  gemini: ["GEMINI_API_KEY", "gemini_api_key"],
};

export const getEnvApiKey = (provider: ProviderName): string | undefined => {
  for (const key of ENV_KEY_NAMES[provider]) {
    const value = process.env[key];
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  }
  return undefined;
};

export const getEnvProvider = (): ProviderName | undefined => {
  const providers = (['openai', 'gemini'] as ProviderName[]).filter((provider) => !!getEnvApiKey(provider));
  return providers.length === 1 ? providers[0] : undefined;
};

export const createProvider = (provider: ProviderName, config: ReviewProviderConfig): ReviewProvider => {
  switch (provider) {
    case 'openai':
      return new OpenAIProvider(config);
    case 'gemini':
      return new GeminiProvider(config);
    default:
      throw new Error(`Provider "${provider}" is not supported.`);
  }
};
