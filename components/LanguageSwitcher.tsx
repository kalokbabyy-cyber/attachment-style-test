"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { LOCALE_STORAGE_KEY, LOCALES, copy, normalizeLocale, type LocaleCode } from "@/lib/i18n";

export function useLocale() {
  const [locale, setLocaleState] = useState<LocaleCode>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    const detected = normalizeLocale(stored || window.navigator.language);
    setLocaleState(detected);
  }, []);

  function setLocale(nextLocale: LocaleCode) {
    setLocaleState(nextLocale);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  }

  return { locale, setLocale, t: copy[locale] };
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm">
      <Languages aria-hidden="true" className="h-4 w-4" />
      <span className={compact ? "sr-only" : ""}>{t.language}</span>
      <select
        aria-label={t.language}
        className="bg-transparent text-xs font-semibold outline-none"
        onChange={(event) => setLocale(event.target.value as LocaleCode)}
        value={locale}
      >
        {LOCALES.map((item) => (
          <option key={item.code} value={item.code}>
            {compact ? item.short : item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
