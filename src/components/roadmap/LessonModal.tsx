'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Award, BookOpen } from 'lucide-react';
import { Lesson } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lessonId: string, score: number) => void;
}

export function LessonModal({ lesson, isOpen, onClose, onComplete }: LessonModalProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !lesson) return null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleHint = (questionId: string) => {
    setRevealedHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const calculateScore = () => {
    let correct = 0;
    lesson.practice_problems.forEach((p) => {
      if (selectedAnswers[p.id] === p.correctAnswerIndex) {
        correct++;
      }
    });
    return Math.round((correct / (lesson.practice_problems.length || 1)) * 100);
  };

  const handleSubmitPractice = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= 50) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
    onComplete(lesson.id, score);
  };

  const resetPractice = () => {
    setSelectedAnswers({});
    setRevealedHints({});
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-50 w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary">{lesson.grade_level}</Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lesson.topic}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{lesson.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/30 dark:bg-slate-900/30">
          <button
            type="button"
            onClick={() => setActiveTab('theory')}
            className={cn(
              "flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all",
              activeTab === 'theory'
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            )}
          >
            <BookOpen className="w-4 h-4" />
            <span>Theory & Concepts</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={cn(
              "flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all",
              activeTab === 'practice'
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            )}
          >
            <Award className="w-4 h-4" />
            <span>Practice Drills ({lesson.practice_problems.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'theory' ? (
            <div className="space-y-6">
              {/* Introduction */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm mb-1">
                  Why this matters for your Entrance Exam:
                </h4>
                <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
                  {lesson.content.introduction}
                </p>
                {lesson.content.introduction_uz && (
                  <p className="text-xs text-indigo-700/80 dark:text-indigo-400/80 mt-2 italic">
                    🇺🇿 {lesson.content.introduction_uz}
                  </p>
                )}
              </div>

              {/* Core Concept Breakdown */}
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-3">
                  Core Foundations
                </h3>
                <ul className="space-y-2">
                  {lesson.content.conceptSummary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formulas / Rules if present */}
              {lesson.content.formulaOrRules && lesson.content.formulaOrRules.length > 0 && (
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-3">
                    Exam Rules & Formulas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lesson.content.formulaOrRules.map((rule, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                          {rule.label}
                        </span>
                        <div className="font-mono text-base font-semibold text-slate-900 dark:text-slate-100 my-1">
                          {rule.formula}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{rule.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step by Step Examples */}
              {lesson.content.stepByStepExamples && (
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-3">
                    Step-by-Step Walkthrough
                  </h3>
                  {lesson.content.stepByStepExamples.map((example, idx) => (
                    <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                        {example.title}
                      </h4>
                      <div className="space-y-1.5 font-sans text-xs text-slate-600 dark:text-slate-300">
                        {example.steps.map((st, sIdx) => (
                          <div key={sIdx}>{st}</div>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Answer: {example.solution}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Takeaway */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-medium">
                ⚡ <strong>Key Takeaway:</strong> {lesson.content.keyTakeaway}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {lesson.practice_problems.map((problem, pIdx) => {
                const selectedOption = selectedAnswers[problem.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = isAnswered && selectedOption === problem.correctAnswerIndex;
                const hintVisible = revealedHints[problem.id];

                return (
                  <div
                    key={problem.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        Question {pIdx + 1}
                      </span>
                      <span className="text-xs font-semibold text-amber-600">+{problem.xp} XP</span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      {problem.question}
                    </h4>
                    {problem.question_uz && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic">
                        🇺🇿 {problem.question_uz}
                      </p>
                    )}

                    {/* Options list */}
                    <div className="space-y-2">
                      {problem.options.map((option, oIdx) => {
                        const isThisSelected = selectedOption === oIdx;
                        const isThisCorrect = oIdx === problem.correctAnswerIndex;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectOption(problem.id, oIdx)}
                            className={cn(
                              "w-full text-left p-3 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between",
                              !isSubmitted && isThisSelected
                                ? "border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 font-semibold"
                                : !isSubmitted
                                ? "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                : isThisCorrect
                                ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold"
                                : isThisSelected && !isThisCorrect
                                ? "border-rose-500 bg-rose-50/80 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200"
                                : "border-slate-200 dark:border-slate-800 opacity-60"
                            )}
                          >
                            <span>{option}</span>
                            {isSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                            {isSubmitted && isThisSelected && !isThisCorrect && (
                              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Hint Button */}
                    {problem.hint && !isSubmitted && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => handleToggleHint(problem.id)}
                          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{hintVisible ? "Hide Hint" : "Need a Hint?"}</span>
                        </button>
                        {hintVisible && (
                          <p className="mt-1.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                            💡 {problem.hint}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Explanation after submission */}
                    {isSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <strong>Explanation:</strong> {problem.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          {activeTab === 'theory' ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">Ready to test your knowledge?</span>
              <Button onClick={() => setActiveTab('practice')}>
                Practice Questions
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              {isSubmitted ? (
                <>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Score: {calculateScore()}% ({calculateScore() >= 50 ? "Passed 🎉" : "Needs Review"})
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetPractice}>
                      Retry Drills
                    </Button>
                    <Button size="sm" onClick={onClose}>
                      Done
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs text-slate-500">
                    {Object.keys(selectedAnswers).length} of {lesson.practice_problems.length} answered
                  </div>
                  <Button
                    onClick={handleSubmitPractice}
                    disabled={Object.keys(selectedAnswers).length === 0}
                  >
                    Submit Answers
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
