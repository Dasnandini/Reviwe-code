"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const demoReview = {
  filename: "Review Results",
  model: "OpenAI (GPT-5.5)",
  language: "React",
  summary: "Great job! Your code is clean and well-structured.",
  code: `export default function Home() {

  return(
    <div>
      <h1>Hello</h1>
    </div>
  )
}`,
};

type ReviewResult = {
  filename?: string;
  model?: string;
  language?: string;
  summary?: string;
  code?: string;
};

const resultRows = [
  { label: "Summary", status: "", icon: "doc", color: "slate" },
  { label: "Issues", status: "2", icon: "warn", color: "red" },
  { label: "Suggestions", status: "3", icon: "spark", color: "amber" },
  { label: "Performance", status: "Medium", icon: "bolt", color: "amber" },
  { label: "Accessibility", status: "Good", icon: "access", color: "green" },
  { label: "Security", status: "Good", icon: "shield", color: "green" },
  { label: "Tailwind Best Practices", status: "Good", icon: "star", color: "green" },
];

function StatusPill({ row }: { row: (typeof resultRows)[number] }) {
  if (!row.status) return null;
  const classes =
    row.color === "red"
      ? "bg-red-500 text-white"
      : row.color === "amber"
        ? "bg-amber-100 text-amber-600"
        : "bg-emerald-100 text-emerald-600";
  return <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${classes}`}>{row.status}</span>;
}

function RowIcon({ color }: { color: string }) {
  const classes =
    color === "red"
      ? "text-red-500"
      : color === "amber"
        ? "text-amber-500"
        : color === "green"
          ? "text-emerald-500"
          : "text-slate-500";
  return (
    <span className={classes}>
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <path d="M10 3.5 16.5 16h-13z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 7.8v3.4M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function ReviewDetailPage() {
  const params = useParams();
  const id = (params as { id?: string })?.id;
  const [review, setReview] = useState<ReviewResult>(demoReview);
  const [loading, setLoading] = useState(id !== "demo");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id || id === "demo") return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/reviews/${id}`);
        if (!res.ok) throw new Error("Failed to fetch review");
        const json = await res.json();
        setReview(json.data || demoReview);
      } catch {
        setReview(demoReview);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  return (
    <section className="relative min-h-full px-8 py-8">
      <div className="mx-auto max-w-[820px]">
        <Link href="/dashboard/review" className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-950">
          <span>‹</span>
          Back to Editor
        </Link>

        <h1 className="mt-6 text-[27px] font-bold tracking-tight">{loading ? "Review Results" : review.filename || "Review Results"}</h1>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex h-11 items-center justify-between border-b border-slate-200 px-4">
              <h2 className="text-sm font-bold">Original Code</h2>
              <button aria-label="Copy code" className="text-slate-400 hover:text-slate-700">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                  <path d="M7 7h8v8H7zM5 13H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <pre className="min-h-[490px] overflow-auto p-5 font-mono text-[13px] leading-7 text-blue-700">
              <code>{review.code || demoReview.code}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
              <h2 className="text-left text-sm font-bold">Overall Score</h2>
              <div className="mx-auto mt-4 grid h-28 w-28 place-items-center rounded-full border-[7px] border-emerald-500">
                <div className="text-3xl font-bold">92<span className="text-sm font-semibold">/100</span></div>
              </div>
              <p className="mx-auto mt-5 max-w-[260px] text-sm leading-6 text-slate-500">{review.summary || demoReview.summary}</p>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              {resultRows.map((row) => (
                <button key={row.label} className="grid h-12 w-full grid-cols-[22px_1fr_auto_20px] items-center gap-3 border-b border-slate-200 px-4 text-left last:border-b-0 hover:bg-slate-50">
                  <RowIcon color={row.color} />
                  <span className="text-sm font-bold text-slate-950">{row.label}</span>
                  <StatusPill row={row} />
                  <span className="text-slate-500">⌄</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold shadow-sm hover:bg-slate-50">
            <span>↓</span>
            Download Report
          </button>
          <button onClick={() => setSaved(true)} className="inline-flex h-10 items-center gap-2 rounded-md bg-amber-400 px-6 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300">
            <span>☆</span>
            Save Review
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-8 left-1/2 grid w-[min(660px,calc(100vw-32px))] -translate-x-1/2 grid-cols-[42px_1fr_24px] items-center rounded-lg border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white">✓</div>
          <div>
            <div className="font-bold">Review Saved Successfully</div>
            <div className="mt-1 text-sm text-slate-500">Your review has been saved to history.</div>
          </div>
          <button onClick={() => setSaved(false)} className="text-2xl leading-none text-slate-500">×</button>
        </div>
      )}
    </section>
  );
}
