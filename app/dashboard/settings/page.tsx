"use client";

import React, { useEffect, useState } from "react";

type ProviderName = "openai" | "gemini";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [providerName, setProviderName] = useState<ProviderName>("openai");
  const [apiKey, setApiKey] = useState("");
  const [apiKeySource, setApiKeySource] = useState<'user' | 'env' | 'none'>('none');
  const [model, setModel] = useState("GPT-5.5");
  const [name, setName] = useState("Nandini");
  const [email, setEmail] = useState("nandini@example.com");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        const [providerRes, meRes] = await Promise.all([
          fetch("/api/settings/provider"),
          fetch("/api/auth/me"),
        ]);
        const providerJson = await providerRes.json();
        const meJson = await meRes.json();

        if (providerJson.success && providerJson.data?.providerConfig) {
          const cfg = providerJson.data.providerConfig;
          if (cfg.providerName) setProviderName(cfg.providerName);
          if (cfg.model) setModel(cfg.model);
          if (cfg.apiKey === "Configured from environment") {
            setApiKey("");
            setApiKeySource("env");
          } else if (cfg.apiKey) {
            setApiKey(cfg.apiKey);
            setApiKeySource("user");
          } else {
            setApiKeySource("none");
          }
        }

        if (meJson.success && meJson.data) {
          setName(meJson.data.name || "Nandini");
          setEmail(meJson.data.email || "nandini@example.com");
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const body: { providerName: ProviderName; model: string; apiKey?: string } = {
        providerName,
        model,
      };

      if (apiKeySource !== "env") {
        body.apiKey = apiKey;
      }

      const res = await fetch("/api/settings/provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setMessage(json.success ? "Settings saved successfully" : json.message || "Unable to save");
      if (json.success && apiKeySource === "user" && apiKey.length > 4) setApiKey(`****${apiKey.slice(-4)}`);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-full px-8 py-10">
      <div className="mx-auto max-w-[820px]">
        <div className="pt-6">
          <h1 className="text-[27px] font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-slate-500">Manage your preferences and account settings.</p>
        </div>

        <div className="mt-10 border-b border-slate-200">
          <div className="flex gap-10 text-sm font-semibold text-slate-500">
            {["Profile", "AI Preferences", "Appearance", "Account"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 ${activeTab === tab ? "text-slate-950" : "hover:text-slate-800"}`}
              >
                {tab}
                {activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-amber-400" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-9">
          {activeTab === "Profile" && (
            <div>
              <h2 className="text-lg font-bold tracking-tight">Profile Information</h2>
              <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_230px]">
                <div className="max-w-[430px] space-y-6">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-amber-400" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-amber-400" />
                  </label>
                </div>

                <div className="flex flex-col items-center justify-center gap-5">
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-slate-300 text-4xl text-white">N</div>
                  <button type="button" className="h-10 rounded-md border border-slate-200 bg-white px-7 text-sm font-semibold shadow-sm hover:bg-slate-50">Change Avatar</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "AI Preferences" && (
            <div className="max-w-[520px]">
              <h2 className="text-lg font-bold tracking-tight">AI Preferences</h2>
              <div className="mt-8 space-y-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Provider</span>
                  <select
                    value={providerName}
                    onChange={(e) => {
                      setProviderName(e.target.value as ProviderName);
                      setApiKeySource("none");
                      setApiKey("");
                    }}
                    className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-amber-400"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">API Key</span>
                  <input
                    type="text"
                    value={apiKeySource === "env" ? "" : apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setApiKeySource("user");
                    }}
                    placeholder={apiKeySource === "env" ? "Using environment API key" : "sk-... or paste your key"}
                    disabled={apiKeySource === "env"}
                    className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-amber-400 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                  {apiKeySource === "env" && (
                    <p className="mt-2 text-sm text-slate-500">Using API key from environment variables; no manual key required.</p>
                  )}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Model</span>
                  <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm outline-none focus:border-amber-400" />
                </label>
              </div>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="max-w-[520px]">
              <h2 className="text-lg font-bold tracking-tight">Appearance</h2>
              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500">Light theme selected</div>
            </div>
          )}

          {activeTab === "Account" && (
            <div className="max-w-[520px]">
              <h2 className="text-lg font-bold tracking-tight">Account</h2>
              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500">Account controls will appear here.</div>
            </div>
          )}

          <button type="submit" disabled={loading} className="mt-10 h-11 rounded-md bg-amber-400 px-8 text-sm font-bold text-slate-950 shadow-sm hover:bg-amber-300 disabled:opacity-60">
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {message && <div className="mt-4 text-sm font-medium text-slate-700">{message}</div>}
        </form>
      </div>
    </section>
  );
}
