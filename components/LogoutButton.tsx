"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-2xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-500"
    >
      Logout
    </button>
  );
}
