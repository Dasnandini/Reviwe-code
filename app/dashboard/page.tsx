import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { UserRepository } from "@/repositories/user.repository";
import { verifyToken } from "@/utils/jwt";

const recentReviews = [
  { icon: "N", title: "React Dashboard", meta: "React  -  OpenAI (GPT-5.5)", time: "2 hrs ago", score: "92/100", tone: "green", favorite: true },
  { icon: "N", title: "Next.js Navbar", meta: "Next.js  -  Gemini (Pro)", time: "1 day ago", score: "88/100", tone: "green", favorite: true },
  { icon: "R", title: "Login Page", meta: "React  -  Claude 3.5", time: "2 days ago", score: "75/100", tone: "amber", favorite: false },
  { icon: "N", title: "Portfolio Website", meta: "React  -  OpenAI (GPT-5.5)", time: "4 days ago", score: "90/100", tone: "green", favorite: false },
  { icon: "R", title: "E-commerce Store", meta: "Next.js  -  Gemini (Pro)", time: "5 days ago", score: "82/100", tone: "green", favorite: false },
];

function ScoreBadge({ score, tone }: { score: string; tone: string }) {
  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tone === "amber" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
      {score}
    </span>
  );
}

function FavoriteStar({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 ${filled ? "fill-amber-400 text-amber-400" : "fill-none text-slate-500"}`}>
      <path d="m10 3.6 1.8 3.75 4.1.6-2.95 2.88.7 4.08L10 13l-3.65 1.91.7-4.08L4.1 7.95l4.1-.6z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
    </svg>
  );
}

export default async function DashboardPage() {
  await connectDB();

  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  let userName = "Nandini";

  try {
    const payload = verifyToken(token);
    const user = await new UserRepository().findUserById(payload.id);
    if (!user) redirect("/login");
    userName = user.name;
  } catch {
    redirect("/login");
  }

  return (
      <section className="relative min-h-full px-8 py-10">
        <button aria-label="Notifications" className="absolute right-8 top-8 grid h-8 w-8 place-items-center rounded-full text-slate-700 hover:bg-slate-50">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path d="M6.3 8.6a3.7 3.7 0 1 1 7.4 0v2.2l1.1 2H5.2l1.1-2zM8.7 15.1a1.4 1.4 0 0 0 2.6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="mx-auto max-w-[760px]">
          <div className="pt-8">
            <h1 className="text-[27px] font-bold tracking-tight">Welcome back, {userName} 👋</h1>
            <p className="mt-2 text-sm text-slate-500">Here&apos;s what&apos;s happening with your code reviews.</p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              ["Total Reviews", "32"],
              ["Favourite", "5"],
              ["Last Review", "2 hrs ago"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <span className="h-3 w-1 rounded-full bg-amber-400" />
                  {label}
                </div>
                <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-11 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Reviews</h2>
            <Link href="/dashboard/review" className="inline-flex h-10 items-center gap-2 rounded-md bg-amber-400 px-4 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300">
              <span className="text-lg leading-none">+</span>
              New Review
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {recentReviews.map((review) => (
              <div key={review.title} className="grid grid-cols-[42px_1fr_auto_auto_auto] items-center gap-4 border-b border-slate-200 px-5 py-4 last:border-b-0">
                <div className={`grid h-8 w-8 place-items-center rounded-md text-sm font-bold ${review.icon === "R" ? "bg-sky-50 text-sky-500" : "bg-slate-100 text-slate-950"}`}>{review.icon}</div>
                <div className="min-w-0">
                  <Link href="/dashboard/review/demo" className="truncate text-sm font-bold text-slate-950 hover:text-amber-600">{review.title}</Link>
                  <p className="mt-1 truncate text-xs text-slate-600">{review.meta}</p>
                </div>
                <div className="hidden text-xs text-slate-500 sm:block">{review.time}</div>
                <ScoreBadge score={review.score} tone={review.tone} />
                <FavoriteStar filled={review.favorite} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
