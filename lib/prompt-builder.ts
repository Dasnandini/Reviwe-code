export interface PromptOptions {
  language?: string;
  filename?: string;
}

export const buildReviewPrompt = (code: string, options: PromptOptions = {}): string => {
  const { language = 'React/Next.js', filename } = options;
  const fileReference = filename ? ` from ${filename}` : '';

  return `Review this ${language} code${fileReference}.

Return ONLY JSON.

Evaluate:
- Bugs
- Performance
- Accessibility
- Security
- Tailwind
- Clean Code
- Best Practices

Give severity.
Give fixes.
Give overall score.

Code:
${code}`;
};
