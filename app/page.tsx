"use client";

import { CheckCircle2, Clock3, FileText, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { LanguageSwitcher, useLocale } from "@/components/LanguageSwitcher";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SiteFooter } from "@/components/SiteFooter";

const trendLines = [
  "If you need a reply to regulate your entire nervous system, this test has notes.",
  "For everyone who says 'I'm chill' while rereading the chat like court evidence.",
  "Find out whether you're anxious, avoidant, secure, or the deluxe push-pull edition."
];

export default function HomePage() {
  const { t } = useLocale();
  const icons = [CheckCircle2, Clock3, Sparkles, FileText];

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-6xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <p className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 shadow-sm">
              {t.brand}
            </p>
            <LanguageSwitcher compact />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-3 py-2 text-xs font-semibold text-white">
            <Zap aria-hidden="true" className="h-4 w-4" />
            {t.heroBadge}
          </div>

          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-normal text-neutral-950 sm:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-700 sm:text-xl">{t.heroSubtitle}</p>
          <p className="mt-4 text-sm font-medium text-neutral-500">{t.proof}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton href="/test">{t.cta}</PrimaryButton>
            <span className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-neutral-600 sm:justify-start">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              TikTok in-app browser ready
            </span>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {t.benefits.map((benefit, index) => {
              const Icon = icons[index] || CheckCircle2;
              return (
                <div key={benefit} className="flex min-h-16 items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm">
                  <Icon aria-hidden="true" className="h-5 w-5 text-neutral-900" />
                  <span className="text-sm font-semibold text-neutral-900">{benefit}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-soft">
            <img
              alt="AI attachment test phone preview with relationship pattern cards"
              className="aspect-[4/5] w-full object-cover"
              src="/images/attachment-hero.png"
            />
          </div>
          <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-neutral-950">{t.previewTitle}</p>
            <div className="mt-4 grid gap-2">
              {t.previewItems.map((item) => (
                <div className="flex items-center justify-between rounded-lg bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700" key={item}>
                  <span>{item}</span>
                  <Sparkles aria-hidden="true" className="h-4 w-4 text-neutral-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            {trendLines.map((line) => (
              <p className="rounded-lg border border-neutral-200 bg-white p-4 text-sm font-medium leading-6 text-neutral-700 shadow-sm" key={line}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
