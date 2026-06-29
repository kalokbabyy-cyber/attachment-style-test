"use client";

import { LoaderCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { LanguageSwitcher, useLocale } from "@/components/LanguageSwitcher";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SiteFooter } from "@/components/SiteFooter";
import { STORAGE_KEY, type StoredQuizResult } from "@/lib/quiz";

type ReportSection = {
  title: string;
  body: string;
};

type ReportResponse = {
  title: string;
  styleLabel: string;
  sections: ReportSection[];
  generatedBy?: "openai" | "fallback";
};

export default function ReportPage() {
  return (
    <Suspense fallback={<ReportLoading />}>
      <ReportContent />
    </Suspense>
  );
}

function ReportContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const demo = searchParams.get("demo");
  const { locale, t } = useLocale();
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored && !sessionId) {
      setError("Your quiz answers are missing. Please retake the test before generating a report.");
      return;
    }

    const quizResult = stored ? (JSON.parse(stored) as StoredQuizResult) : null;

    async function generateReport() {
      try {
        const response = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...quizResult, sessionId, demo, locale: quizResult?.locale || locale })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Report could not be generated.");
        }

        setReport(data);
      } catch (reportError) {
        setError(reportError instanceof Error ? reportError.message : "Report could not be generated.");
      }
    }

    generateReport();
  }, [demo, locale, sessionId]);

  if (error) {
    return (
      <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-10 text-center">
          <h1 className="text-3xl font-semibold text-neutral-950">{t.reportUnavailable}</h1>
          <p className="mt-4 leading-7 text-neutral-600">{error}</p>
          <div className="mt-8">
            <PrimaryButton href="/result">{t.backToResult}</PrimaryButton>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  if (!report) {
    return <ReportLoading />;
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-12">
        <div className="flex items-center justify-between gap-4">
          <Link className="text-sm font-medium text-neutral-500 hover:text-neutral-950" href="/">
            AI Attachment Test
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              {t.unlocked}
            </span>
          </div>
        </div>

        <div className="mt-9">
          <div className="mb-8 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-soft">
            <img
              alt="Premium AI attachment report visual"
              className="h-56 w-full object-cover sm:h-72"
              src="/images/attachment-hero.png"
            />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">{report.styleLabel}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-neutral-950 sm:text-6xl">
            {report.title}
          </h1>
        </div>

        <div className="mt-9 grid gap-4">
          {report.sections.map((section) => (
            <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:p-6" key={section.title}>
              <h2 className="text-xl font-semibold tracking-normal text-neutral-950">{section.title}</h2>
              <p className="mt-3 whitespace-pre-line text-base leading-8 text-neutral-700">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function ReportLoading() {
  const { t } = useLocale();

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-10">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-soft">
          <LoaderCircle aria-hidden="true" className="h-8 w-8 animate-spin text-neutral-950" />
          <h1 className="mt-7 text-3xl font-semibold text-neutral-950">{t.reportLoadingTitle}</h1>
          <p className="mt-4 leading-7 text-neutral-600">{t.reportLoadingText}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
