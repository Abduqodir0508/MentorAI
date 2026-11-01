'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  className?: string;
}

export function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  className,
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const activeLang = currentLanguage || language;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    onLanguageChange?.(code);
  };

  return (
    <div className={cn("inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700", className)}>
      <div className="flex items-center px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
        <Globe className="w-3.5 h-3.5 mr-1" />
        <span className="hidden sm:inline font-medium">Tutor:</span>
      </div>
      {languages.map((lang) => {
        const isActive = activeLang === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang.code)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all",
              isActive
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
}
