"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import { LanguageSwitcher, useLocale } from "@/components/LanguageSwitcher";
import { SiteFooter } from "@/components/SiteFooter";
import {
  STORAGE_KEY,
  calculateAttachmentStyle,
  getQuizQuestions,
  type QuizAnswer
} from "@/lib/quiz";

export default function TestPage() {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const questions = getQuizQuestions(locale);
  const currentQuestion = questions[step];
  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [questions.length, step]);

  function chooseAnswer(optionId: "A" | "B" | "C" | "D") {
    if (!currentQuestion || isAnalyzing) return;

    const option = currentQuestion.options.find((item) => item.id === optionId);
    if (!option) return;

    const nextAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        optionId: option.id,
        optionText: option.text,
        style: option.style
      }
    ];

    if (step < questions.length - 1) {
      setAnswers(nextAnswers);
      setStep((value) => value + 1);
      return;
    }

    setAnswers(nextAnswers);
    setIsAnalyzing(true);

    const result = {
      style: calculateAttachmentStyle(nextAnswers),
      answers: nextAnswers,
      createdAt: new Date().toISOString(),
      locale
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result));

    t.loading.forEach((_, index) => {
      window.setTimeout(() => setLoadingIndex(index), index * 850);
    });

    window.setTimeout(() => router.push("/result"), 2850);
  }

  function goBack() {
    if (isAnalyzing) return;
    if (step === 0) {
      router.push("/");
      return;
    }
    setAnswers((value) => value.slice(0, -1));
    setStep((value) => value - 1);
  }

  if (isAnalyzing) {
    return (
      <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
        <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-10">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-soft">
            <LoaderCircle aria-hidden="true" className="h-8 w-8 animate-spin text-neutral-950" />
            <h1 className="mt-7 text-3xl font-semibold tracking-normal text-neutral-950">{t.creating}</h1>
            <p className="mt-4 min-h-7 text-base text-neutral-600">{t.loading[loadingIndex]}</p>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full w-4/5 rounded-full bg-neutral-950 transition-all duration-700" />
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 py-6">
        <div className="flex items-center justify-between">
          <button
            aria-label="Go back"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-900"
            onClick={goBack}
            type="button"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          </button>
          <p className="text-sm font-medium text-neutral-500">
            {step + 1} / {questions.length}
          </p>
          <LanguageSwitcher compact />
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full rounded-full bg-neutral-950 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex flex-1 flex-col justify-center py-9">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            {t.question} {step + 1}
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-normal text-neutral-950 sm:text-4xl">
            {currentQuestion.prompt}
          </h1>

          <div className="mt-8 grid gap-3">
            {currentQuestion.options.map((option) => (
              <button
                className="group flex min-h-16 w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                key={option.id}
                onClick={() => chooseAnswer(option.id)}
                type="button"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-sm font-semibold group-hover:border-white">
                    {option.id}
                  </span>
                  <span className="text-sm font-medium leading-5 sm:text-base">{option.text}</span>
                </span>
                <Check aria-hidden="true" className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
