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
  Send,
  Zap,
  Target,
  Calculator,
  Languages,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INITIAL_DIAGNOSTIC_QUESTIONS } from '@/lib/ai/prompts';
import { calculateStudyPlan, formatUZS } from '@/lib/utils';

export default function OnboardingPage() {
  const router = useRouter();

  // Step 1: Goal setting survey
  // Step 2: Conversational AI Diagnostic Test (Math & English)
  // Step 3: Personalized Study Prescription & Roadmap
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Survey state
  const [targetLyceum, setTargetLyceum] = useState('inha');
  const [targetDirection, setTargetDirection] = useState('it_math');
  const [availableMonths, setAvailableMonths] = useState(5);
  const [weeklyHours, setWeeklyHours] = useState(14);

  // Diagnostic state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswerInput, setCurrentAnswerInput] = useState('');
  const [isSubmittingDiagnostic, setIsSubmittingDiagnostic] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  const planPreview = calculateStudyPlan(availableMonths, weeklyHours);

  const handleNextQuestion = () => {
    const currentQ = INITIAL_DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQ.id]: currentAnswerInput };
    setAnswers(newAnswers);
    setCurrentAnswerInput('');

    if (currentQuestionIndex < INITIAL_DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Finished all diagnostic questions!
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
          targetLyceum,
          targetDirection,
          availableMonths,
          targetWeeklyHours: weeklyHours,
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

  const currentQ = INITIAL_DIAGNOSTIC_QUESTIONS[currentQuestionIndex];

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
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Goal & Timing</span>
        </div>
        <div className={`flex-1 h-0.5 mx-3 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            2
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">AI Diagnostic</span>
        </div>
        <div className={`flex-1 h-0.5 mx-3 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            3
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Study Roadmap</span>
        </div>
      </div>

      {/* STEP 1: GOAL SETTING & TIMING SURVEY */}
      {step === 1 && (
        <Card className="p-6 md:p-8 space-y-8 animate-in fade-in">
          <div>
            <Badge variant="primary" className="mb-2">
              <Target className="w-3.5 h-3.5 mr-1" /> Step 1: Calibration
            </Badge>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100">
              Set Your Lyceum Target & Study Schedule
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              MentorAI uses your timeline to dynamically configure the optimal study intensity.
            </p>
          </div>

          {/* Target Lyceum Selector */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <School className="w-4 h-4 text-indigo-600" />
              Target Academic Institution
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'inha', name: 'Inha Academic Lyceum (IUT)', desc: 'Math & English intensive' },
                { id: 'wiut', name: 'Westminster Lyceum (ALWIUT)', desc: 'Rigorous English & Math' },
                { id: 'al-khwarizmi', name: 'Al-Khwarizmi Specialized School', desc: 'IT & Exact Sciences' },
                { id: 'academic_lyceum', name: 'National Academic Lyceums', desc: 'State lyceum curriculum' },
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

          {/* Target Direction */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Exam Direction / Track
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'it_math', name: 'IT & Exact Sciences', tag: 'Most Popular' },
                { id: 'exact_sciences', name: 'Pure Math & Physics', tag: 'Engineering' },
                { id: 'economics', name: 'Economics & English', tag: 'Business/ALWIUT' },
              ].map((dir) => (
                <div
                  key={dir.id}
                  onClick={() => setTargetDirection(dir.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all text-center ${
                    targetDirection === dir.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 font-bold text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-semibold">{dir.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{dir.tag}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Remaining Slider & Smart Recommendation Box */}
          <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Remaining Preparation Time
              </label>
              <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                {availableMonths} Months Remaining
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
              <span>1 Month (Emergency Sprint)</span>
              <span>6 Months (Balanced)</span>
              <span>12 Months (Full Foundation)</span>
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
                    ? `⚡ Intensive Schedule Recommended (${planPreview.recommendedDailyHours} hours/day)`
                    : `🌱 Balanced Pace (${planPreview.recommendedDailyHours} hours/day)`}
                </div>
                <p className="leading-relaxed">{planPreview.advice.uz}</p>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={() => setStep(2)}>
            Start Conversational AI Diagnostic
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
              Question {currentQuestionIndex + 1} of {INITIAL_DIAGNOSTIC_QUESTIONS.length}
            </Badge>

            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {currentQ.subject === 'math' ? '📐 Math Diagnostic' : '🇬🇧 English Diagnostic'}
            </span>
          </div>

          {/* Question Box */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
              {currentQ.difficulty} level · {currentQ.expectedConcept}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {currentQ.question}
            </h3>
            {currentQ.question_uz && (
              <p className="text-xs text-indigo-800 dark:text-indigo-300 italic">
                🇺🇿 {currentQ.question_uz}
              </p>
            )}
          </div>

          {/* Student Answer Input */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Type your answer or step-by-step reasoning below:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentAnswerInput}
                onChange={(e) => setCurrentAnswerInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && currentAnswerInput.trim() && handleNextQuestion()}
                placeholder="e.g. 13/20, or x = 11, or walks, went..."
                className="flex-1 h-12 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <Button
                size="md"
                onClick={handleNextQuestion}
                disabled={!currentAnswerInput.trim() || isSubmittingDiagnostic}
                isLoading={isSubmittingDiagnostic}
                className="h-12 px-6"
              >
                {currentQuestionIndex < INITIAL_DIAGNOSTIC_QUESTIONS.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </>
                ) : (
                  <>
                    Finish Test
                    <CheckCircle2 className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-[11px] text-slate-400">
              Don’t worry if you aren’t 100% sure — MentorAI identifies exactly what grade-level concepts you need to review.
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
              Your Personalized Entrance Exam Prescription
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Calibrated specifically for {targetLyceum === 'inha' ? 'Inha Academic Lyceum' : 'Competitive Lyceums'} with {availableMonths} months remaining.
            </p>
          </div>

          {/* Scores & Identified Levels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" /> Math Proficiency
                </span>
                <span>{diagnosticResult?.math_score || 70}% Score</span>
              </div>
              <div className="text-lg font-black text-indigo-950 dark:text-indigo-100">
                {diagnosticResult?.math_level === 'grade9_advanced' ? 'Grade 9 Exam Advanced' : 'Grade 6-7 Foundations'}
              </div>
              <p className="text-[11px] text-indigo-800 dark:text-indigo-300">
                Strong intuition, but needs speed drills in quadratic shortcuts and plane geometry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4" /> English Proficiency
                </span>
                <span>{diagnosticResult?.english_score || 50}% Score</span>
              </div>
              <div className="text-lg font-black text-emerald-950 dark:text-emerald-100">
                {diagnosticResult?.english_level === 'b2_exam_ready' ? 'B2 Exam Ready' : 'A2 - B1 Intermediate'}
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                Good vocabulary base; requires timed skimming drills for entrance reading passages.
              </p>
            </div>
          </div>

          {/* Identified Gaps to Bridge */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Identified Root Gaps to Bridge:
            </h4>
            <div className="flex flex-wrap gap-2">
              {(diagnosticResult?.identified_gaps?.length > 0
                ? diagnosticResult.identified_gaps
                : ['Fractions & LCM Common Denominator', 'Present Perfect Passive Voice', 'Quadratic Vieta Shortcuts']
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
              <span>Recommended Daily Block:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">
                {planPreview.recommendedDailyHours} hours/day ({planPreview.recommendedWeeklyHours}h/week)
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {planPreview.advice.uz}
            </p>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => router.push('/dashboard')}
            >
              Enter My Student Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/learn/math')}
            >
              Start First Math Lesson (Free)
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
