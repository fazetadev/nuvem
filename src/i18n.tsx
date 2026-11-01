import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EN } from './translations.ts';

export type Lang = 'es' | 'en';

const LANG_KEY = 'nuvem_lang_v1';
export const USD_RATE = 3200; // COP por 1 USD (fijo, cámbialo aquí)

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Traduce un texto escrito en español. Admite {variables}. */
  t: (es: string, vars?: Record<string, string | number>) => string;
  /** Precio en la moneda activa (COP en español, USD en inglés). */
  formatPrice: (cop: number, usd?: number) => string;
  /** Equivalente en USD (número) */
  toUSD: (cop: number, usd?: number) => number;
  rate: number;
}

const I18nContext = createContext<I18nValue | null>(null);

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch { /* sin almacenamiento */ }
  return 'es';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(readLang);
  const rate = USD_RATE;

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch { /* ignore */ }
    document.documentElement.lang = l;
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = useMemo<I18nValue>(() => {
    const t = (es: string, vars?: Record<string, string | number>) => {
      let out = lang === 'en' ? (EN[es] ?? es) : es;
      if (vars) for (const k of Object.keys(vars)) out = out.split(`{${k}}`).join(String(vars[k]));
      return out;
    };
    const toUSD = (cop: number, usd?: number) => (typeof usd === 'number' ? usd : cop / rate);
    const formatPrice = (cop: number, usd?: number) => {
      if (lang === 'en') {
        return `US$ ${toUSD(cop, usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return `$ ${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(cop)} COP`;
    };
    return { lang, setLang, t, formatPrice, toUSD, rate };
  }, [lang, rate, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de I18nProvider');
  return ctx;
}
