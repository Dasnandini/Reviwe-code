export function generateMockReview(code: string, options: { language?: string; filename?: string; model?: string } = {}, providerName = "openai") {
  const model = options.model || (providerName === "openai" ? "gpt-4o-mini" : "gemini-pro");
  const language = options.language || "React";
  const filename = options.filename || "Untitled Review";

  const mock = {
    model,
    language,
    filename,
    code,
    summary: "Mock review: Code looks generally good with a few suggestions.",
    score: { overall: 90, performance: 8, accessibility: 8, codeQuality: 9, security: 8 },
    bugs: [
      { title: "Minor bug example", description: "Example: missing key prop in a list", severity: "low", line: 12, suggestion: "Add a unique key to list items" },
    ],
    performance: [
      { title: "Bundle size", description: "Consider dynamic imports for heavy modules", severity: "medium" },
    ],
    accessibility: [
      { title: "Alt attributes", description: "Provide alt text for images", severity: "low" },
    ],
    security: [],
    tailwind: [],
    cleanCode: [],
    nextjs: [],
    provider: providerName,
  };

  return JSON.stringify(mock);
}
