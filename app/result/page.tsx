"use client";

import { Lock, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageSwitcher, useLocale } from "@/components/LanguageSwitcher";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SiteFooter } from "@/components/SiteFooter";
import {
  STORAGE_KEY,
  getStyleLabel,
  getStylePlaybook,
  getStyleSummary,
  type StoredQuizResult
} from "@/lib/quiz";

const lockedItems = [
  "Why you love this way",
  "Your emotional blind spots",
  "Your dating pattern receipts",
  "How others experience you",
  "Personalized healing advice",
  "What to text instead of spiraling",
  "Compatibility insights",
  "A daily affirmation that does not sound like a fridge magnet"
];

export default function ResultPage() {
  const { locale, t } = useLocale();
  const [result, setResult] = useState<StoredQuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setResult(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  async function unlockReport() {
    if (!result) return;

    setError("");
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result, locale })
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout could not be started.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout could not be started.");
      setIsCheckingOut(false);
    }
  }

  if (isLoading) {
    return <main className="min-h-screen bg-[#f7f7f5]" />;
  }

  if (!result) {
    return (
      <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-10 text-center">
          <h1 className="text-3xl font-semibold text-neutral-950">Start your free test first</h1>
          <p className="mt-4 text-neutral-600">Your result will appear here after you answer the 5 questions.</p>
          <div className="mt-8">
            <PrimaryButton href="/test">Start Free Test</PrimaryButton>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  const playbook = getStylePlaybook(result.style, locale);

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <div className="flex items-center justify-between gap-3">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-950" href="/test">
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            {t.retake}
          </Link>
          <LanguageSwitcher compact />
        </div>

        <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-soft sm:p-8">
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
            <img
              alt="AI relationship report visual"
              className="h-48 w-full object-cover sm:h-64"
              src="/images/attachment-hero.png"
            />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">{t.resultLabel}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-neutral-950">
            {getStyleLabel(result.style, locale)}
          </h1>
          <p className="mt-3 text-base font-semibold text-neutral-600">{playbook.vibe}</p>
          <div className="mt-7 border-t border-neutral-200 pt-6">
            <p className="text-sm font-semibold text-neutral-950">{t.shortSummary}</p>
            <p className="mt-3 text-lg leading-8 text-neutral-700">{getStyleSummary(result.style, locale)}</p>
            <p className="mt-4 rounded-lg bg-neutral-100 p-4 text-sm font-semibold leading-6 text-neutral-800">
              {playbook.roast}
            </p>
          </div>
          <div className="mt-7 border-t border-neutral-200 pt-6">
            <p className="text-sm font-semibold text-neutral-950">Free mini action plan:</p>
            <ul className="mt-3 grid gap-3">
              {playbook.quickWins.map((item) => (
                <li className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium leading-6 text-neutral-700" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white shadow-soft sm:p-8">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-950">
              <Lock aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal">{t.unlockTitle}</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-neutral-200">
                {lockedItems.map((item) => (
                  <li className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isCheckingOut}
                onClick={unlockReport}
                type="button"
              >
                <span>{isCheckingOut ? t.checkingOut : t.unlockButton}</span>
                <Lock aria-hidden="true" className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs leading-5 text-neutral-400">
                Secure Stripe checkout. Works from TikTok in-app browser; payment success returns here automatically.
              </p>
              {error ? <p className="mt-4 text-sm text-neutral-200">{error}</p> : null}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
