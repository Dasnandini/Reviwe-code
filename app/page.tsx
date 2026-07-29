import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const checklist = [
  "Detect Bugs",
  "Improve Performance",
  "Accessibility Checks",
  "Tailwind Best Practices",
  "Security Suggestions",
];

const codeLines = [
  { no: 1, text: "import React from 'react'", tint: "text-blue-700" },
  { no: 2, text: "" },
  { no: 3, text: "type ButtonProps = {", tint: "text-violet-700" },
  { no: 4, text: "  children: React.ReactNode" },
  { no: 5, text: "  onClick: () => void", tint: "text-slate-700" },
  { no: 6, text: "  variant?: 'primary' | 'secondary'", tint: "text-green-700" },
  { no: 7, text: "}" },
  { no: 8, text: "" },
  { no: 9, text: "export default function Button({", tint: "text-violet-700" },
  { no: 10, text: "  children," },
  { no: 11, text: "  onClick," },
  { no: 12, text: "  variant = 'primary'," },
  { no: 13, text: "}: ButtonProps) {" },
  { no: 14, text: "  const handleClick = () => {", issue: true },
  { no: 15, text: "    onClick()" },
  { no: 16, text: "  }" },
  { no: 17, text: "  return (" },
  { no: 18, text: "    <button" },
  { no: 19, text: "      className={'px-4 py-2 rounded-lg font-medium" },
  { no: 20, text: "        ${variant === 'primary'" },
  { no: 21, text: "          ? 'bg-yellow-400 text-black'" },
  { no: 22, text: "          : 'bg-zinc-800 text-white'}'}" },
  { no: 23, text: "      onClick={handleClick}" },
  { no: 24, text: "    >" },
  { no: 25, text: "      {children}" },
  { no: 26, text: "    </button>" },
  { no: 27, text: "  )" },
];

const reviewItems = [
  {
    title: "Bug",
    severity: "High",
    body: "Missing type for event parameter",
    hint: "onClick should accept event parameter",
    line: "Button.tsx:11",
    color: "red",
  },
  {
    title: "Performance",
    severity: "Medium",
    body: "Use useCallback for handlers",
    hint: "Prevent unnecessary re-renders",
    line: "Button.tsx:11",
    color: "blue",
  },
  {
    title: "Accessibility",
    severity: "Medium",
    body: "Add aria-label or accessible text",
    hint: "Button should have accessible label",
    line: "Button.tsx:15",
    color: "amber",
  },
  {
    title: "Tailwind",
    severity: "Low",
    body: "Use semantic color classes",
    hint: "Consider using bg-primary instead",
    line: "Button.tsx:15",
    color: "green",
  },
  {
    title: "Security",
    severity: "Low",
    body: "Validate onClick action",
    hint: "Ensure onClick is sanitised",
    line: "Button.tsx:11",
    color: "indigo",
  },
];

const features = [
  {
    title: "Detect Bugs",
    text: "Find runtime errors, edge cases and logic issues instantly.",
    color: "yellow",
    icon: "bug",
  },
  {
    title: "Improve Performance",
    text: "Optimize components and eliminate unnecessary re-renders.",
    color: "green",
    icon: "speed",
  },
  {
    title: "Accessibility Checks",
    text: "Ensure WCAG compliance and build inclusive experiences.",
    color: "purple",
    icon: "access",
  },
  {
    title: "Tailwind Best Practices",
    text: "Follow utility-first best practices for clean and maintainable UI.",
    color: "sky",
    icon: "tailwind",
  },
  {
    title: "Security Suggestions",
    text: "Identify vulnerabilities and get secure coding recommendations.",
    color: "orange",
    icon: "shield",
  },
];

const colorStyles = {
  red: {
    card: "border-red-100 bg-red-50/80",
    icon: "bg-red-100 text-red-600",
    title: "text-red-600",
    pill: "bg-red-100 text-red-600",
  },
  blue: {
    card: "border-blue-100 bg-blue-50/70",
    icon: "bg-blue-100 text-blue-600",
    title: "text-blue-600",
    pill: "bg-amber-100 text-amber-700",
  },
  amber: {
    card: "border-amber-100 bg-amber-50/70",
    icon: "bg-amber-100 text-amber-600",
    title: "text-amber-600",
    pill: "bg-amber-100 text-amber-700",
  },
  green: {
    card: "border-green-100 bg-green-50/70",
    icon: "bg-green-100 text-green-600",
    title: "text-green-600",
    pill: "bg-green-100 text-green-700",
  },
  indigo: {
    card: "border-indigo-100 bg-indigo-50/70",
    icon: "bg-indigo-100 text-indigo-600",
    title: "text-indigo-600",
    pill: "bg-indigo-100 text-indigo-700",
  },
};

const featureColors = {
  yellow: "bg-yellow-100 text-yellow-700",
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  sky: "bg-sky-100 text-sky-700",
  orange: "bg-orange-100 text-orange-700",
};

function SparkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" fill="currentColor" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15zM5 15l.9 2.1L8 18l-2.1.9L5 21l-.9-2.1L2 18l2.1-.9L5 15z" fill="currentColor" />
    </svg>
  );
}

