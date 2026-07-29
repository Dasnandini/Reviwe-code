"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const MonacoEditor = dynamic(() => import("./Editor"), { ssr: false });

const checks = [
  ["Syntax", "Completed"],
  ["Performance", "Completed"],
  ["Accessibility", "Completed"],
  ["Security", "Completed"],
  ["AI Thinking...", "In progress"],
];

function AiChip({ large = false }: { large?: boolean }) {
  return (
    <div className={`relative grid place-items-center rounded-full bg-amber-100 text-amber-500 ${large ? "h-24 w-24" : "h-11 w-11"}`}>
      <span className="absolute inset-3 rounded-lg border border-dashed border-amber-400" />
      <svg viewBox="0 0 24 24" aria-hidden="true" className={large ? "h-12 w-12" : "h-7 w-7"}>
        <rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.2 15 11 9h2l1.8 6M10 13h4M4 9h2M4 15h2M18 9h2M18 15h2M9 4v2M15 4v2M9 18v2M15 18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SelectBox({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="mb-2 block text-xs font-medium text-slate-500">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-950 outline-none focus:border-amber-400">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ReviewPage() {
  const [code, setCode] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [language, setLanguage] = useState("React");
  const [provider, setProvider] = useState("openai");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (analyzing) {
    return (
      <section className="grid min-h-full place-items-center px-8 py-10">
        <div className="w-full max-w-[680px] rounded-lg border border-slate-200 bg-white px-20 py-16 text-center shadow-sm">
          <div className="mx-auto w-fit">
            <AiChip large />
          </div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight">Analyzing Code...</h1>
          <p className="mt-3 text-sm text-slate-500">Please wait while we review your code.</p>

          <div className="mx-auto mt-10 max-w-[470px] space-y-6 text-left">
            {checks.map(([label, status], index) => (
              <div key={label} className="grid grid-cols-[24px_1fr_auto] items-center gap-4 text-sm">
                <span className={`grid h-5 w-5 place-items-center rounded-full ${index === checks.length - 1 ? "border-2 border-amber-400 border-t-transparent" : "bg-amber-400 text-white"}`}>
                  {index !== checks.length - 1 && (
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
                      <path d="m5 10.2 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="font-semibold text-slate-950">{label}</span>
                <span className="text-xs text-slate-500">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-full px-8 py-10">
      <div className="mx-auto max-w-[820px]">
        <div className="pt-6">
          <h1 className="text-[27px] font-bold tracking-tight">New Review</h1>
          <p className="mt-2 text-sm text-slate-500">Paste your code and let AI review it.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid h-[540px] grid-cols-[44px_1fr]">
            <div className="border-r border-slate-200 bg-slate-50 px-3 py-5 text-right font-mono text-sm leading-7 text-slate-400">1</div>
            <div className="min-w-0">
              <MonacoEditor value={code || "// Paste your code here..."} onChange={(value: string) => setCode(value)} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]">
          <SelectBox label="Language" value={language} options={["React", "Next.js", "TypeScript", "JavaScript"]} onChange={setLanguage} />
          <SelectBox label="Provider" value={provider} options={["openai", "gemini"]} onChange={setProvider} />
          <button
            type="button"
            onClick={async () => {
              setError(null);
              setAnalyzing(true);
              try {
                const body = {
                  code,
                  language,
                  provider,
                  filename: "Untitled Review",
                };

                const res = await fetch("/api/reviews", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });

                const json = await res.json().catch(() => ({}));
                if (!res.ok) {
                  const msg = json?.message || "Failed to create review";
                  setError(msg);
                  setAnalyzing(false);
                  return;
                }

                const id = json.data?._id || json.data?.id;
                if (id) {
                  router.push(`/dashboard/review/${id}`);
                } else {
                  setError("Review created but no id returned");
                  setAnalyzing(false);
                }
              } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : String(err));
                setAnalyzing(false);
              }
            }}
            className="mt-6 inline-flex h-11 items-center justify-center gap-3 rounded-md bg-amber-400 px-7 text-sm font-bold text-slate-950 shadow-sm hover:bg-amber-300 md:mt-[22px]"
            disabled={analyzing}
          >
            Review Code
            <span className="text-xl leading-none">›</span>
          </button>
        </div>
        {error && (
          <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
