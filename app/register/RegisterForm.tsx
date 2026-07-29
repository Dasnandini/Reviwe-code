"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { notifyError, notifySuccess } from "@/lib/notify";
import Image from "next/image";
import logo from "@/assets/logo.png";

const features = [
  {
    title: "Detect Bugs",
    copy: "Find issues before they go to production",
    icon: BugIcon,
  },
  {
    title: "Improve Performance",
    copy: "Optimize your code for speed and efficiency",
    icon: GaugeIcon,
  },
  {
    title: "Accessibility Checks",
    copy: "Ensure your app is accessible to everyone",
    icon: AccessibilityIcon,
  },
  {
    title: "Tailwind Best Practices",
    copy: "Write clean and maintainable UI",
    icon: SparkIcon,
  },
  {
    title: "Security Suggestions",
    copy: "Get insights to secure your code",
    icon: ShieldIcon,
  },
];

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      notifyError(message);
      return;
    }

    if (!acceptedTerms) {
      const message = "Please agree to the Terms of Service and Privacy Policy";
      setError(message);
      notifyError(message);
      return;
    }

    setLoading(true);
    const fallbackName = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
    const name = fallbackName && fallbackName.length >= 3 ? fallbackName : "New Reviewer";

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      const message = data.message || "Unable to register";
      setError(message);
      notifyError(message);
      return;
    }

    const successMessage = data.message || "Registered successfully";
    notifySuccess(successMessage);
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]  text-[#0f172a] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="relative grid w-full overflow-hidden rounded-[24px]  sm:p-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14 lg:p-12">
          <Brand />

          <AuthPreview />

          <div className="relative z-10 mt-10 flex items-center lg:mt-16">
            <div className="w-full">
              <h1 className="text-[34px] font-bold leading-tight text-[#0b1220]">Create your account</h1>
              <p className="mt-3 text-[15px] text-[#64748b]">Start reviewing your code with AI in seconds.</p>

              <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-lg border border-[#d6dde8] bg-white px-4 text-sm text-[#334155] shadow-[inset_0_1px_1px_rgba(15,23,42,0.03)] outline-none transition placeholder:text-[#7b8798] focus:border-[#f7b500] focus:ring-4 focus:ring-[#f8c400]/15"
                    placeholder="you@example.com"
                    required
                  />
                </Field>

                <Field label="Password">
                  <PasswordInput
                    value={password}
                    placeholder="Enter your password"
                    visible={showPassword}
                    onChange={setPassword}
                    onToggle={() => setShowPassword((current) => !current)}
                  />
                </Field>

                <Field label="Confirm Password">
                  <PasswordInput
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    visible={showConfirmPassword}
                    onChange={setConfirmPassword}
                    onToggle={() => setShowConfirmPassword((current) => !current)}
                  />
                </Field>

                <label className="flex items-start gap-3 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#cbd5e1] text-[#f8c400] accent-[#f8c400]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="#" className="font-medium text-[#e8a900]">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="font-medium text-[#e8a900]">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[#f8c400] px-5 text-sm font-semibold text-[#171717] shadow-[0_10px_20px_rgba(248,196,0,0.22)] transition hover:bg-[#eab308] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <Divider />

                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#d6dde8] bg-white px-5 text-sm font-semibold text-[#1f2937] transition hover:border-[#f8c400]"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#475569]">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#e8a900]">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <BottomTab label="Register" type="register" />
        </div>
      </section>
    </main>
  );
}

function Brand() {
  return (
    <div className="relative z-10 flex items-center gap-4 lg:col-span-2">
       <Image src={logo} alt="AI Frontend Reviewer logo" width={52} height={52} className="h-12 w-12 rounded-md object-contain" priority />
      <span className="text-2xl font-extrabold tracking-[-0.01em] text-slate-950">Review Code</span>
    </div>
  );
}

