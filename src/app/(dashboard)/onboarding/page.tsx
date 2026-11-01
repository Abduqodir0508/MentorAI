'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  School,
  Clock,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  Code,
  Atom,
  HeartPulse,
  Scale,
  Languages as LanguagesIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ALL_TRACKS } from '@/lib/curriculum';
import { getDiagnosticQuestionsForTrack } from '@/lib/ai/prompts';
import { calculateStudyPlan } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { TrackType } from '@/types';

export default function OnboardingPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  // Step 1: Goal setting survey (Institution, 5 tracks, time remaining)
  // Step 2: Conversational AI Diagnostic Test (Track-specific)
  // Step 3: Personalized Study Prescription & Roadmap
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Survey state
  const [targetLyceum, setTargetLyceum] = useState('inha');
  const [selectedTrack, setSelectedTrack] = useState<TrackType>('it');
  const [availableMonths, setAvailableMonths] = useState(5);
  const [weeklyHours, setWeeklyHours] = useState(14);

  // Diagnostic state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswerInput, setCurrentAnswerInput] = useState('');
  const [isSubmittingDiagnostic, setIsSubmittingDiagnostic] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  const planPreview = calculateStudyPlan(availableMonths, weeklyHours);
  const questions = getDiagnosticQuestionsForTrack(selectedTrack);
  const currentQ = questions[currentQuestionIndex] || questions[0];

  const handleNextQuestion = () => {
    if (!currentQ) return;
    const newAnswers = { ...answers, [currentQ.id]: currentAnswerInput };
    setAnswers(newAnswers);
    setCurrentAnswerInput('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      submitFullDiagnostic(newAnswers);
    }
  };

  const submitFullDiagnostic = async (finalAnswers: Record<string, string>) => {
    setIsSubmittingDiagnostic(true);
    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: finalAnswers,
          trackId: selectedTrack,
          targetLyceum,
          targetDirection: selectedTrack,
          availableMonths,
          targetWeeklyHours: weeklyHours,
          language,
        }),
      });

      const data = await res.json();
      setDiagnosticResult(data.assessment);
      setStep(3);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error(e);
      setStep(3);
    } finally {
      setIsSubmittingDiagnostic(false);
    }
  };

  const trackIcons = {
    it: Code,
    'exact-sciences': Atom,
    medicine: HeartPulse,
    law: Scale,
    languages: LanguagesIcon,
    math: Code,
    english: LanguagesIcon,
    'it-basics': Code,
  };

  // Localized question text
  const questionText =
    language === 'uz' ? currentQ?.question_uz : language === 'ru' ? currentQ?.question_ru : currentQ?.question;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto px-4 py-8">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            1
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.onboarding.step1}</span>
        </div>
        <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            2
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.onboarding.step2}</span>
        </div>
        <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            3
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t.onboarding.step3}</span>
        </div>
      </div>

      {/* STEP 1: GOAL SETTING & TIMING SURVEY */}
      {step === 1 && (
        <Card className="p-6 md:p-8 space-y-8 animate-in fade-in">
          <div>
            <Badge variant="primary" className="mb-2">
              <Target className="w-3.5 h-3.5 mr-1" /> {t.onboarding.step1}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
              {t.onboarding.calibrationTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.onboarding.calibrationSub}
            </p>
          </div>

          {/* Target Lyceum Selector */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <School className="w-4 h-4 text-indigo-600" />
              {t.onboarding.selectInstitution}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'inha', name: t.onboarding.inhaLyceum, desc: t.onboarding.inhaDesc },
                { id: 'wiut', name: t.onboarding.wiutLyceum, desc: t.onboarding.wiutDesc },
                { id: 'al-khwarizmi', name: t.onboarding.alkhwarizmiSchool, desc: t.onboarding.alkhwarizmiDesc },
                { id: 'academic_lyceum', name: t.onboarding.academicLyceum, desc: t.onboarding.academicDesc },
              ].map((lyceum) => (
                <div
                  key={lyceum.id}
                  onClick={() => setTargetLyceum(lyceum.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    targetLyceum === lyceum.id
                      ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-md ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{lyceum.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lyceum.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* All 5 Lyceum Tracks Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.onboarding.selectTrack} (5)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ALL_TRACKS.map((track) => {
                const Icon = trackIcons[track.id] || Code;
                const isSelected = selectedTrack === track.id;
                const title = language === 'uz' ? track.title_uz : language === 'ru' ? track.title_ru : track.title;
                const desc = language === 'uz' ? track.description_uz : language === 'ru' ? track.description_ru : track.description;

                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrack(track.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{track.level}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{title}</div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Remaining Slider & Smart Recommendation Box */}
          <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                {t.onboarding.remainingTime}
              </label>
              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                {availableMonths} {t.onboarding.months}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="12"
              value={availableMonths}
              onChange={(e) => setAvailableMonths(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>{t.onboarding.sprintNotice}</span>
              <span>{t.onboarding.balancedNotice}</span>
              <span>{t.onboarding.fullNotice}</span>
            </div>

            {/* Smart Pacing Notice */}
            <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
              planPreview.isIntensive
                ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 text-amber-900 dark:text-amber-200'
                : 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
            }`}>
              {planPreview.isIntensive ? (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold">
                  {planPreview.isIntensive
                    ? `${t.onboarding.intensiveRec} (${planPreview.recommendedDailyHours} ${t.onboarding.hoursPerDay})`
                    : `${t.onboarding.balancedRec} (${planPreview.recommendedDailyHours} ${t.onboarding.hoursPerDay})`}
                </div>
                <p className="leading-relaxed">
                  {language === 'uz' ? planPreview.advice.uz : language === 'ru' ? planPreview.advice.ru : planPreview.advice.en}
                </p>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full font-bold" onClick={() => setStep(2)}>
            {t.onboarding.startDiagnosticBtn}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      )}

      {/* STEP 2: CONVERSATIONAL AI DIAGNOSTIC LEVEL TEST */}
      {step === 2 && currentQ && (
        <Card className="p-6 md:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <Badge variant="primary" className="gap-1">
              <BrainCircuit className="w-3.5 h-3.5" />
              {t.onboarding.questionProgress} {currentQuestionIndex + 1} {t.onboarding.of} {questions.length}
            </Badge>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {currentQ.subject.toUpperCase()} · {currentQ.difficulty.toUpperCase()}
            </span>
          </div>

          {/* Question Box */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
              {currentQ.expectedConcept}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {questionText}
            </h3>
          </div>

          {/* Student Answer Input */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {t.onboarding.typeAnswerHint}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentAnswerInput}
                onChange={(e) => setCurrentAnswerInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && currentAnswerInput.trim() && handleNextQuestion()}
                placeholder={t.onboarding.answerPlaceholder}
                className="flex-1 h-12 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <Button
                size="md"
                onClick={handleNextQuestion}
                disabled={!currentAnswerInput.trim() || isSubmittingDiagnostic}
                isLoading={isSubmittingDiagnostic}
                className="h-12 px-6 font-bold"
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    {t.onboarding.nextBtn}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                ) : (
                  <>
                    {t.onboarding.finishBtn}
                    <CheckCircle2 className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-[11px] text-slate-400">
              MentorAI identifies exact grade-level gaps to construct your personalized study path.
            </p>
          </div>
        </Card>
      )}

      {/* STEP 3: PERSONALIZED STUDY PRESCRIPTION & ROADMAP */}
      {step === 3 && (
        <Card className="p-6 md:p-8 space-y-6 animate-in zoom-in-95">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
              {t.onboarding.prescriptionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.onboarding.prescriptionSub}
            </p>
          </div>

          {/* Scores & Identified Levels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> {t.onboarding.trackProficiency}
                </span>
                <span>{diagnosticResult?.track_score || 70}%</span>
              </div>
              <div className="text-lg font-black text-indigo-950 dark:text-indigo-100">
                {diagnosticResult?.overall_level || 'Intermediate Lyceum Level'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span>{t.onboarding.remainingTime}:</span>
                <span className="font-bold text-emerald-950 dark:text-emerald-200">{availableMonths} {t.onboarding.months}</span>
              </div>
              <div className="text-lg font-black text-emerald-950 dark:text-emerald-100">
                {planPreview.recommendedDailyHours} {t.onboarding.hoursPerDay}
              </div>
            </div>
          </div>

          {/* Identified Gaps to Bridge */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {t.onboarding.identifiedGaps}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(language === 'uz' && diagnosticResult?.identified_gaps_uz?.length > 0
                ? diagnosticResult.identified_gaps_uz
                : language === 'ru' && diagnosticResult?.identified_gaps_ru?.length > 0
                ? diagnosticResult.identified_gaps_ru
                : diagnosticResult?.identified_gaps?.length > 0
                ? diagnosticResult.identified_gaps
                : [t.onboarding.noGaps]
              ).map((gap: string, gIdx: number) => (
                <span
                  key={gIdx}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold"
                >
                  ⚠️ {gap}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Study Rhythm */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>{t.onboarding.recommendedDaily}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">
                {planPreview.recommendedDailyHours} {t.onboarding.hoursPerDay} ({planPreview.recommendedWeeklyHours} {t.onboarding.hoursPerWeek})
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'uz' ? planPreview.advice.uz : language === 'ru' ? planPreview.advice.ru : planPreview.advice.en}
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 font-bold"
              onClick={() => router.push('/dashboard')}
            >
              {t.onboarding.enterDashboardBtn}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push(`/tracks/${selectedTrack}`)}
            >
              {t.onboarding.startFirstLessonBtn}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
