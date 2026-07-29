"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type ReviewScore = number | { overall?: number; total?: number };

type Review = {
  _id?: string;
  filename?: string;
  language?: string;
  model?: string;
  createdAt?: string;
  score?: ReviewScore;
  favorite?: boolean;
};

const fallbackReviews = [
  { _id: "demo", filename: "React Dashboard", language: "React", model: "OpenAI (GPT-5.5)", createdAt: new Date().toISOString(), score: { overall: 92 }, favorite: true },
  { _id: "next-navbar", filename: "Next.js Navbar", language: "Next.js", model: "Gemini (Pro)", createdAt: new Date(Date.now() - 86400000).toISOString(), score: { overall: 88 }, favorite: true },
  { _id: "login-page", filename: "Login Page", language: "React", model: "Claude 3.5", createdAt: new Date(Date.now() - 172800000).toISOString(), score: { overall: 75 }, favorite: false },
  { _id: "portfolio", filename: "Portfolio Website", language: "React", model: "OpenAI (GPT-5.5)", createdAt: new Date(Date.now() - 345600000).toISOString(), score: { overall: 90 }, favorite: true },
  { _id: "store", filename: "E-commerce Store", language: "Next.js", model: "Gemini (Pro)", createdAt: new Date(Date.now() - 432000000).toISOString(), score: { overall: 82 }, favorite: false },
  { _id: "utility", filename: "TypeScript Utility", language: "TypeScript", model: "OpenAI (GPT-5.5)", createdAt: new Date(Date.now() - 518400000).toISOString(), score: { overall: 89 }, favorite: true },
];

function relativeDate(value?: string) {
  if (!value) return "2 hrs ago";
  const diff = Date.now() - new Date(value).getTime();
  const days = Math.max(0, Math.floor(diff / 86400000));
  if (days === 0) return "2 hrs ago";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function scoreValue(review: Review) {
  if (typeof review.score === "number") return review.score;
  return review.score?.overall ?? review.score?.total ?? 92;
}

export default function HistoryPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchReviews = async (query = "") => {
    try {
      setLoading(true);
      const url = query ? `/api/reviews?q=${encodeURIComponent(query)}` : "/api/reviews";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const json = await res.json();
      setReviews(json.data?.length ? json.data : fallbackReviews);
    } catch {
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const json = await res.json();
        if (!ignore) setReviews(json.data?.length ? json.data : fallbackReviews);
      } catch {
        if (!ignore) setReviews(fallbackReviews);
      }
    };

    loadReviews();

    return () => {
      ignore = true;
    };
  }, []);

  const visibleReviews = useMemo(() => {
    if (activeFilter === "All") return reviews.length ? reviews : fallbackReviews;
    return (reviews.length ? reviews : fallbackReviews).filter((review) => String(review.language).toLowerCase().includes(activeFilter.toLowerCase()));
  }, [activeFilter, reviews]);

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    fetchReviews(q);
  };

  return (
    <section className="min-h-full px-8 py-10">
      <div className="mx-auto max-w-[820px]">
        <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[27px] font-bold tracking-tight">History</h1>
            <p className="mt-2 text-sm text-slate-500">View and manage all your past reviews.</p>
          </div>

          <form onSubmit={onSearch} className="relative w-full sm:w-[250px]">
            <input
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm outline-none placeholder:text-slate-400 focus:border-amber-400"
              placeholder="Search reviews..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit" aria-label="Search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                <circle cx="8.7" cy="8.7" r="4.7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="m12.2 12.2 3.4 3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {["All", "React", "Next.js", "TypeScript"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`h-10 rounded-md border px-5 text-sm font-semibold ${
                  activeFilter === filter ? "border-amber-400 bg-amber-400 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
            Sort by:
            <select className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Score</option>
            </select>
          </label>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          {visibleReviews.map((review) => {
            const score = scoreValue(review);
            const good = score >= 80;
            return (
              <div key={review._id} className="grid grid-cols-[42px_1fr_auto_auto_auto] items-center gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0">
                <div className={`grid h-8 w-8 place-items-center rounded-md text-sm font-bold ${String(review.language).includes("React") ? "bg-sky-50 text-sky-500" : "bg-slate-100 text-slate-950"}`}>
                  {String(review.language || "N").slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <Link href={`/dashboard/review/${review._id || "demo"}`} className="truncate text-sm font-bold text-slate-950 hover:text-amber-600">{review.filename || "Untitled Review"}</Link>
                  <p className="mt-1 truncate text-xs text-slate-600">{review.language || "React"}  -  {review.model || "OpenAI (GPT-5.5)"}</p>
                </div>
                <div className="hidden text-xs text-slate-500 sm:block">{relativeDate(review.createdAt)}</div>
                <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${good ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>{score}/100</span>
                <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 ${review.favorite ?? good ? "fill-amber-400 text-amber-400" : "fill-none text-slate-500"}`}>
                  <path d="m10 3.6 1.8 3.75 4.1.6-2.95 2.88.7 4.08L10 13l-3.65 1.91.7-4.08L4.1 7.95l4.1-.6z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
                </svg>
              </div>
            );
          })}
        </div>

        {loading && <p className="mt-4 text-sm text-slate-500">Loading reviews...</p>}
      </div>
    </section>
  );
}
