'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bot,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { BookModule, TrackType } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

// Import fallback local curriculum datasets for all 5 tracks
import mathCurriculum from '@/data/curriculum/math.json';
import itCurriculum from '@/data/curriculum/it.json';
import englishCurriculum from '@/data/curriculum/english.json';
import biologyCurriculum from '@/data/curriculum/biology.json';
import humanitiesCurriculum from '@/data/curriculum/humanities.json';

interface DigitalReaderProps {
  modules?: BookModule[];
  trackId?: TrackType;
  title?: string;
  className?: string;
}

export function DigitalReader({
  modules: externalModules,
  trackId = 'exact-sciences',
  title,
  className,
}: DigitalReaderProps) {
  const router = useRouter();
  const { language } = useLanguage();

  // Pick dataset based on track if modules not provided
  const getModulesForTrack = (): BookModule[] => {
    if (externalModules && externalModules.length > 0) {
      return externalModules;
    }
    switch (trackId) {
      case 'it':
      case 'it-basics':
        return itCurriculum as unknown as BookModule[];
      case 'languages':
      case 'english':
        return englishCurriculum as unknown as BookModule[];
      case 'medicine':
        return biologyCurriculum as unknown as BookModule[];
      case 'law':
        return humanitiesCurriculum as unknown as BookModule[];
      case 'exact-sciences':
      case 'math':
      default:
        return mathCurriculum as unknown as BookModule[];
    }
  };

  const modules = getModulesForTrack();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [copiedFormula, setCopiedFormula] = useState(false);

  const currentModule = modules[currentIndex] || modules[0];
  const totalPages = modules.length;

  // Reset quiz selection when changing page
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  }, [currentIndex]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalPages]);

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left -> next page
      handleNext();
    } else if (diff < -50) {
      // Swiped right -> prev page
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Contextual "Ask MentorAI" redirect handler
  const handleAskMentorAI = () => {
    if (!currentModule) return;
    const promptText = `Mavzu: ${currentModule.topic}. Men quyidagi misolni tushunmayapman: ${currentModule.example.problem}. Iltimos, buni bosqichma-bosqich, sodda tilda tushuntirib bering.`;
    router.push(`/tutor?prompt=${encodeURIComponent(promptText)}&track=${currentModule.track || trackId}`);
  };

  const handleCopyFormula = () => {
    if (currentModule?.formula) {
      navigator.clipboard.writeText(currentModule.formula);
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / totalPages) * 100);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn('space-y-6 select-none animate-in fade-in', className)}
    >
      {/* Top Header & Page Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {title || (language === 'uz' ? 'Raqamli Darslik' : language === 'ru' ? 'Цифровой Учебник' : 'Digital Textbook')}
              </span>
              <Badge variant="primary" className="bg-indigo-950 text-indigo-300 border-indigo-800 text-[10px] py-0 px-2">
                {currentModule.level}
              </Badge>
            </div>
            <h3 className="text-base font-bold text-white line-clamp-1">{currentModule.topic}</h3>
          </div>
        </div>

        {/* Paging Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
            {currentIndex + 1} / {totalPages}{' '}
            <span>{language === 'uz' ? 'sahifa' : language === 'ru' ? 'стр.' : 'page'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white transition-all shadow-sm"
              title="Oldingi sahifa (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === totalPages - 1}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all shadow-md shadow-indigo-600/30"
              title="Keyingi sahifa (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Linear Page Progress Indicator */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Digital Book Page Card */}
      <Card className="p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-3xl space-y-6">
        {/* Module Topic Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {language === 'uz' ? `${currentIndex + 1}-Dars Mazmuni` : language === 'ru' ? `Урок ${currentIndex + 1}` : `Module ${currentIndex + 1}`}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
              {currentModule.topic}
            </h2>
          </div>
          <Badge variant="primary" className="self-start text-xs py-1 px-3">
            {currentModule.level}
          </Badge>
        </div>

        {/* 1. Theory Section */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>{language === 'uz' ? 'Nazariy Tushuncha' : language === 'ru' ? 'Теория и Правила' : 'Theory & Concept'}</span>
          </h4>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            {currentModule.theory}
          </p>
        </div>

        {/* 2. Distinct Formula Container */}
        {currentModule.formula && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-800/60 p-5 shadow-lg text-white">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {language === 'uz' ? 'Asosiy Formula / Qoida' : language === 'ru' ? 'Основная Формула' : 'Key Formula'}
              </span>
              <button
                type="button"
                onClick={handleCopyFormula}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
                title="Formulani nusxalash"
              >
                {copiedFormula ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="font-mono text-base sm:text-lg text-indigo-200 tracking-wide select-all py-1">
              {currentModule.formula}
            </div>
          </div>
        )}

        {/* 3. Step-by-Step Example Card */}
        {currentModule.example && (
          <div className="rounded-2xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>{language === 'uz' ? 'Amaliy Namuna va Bosqichma-bosqich Yechim' : language === 'ru' ? 'Пример и Решение' : 'Worked Example'}</span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-amber-600 dark:text-amber-400 mr-1.5">{language === 'uz' ? 'Masala:' : 'Problem:'}</span>
                {currentModule.example.problem}
              </div>
              <div className="text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/80 p-3.5 rounded-xl border border-amber-100 dark:border-amber-950 font-sans leading-relaxed">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                  {language === 'uz' ? '✓ Yechilish bosqichi:' : '✓ Step-by-step solution:'}
                </span>
                {currentModule.example.solution}
              </div>
            </div>
          </div>
        )}

        {/* 4. Interactive Quiz Practice Card */}
        {currentModule.practice && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>{language === 'uz' ? 'Bilimni Sinash Testi' : language === 'ru' ? 'Проверочный Тест' : 'Practice Quiz'}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {language === 'uz' ? 'To\'g\'ri javobni tanlang' : 'Select correct answer'}
              </span>
            </div>

            <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
              {currentModule.practice.question}
            </p>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentModule.practice.options.map((opt, optIdx) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentModule.practice.correct;
                const showFeedback = isAnswerSubmitted;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => {
                      setSelectedOption(opt);
                      setIsAnswerSubmitted(true);
                    }}
                    className={cn(
                      'flex items-center justify-between p-3.5 rounded-xl text-sm font-semibold border transition-all text-left shadow-sm',
                      !showFeedback &&
                        'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30',
                      showFeedback &&
                        isCorrect &&
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 shadow-emerald-500/10',
                      showFeedback &&
                        isSelected &&
                        !isCorrect &&
                        'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 shadow-amber-500/10'
                    )}
                  >
                    <span>{opt}</span>
                    {showFeedback && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {showFeedback && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quiz Feedback Banner */}
            {isAnswerSubmitted && (
              <div
                className={cn(
                  'p-3.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in',
                  selectedOption === currentModule.practice.correct
                    ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                    : 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200'
                )}
              >
                {selectedOption === currentModule.practice.correct ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-900 dark:text-emerald-100">
                        {language === 'uz' ? 'Ajoyib! To\'g\'ri javob topildi.' : 'Correct answer! Excellent job.'}
                      </strong>
                      <span>{currentModule.practice.hint}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-950 dark:text-amber-100">
                        {language === 'uz' ? 'Xato. Keling, tahlil qilamiz:' : 'Incorrect. Let\'s review:'}
                      </strong>
                      <span>{currentModule.practice.hint}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* 5. Contextual "Ask MentorAI" Button */}
        <div className="pt-2">
          <Button
            type="button"
            onClick={handleAskMentorAI}
            className="w-full h-13 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Bot className="w-5 h-5 text-indigo-200" />
            <span>
              {language === 'uz'
                ? '🤖 Tushunmadim, AI repetitor tushuntirsin'
                : language === 'ru'
                ? '🤖 Не понял, пусть ИИ-репетитор объяснит'
                : '🤖 Don\'t understand? Ask MentorAI to explain'}
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