function AuthPreview() {
  return (
    <div className="relative z-10 mt-10 rounded-[22px] border border-[#e3e7ee] bg-[#fbfcfe] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] lg:mt-16">
      <div className="mx-auto mb-9 h-40 max-w-[330px] rounded-[18px] border border-[#e8edf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-[#f8c400] bg-[#fff8db] text-[#b78300]">
          <CodeIcon />
        </div>
        <div className="mt-5 space-y-3">
          <Line width="w-16" />
          <Line width="w-24" />
          <div className="grid grid-cols-[1fr_1.6fr_0.2fr_0.9fr] gap-2">
            <SoftLine color="bg-[#fee2e2]" />
            <SoftLine />
            <SoftLine color="bg-[#dcfce7]" />
            <SoftLine />
          </div>
          <div className="grid grid-cols-[0.8fr_1.8fr_0.8fr] gap-2">
            <SoftLine color="bg-[#fee2e2]" />
            <SoftLine />
            <SoftLine />
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-[156px] rounded-[16px] border border-[#e8edf3] bg-white px-5 py-4 shadow-[0_16px_35px_rgba(15,23,42,0.10)]">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
            <ShieldCheckIcon />
          </span>
          <div>
            <p className="text-sm font-bold text-[#111827]">AI Review</p>
            <p className="mt-2 text-xs font-medium text-[#16a34a]">No issues found</p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-7">
        {features.map((feature) => (
          <div key={feature.title} className="flex gap-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff3c4] text-[#b78300]">
              <feature.icon />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">{feature.title}</h2>
              <p className="mt-1 text-xs text-[#475569]">{feature.copy}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-[#ffe8a3]" />
      <div className="pointer-events-none absolute bottom-8 left-16 grid grid-cols-8 gap-3 opacity-80">
        {Array.from({ length: 40 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-[#f8c400]" />
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-bold text-[#111827]">{label}</span>
      {children}
    </label>
  );
}

function PasswordInput({
  value,
  placeholder,
  visible,
  onChange,
  onToggle,
}: {
  value: string;
  placeholder: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-[#d6dde8] bg-white px-4 pr-12 text-sm text-[#334155] shadow-[inset_0_1px_1px_rgba(15,23,42,0.03)] outline-none transition placeholder:text-[#7b8798] focus:border-[#f7b500] focus:ring-4 focus:ring-[#f8c400]/15"
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#0f172a]"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <EyeIcon />
      </button>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-5 py-1 text-sm text-[#64748b]">
      <span className="h-px flex-1 bg-[#e5e7eb]" />
      <span>or</span>
      <span className="h-px flex-1 bg-[#e5e7eb]" />
    </div>
  );
}

function BottomTab({ label, type }: { label: string; type: "register" | "login" }) {
  return (
    <div className="absolute -bottom-[70px] left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-[#d8dee8] bg-white px-9 py-4 text-xl font-semibold text-[#111827] shadow-[0_14px_40px_rgba(15,23,42,0.08)] lg:flex">
      {type === "register" ? <UserPlusIcon /> : <UserIcon />}
      {label}
    </div>
  );
}

function AiChip() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-md border-2 border-[#f8c400] bg-white text-base font-black text-[#111827]">
      AI
      <span className="absolute -left-2 top-1/2 h-0.5 w-1.5 -translate-y-1/2 bg-[#f8c400]" />
      <span className="absolute -right-2 top-1/2 h-0.5 w-1.5 -translate-y-1/2 bg-[#f8c400]" />
      <span className="absolute left-1/2 -top-2 h-1.5 w-0.5 -translate-x-1/2 bg-[#f8c400]" />
      <span className="absolute bottom-[-8px] left-1/2 h-1.5 w-0.5 -translate-x-1/2 bg-[#f8c400]" />
    </span>
  );
}

function Line({ width }: { width: string }) {
  return <div className={`h-2 rounded-full bg-[#e5e7eb] ${width}`} />;
}

function SoftLine({ color = "bg-[#e5e7eb]" }: { color?: string }) {
  return <div className={`h-1.5 rounded-full ${color}`} />;
}

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function CodeIcon() {
  return (
    <IconBase>
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
      <path d="m14 4-4 16" />
    </IconBase>
  );
}

function BugIcon() {
  return (
    <IconBase>
      <path d="m8 2 1.9 1.9" />
      <path d="M14.1 3.9 16 2" />
      <path d="M9 7h6" />
      <path d="M8 11H3" />
      <path d="M21 11h-5" />
      <path d="M6 15H3" />
      <path d="M21 15h-3" />
      <path d="M12 20c3 0 5-2.4 5-6V9H7v5c0 3.6 2 6 5 6Z" />
    </IconBase>
  );
}

function GaugeIcon() {
  return (
    <IconBase>
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="M12 14 16 9" />
      <path d="M7 14h.01" />
      <path d="M17 14h.01" />
    </IconBase>
  );
}

function AccessibilityIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="4" r="1.5" />
      <path d="M6 8h12" />
      <path d="M12 8v12" />
      <path d="m8 20 4-8 4 8" />
    </IconBase>
  );
}

function SparkIcon() {
  return (
    <IconBase>
      <path d="M4 14c3-5 7 5 10 0 2-3 4-3 6-2" />
      <path d="M4 9c3-5 7 5 10 0 2-3 4-3 6-2" />
    </IconBase>
  );
}

function ShieldIcon() {
  return (
    <IconBase>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  );
}

function ShieldCheckIcon() {
  return (
    <IconBase>
      <path d="M12 21s7-3.5 7-9V6l-7-3-7 3v6c0 5.5 7 9 7 9Z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  );
}

function EyeIcon() {
  return (
    <IconBase>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.1 3.2v2.7h3.4c2-1.8 3.4-4.5 3.4-7.9Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.8l-3.4-2.7c-.9.6-2.1 1-3.8 1-2.9 0-5.3-1.9-6.2-4.6H2.3v2.8C4.1 20.4 7.8 23 12 23Z" />
      <path fill="#FBBC05" d="M5.8 13.9c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V7.3H2.3A11 11 0 0 0 1.1 12c0 1.7.4 3.3 1.2 4.7l3.5-2.8Z" />
      <path fill="#EA4335" d="M12 5.5c1.6 0 3.1.6 4.2 1.7l3.1-3.1A10.4 10.4 0 0 0 12 1C7.8 1 4.1 3.6 2.3 7.3l3.5 2.8C6.7 7.4 9.1 5.5 12 5.5Z" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#f8c400]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#f8c400]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