function CircleIcon({ icon }: { icon: string }) {
  if (icon === "bug") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M9 9h6v7a3 3 0 0 1-6 0V9z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 5l2 2m6-2l-2 2M4 13h5m6 0h5M5 19l4-3m10 3l-4-3M12 9V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "speed") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 14l4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "access") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="4" r="2" fill="currentColor" />
        <path d="M5 9h14M12 9v11M8 20l4-8 4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "tailwind") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
        <path d="M3 13c2.4-4 4.8-4 7.2 0 1.4 2.3 2.9 2.3 4.4 0 2.1-3.5 4.2-3.7 6.4-.6-2.4 4-4.8 4-7.2 0-1.4-2.3-2.9-2.3-4.4 0C7.3 15.9 5.2 16.1 3 13z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-2.8 7.9-7 10-4.2-2.1-7-5.4-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReviewIcon({ color }: { color: keyof typeof colorStyles }) {
  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorStyles[color].icon}`}>
      {color === "red" ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M12 8v5m0 4h.01M5 12H3m18 0h-2M7 7L5.6 5.6M18.4 18.4L17 17M17 7l1.4-1.4M5.6 18.4L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5" fill="currentColor" opacity=".18" />
        </svg>
      ) : (
        <CircleIcon icon={color === "blue" ? "speed" : color === "amber" ? "access" : color === "green" ? "tailwind" : "shield"} />
      )}
    </span>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-950 antialiased">
      <div className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-yellow-200/70 blur-sm" />
      <div className="pointer-events-none absolute -right-24 top-24 h-[820px] w-[420px] rounded-[50%] border border-slate-100" />
      <div className="pointer-events-none absolute -right-12 top-16 h-[720px] w-[360px] rounded-[50%] border border-slate-100" />

      <header className="relative z-10 border-b border-slate-200/70 bg-white/90">
        <div className="mx-auto flex max-w-[1510px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="#" className="flex items-center gap-4">
            <Image src={logo} alt="AI Frontend Reviewer logo" width={52} height={52} className="h-12 w-12 rounded-md object-contain" priority />
            <span className="text-2xl font-extrabold tracking-[-0.01em] text-slate-950">Review Code</span>
          </Link>

          <nav className="hidden items-center gap-14 text-[15px] font-medium text-slate-700 lg:flex">
            <Link href="#" className="hover:text-slate-950">Features</Link>
            <Link href="#" className="hover:text-slate-950">Pricing</Link>
            <Link href="#" className="hover:text-slate-950">Documentation</Link>
            <Link href="#" className="hover:text-slate-950">Blog</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden rounded-lg border border-slate-300 px-9 py-4 text-sm font-bold text-slate-950 shadow-sm transition hover:border-slate-400 sm:inline-flex">
              Sign In
            </Link>
            <Link href="/register" className="inline-flex items-center gap-4 rounded-lg bg-yellow-400 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-[0_12px_24px_rgba(250,204,21,0.25)] transition hover:bg-yellow-300">
              Get Started
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-[1510px] gap-12 px-6 pb-12 pt-11 lg:grid-cols-[0.73fr_1.27fr] lg:px-10 lg:pb-10 lg:pt-10">
        <div className="relative flex flex-col justify-center pt-1">
          <div className="mb-8 inline-flex w-max items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-slate-900 shadow-sm">
            <SparkIcon className="h-4 w-4 text-yellow-600" />
            AI-Powered Code Review
          </div>

          <h1 className="max-w-[560px] text-[clamp(3rem,6.1vw,5.35rem)] font-black leading-[0.98] tracking-[-0.035em] text-slate-950">
            Review React &amp; Next.js Code
            <span className="block text-yellow-400">Using AI</span>
          </h1>

          <p className="mt-6 max-w-[565px] text-[17px] font-medium leading-8 text-slate-600">
            Catch bugs, improve performance, enforce accessibility, and receive production-ready recommendations in seconds.
          </p>

          <ul className="mt-7 w-full max-w-[330px]">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-5 border-b border-slate-200 py-2.5 text-[15px] font-semibold text-slate-800 last:border-b-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500 text-green-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M6 12l4 4 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/register" className="inline-flex h-[62px] items-center justify-center gap-4 rounded-lg bg-yellow-400 px-10 text-base font-extrabold text-slate-950 shadow-[0_14px_28px_rgba(250,204,21,0.28)] transition hover:bg-yellow-300">
              <SparkIcon className="h-5 w-5" />
              Start Reviewing
            </Link>
            <Link href="/login" className="inline-flex h-[62px] items-center justify-center gap-4 rounded-lg border border-slate-300 bg-white px-9 text-base font-extrabold text-slate-950 shadow-sm transition hover:border-slate-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-950">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>
              View Demo
            </Link>
          </div>

          <div className="mt-7 flex items-center gap-5">
            <div className="flex -space-x-3">
              {["bg-slate-800", "bg-teal-700", "bg-blue-800", "bg-pink-300"].map((color, index) => (
                <span key={color} className={`h-10 w-10 rounded-full border-2 border-white ${color} shadow-sm`}>
                  <span className="sr-only">Developer avatar {index + 1}</span>
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L2.9 9.4l6.3-.9L12 2.8z" />
                  </svg>
                ))}
              </div>
              <p className="mt-1 text-sm font-medium text-slate-600">Trusted by 4,000+ developers worldwide</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[660px] lg:min-h-[690px]">
          <div className="pointer-events-none absolute -left-16 top-64 hidden grid-cols-4 gap-4 lg:grid">
            {Array.from({ length: 40 }).map((_, index) => (
              <span key={index} className="h-0.5 w-0.5 rounded-full bg-yellow-400" />
            ))}
          </div>

          <div className="relative ml-auto w-full rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] lg:max-w-[855px]">
            <div className="grid min-h-[690px] grid-cols-1 lg:grid-cols-[1fr_324px]">
              <div className="overflow-hidden rounded-t-[1.35rem] border-b border-slate-200 lg:rounded-l-[1.35rem] lg:rounded-tr-none lg:border-b-0 lg:border-r">
                <div className="flex h-11 items-end border-b border-slate-200 bg-white">
                  <div className="flex h-11 w-14 items-center justify-center border-r border-slate-200 text-slate-500">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M4 7h10M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M18 5v4M18 15v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex h-11 items-center gap-3 rounded-t-lg border-r border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-500" aria-hidden="true">
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <path d="M12 4c5 0 9 3.6 9 8s-4 8-9 8-9-3.6-9-8 4-8 9-8z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5.5 7.5c2.5-4.3 7.9-5.8 11.9-3.5 4 2.3 5.2 7.6 2.7 11.9-2.5 4.3-7.9 5.8-11.9 3.5-4-2.3-5.2-7.6-2.7-11.9z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Button.tsx
                    <span className="text-slate-400">x</span>
                  </div>
                </div>

                <div className="px-4 py-3">
                  <div className="rounded-md border border-slate-100 bg-white font-mono text-[13px] leading-[1.72] text-slate-800 shadow-sm">
                    {codeLines.map((line) => (
                      <div key={line.no} className={`relative grid grid-cols-[42px_1fr] px-3 ${line.issue ? "bg-red-100/80 text-red-700" : ""}`}>
                        <span className="select-none text-right text-slate-400">{line.no}</span>
                        <span className={`whitespace-pre pl-7 ${line.tint ?? ""}`}>{line.text || " "}</span>
                        {line.issue && (
                          <span className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-red-500 text-[12px] font-bold text-white">
                            !
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-0 flex h-11 items-center gap-7 border-t border-slate-200 px-6 text-sm font-medium text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-500" aria-hidden="true">
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <path d="M3 12c3-5.2 6-7.8 9-7.8S18 6.8 21 12c-3 5.2-6 7.8-9 7.8S6 17.2 3 12z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    React
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">TS</span>
                    TypeScript
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CircleIcon icon="tailwind" />
                    Tailwind CSS
                  </span>
                  <span className="ml-auto inline-flex items-center gap-2 text-xs">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-green-500 text-green-600">
                      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                        <path d="M6 12l4 4 8-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Analyzed in 1.2s
                  </span>
                </div>
              </div>

              <aside className="p-5">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-sm font-extrabold text-slate-950">
                      <SparkIcon className="h-5 w-5 text-yellow-400" />
                      AI Review Summary
                    </div>
                    <p className="mt-4 text-xs font-medium text-slate-600">Good overall code quality</p>
                    <p className="mt-1 text-xs font-bold text-yellow-500">5 issues found</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-yellow-400 text-xl font-extrabold text-slate-950 shadow-sm">
                    86
                  </div>
                </div>

                <div className="space-y-3">
                  {reviewItems.map((item) => {
                    const styles = colorStyles[item.color as keyof typeof colorStyles];
                    return (
                      <div key={item.title} className={`rounded-lg border p-3.5 ${styles.card}`}>
                        <div className="flex items-start gap-3">
                          <ReviewIcon color={item.color as keyof typeof colorStyles} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className={`text-sm font-extrabold ${styles.title}`}>{item.title}</h3>
                              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles.pill}`}>{item.severity}</span>
                            </div>
                            <p className="mt-2 text-xs font-bold text-slate-900">{item.body}</p>
                            <p className="mt-2 text-xs text-slate-600">{item.hint}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-slate-600">{item.line}</span>
                              <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-extrabold text-slate-900 shadow-sm">
                                View Fix
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-[1510px] px-6 pb-9 lg:px-10">
        <div className="grid gap-0 rounded-[1.35rem] border border-slate-200 bg-white px-8 py-7 shadow-[0_14px_50px_rgba(15,23,42,0.07)] md:grid-cols-5">
          {features.map((feature, index) => (
            <div key={feature.title} className={`flex items-start gap-5 px-3 py-2 ${index !== 0 ? "md:border-l md:border-slate-200" : ""}`}>
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${featureColors[feature.color as keyof typeof featureColors]}`}>
                <CircleIcon icon={feature.icon} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-xs leading-6 text-slate-600">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
