"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import logo from "@/assets/logo.png";
const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <path d="M4.5 4.5h4v4h-4zM11.5 4.5h4v4h-4zM4.5 11.5h4v4h-4zM11.5 11.5h4v4h-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    href: "/dashboard/history",
    label: "History",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <path d="M10 4.2a5.8 5.8 0 1 1-5.3 3.45M4.2 4.5v3.2h3.2M10 7.2v3.3l2.2 1.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <path d="M8.9 3.5h2.2l.45 1.75a5.8 5.8 0 0 1 1.2.5l1.55-.92 1.55 1.55-.92 1.55c.22.38.38.78.5 1.2l1.75.45v2.2l-1.75.45a5.8 5.8 0 0 1-.5 1.2l.92 1.55-1.55 1.55-1.55-.92a5.8 5.8 0 0 1-1.2.5l-.45 1.75H8.9l-.45-1.75a5.8 5.8 0 0 1-1.2-.5l-1.55.92-1.55-1.55.92-1.55a5.8 5.8 0 0 1-.5-1.2l-1.75-.45v-2.2l1.75-.45c.12-.42.28-.82.5-1.2l-.92-1.55L5.7 4.83l1.55.92c.38-.22.78-.38 1.2-.5z" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <circle cx="10" cy="10.7" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

function BrandMark() {
  return (
    <div className="relative grid h-9 w-9 place-items-center rounded-lg border border-amber-300 bg-white text-amber-500 shadow-sm">
      <span className="absolute -inset-1 border-y border-dashed border-amber-300" />
      <span className="absolute -inset-1 border-x border-dashed border-amber-300" />
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
        <rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.2 15 11 9h2l1.8 6M10 13h4M4 9h2M4 15h2M18 9h2M18 15h2M9 4v2M15 4v2M9 18v2M15 18v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f8fafc] p-3 text-[#0f172a]">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
        <aside className="hidden w-[258px] shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 md:flex">
          <Link href="/dashboard" className="flex items-center gap-3">
             <Image src={logo} alt="AI Frontend Reviewer logo" width={52} height={52} className="h-12 w-12 rounded-md object-contain" priority />
            <span className="text-2xl font-extrabold tracking-[-0.01em] text-slate-950">Review Code</span>
          </Link>

          <nav className="mt-16 space-y-3 text-[13px] font-medium text-slate-700">
            {navItems.map((item) => {
              const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-10 items-center gap-3 rounded-md px-3 transition ${
                    active ? "bg-amber-100 text-slate-950" : "hover:bg-slate-50"
                  }`}
                >
                  <span className={active ? "text-amber-500" : "text-slate-700"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-300 text-sm font-semibold text-white">N</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Nandini</div>
              <div className="truncate text-[11px] text-slate-500">nandini@example.com</div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 bg-white">{children}</main>
      </div>
    </div>
  );
}
