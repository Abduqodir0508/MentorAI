'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Lock, Play, Clock, Award } from 'lucide-react';
import { Lesson, TrackType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface CurriculumRoadmapProps {
  trackId: TrackType;
  lessons: Lesson[];
  completedLessonIds?: string[];
  hasSubscription?: boolean;
  isAdmin?: boolean;
  onSelectLesson?: (lesson: Lesson) => void;
}

export function CurriculumRoadmap({
  trackId,
  lessons,
  completedLessonIds = [],
  hasSubscription = false,
  isAdmin = false,
  onSelectLesson,
}: CurriculumRoadmapProps) {
  const { t, language } = useLanguage();

  const isUnlocked = (lesson: Lesson) => {
    return isAdmin || hasSubscription || lesson.is_free_preview;
  };

  return (
    <div className="relative py-6">
      {/* Connecting spine line */}
      <div className="absolute left-6 md:left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-500 via-indigo-300 dark:via-indigo-900 to-slate-200 dark:to-slate-800" />

      <div className="space-y-8 relative">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);
          const unlocked = isUnlocked(lesson);

          const title =
            language === 'uz'
              ? lesson.title_uz || lesson.title
              : language === 'ru'
              ? lesson.title_ru || lesson.title
              : lesson.title;
          const description =
            language === 'uz'
              ? lesson.description_uz || lesson.description
              : language === 'ru'
              ? lesson.description_ru || lesson.description
              : lesson.description;
          const topic =
            language === 'uz'
              ? lesson.topic_uz || lesson.topic
              : language === 'ru'
              ? lesson.topic_ru || lesson.topic
              : lesson.topic;

          return (
            <div key={lesson.id} className="relative flex items-start gap-4 md:gap-6 group">
              {/* Node status icon */}
              <div
                className={cn(
                  "relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-bold text-sm md:text-base shrink-0 shadow-md transition-all duration-300",
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : unlocked
                    ? "bg-indigo-600 text-white shadow-indigo-600/25 group-hover:scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />
                ) : unlocked ? (
                  <span className="flex items-center justify-center">{index + 1}</span>
                ) : (
                  <Lock className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </div>

              {/* Lesson Card */}
              <div
                onClick={() => unlocked && onSelectLesson?.(lesson)}
                className={cn(
                  "flex-1 p-5 md:p-6 rounded-3xl border transition-all duration-200",
                  unlocked
                    ? "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-lg cursor-pointer"
                    : "bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-80"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={unlocked ? "primary" : "outline"}>{lesson.grade_level}</Badge>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {topic}
                    </span>
                    {lesson.is_free_preview && (
                      <Badge variant="success" className="animate-pulse">
                        {t.tracks.freePreview}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.duration_minutes} min
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                      <Award className="w-3.5 h-3.5" />
                      +{lesson.xp_reward} XP
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {title}
                </h4>

                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {description}
                </p>

                {/* Bottom Action */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {lesson.practice_problems.length} {language === 'uz' ? 'ta amaliy savol' : language === 'ru' ? 'практических заданий' : 'practice questions'}
                  </div>

                  {unlocked ? (
                    <Button
                      size="sm"
                      variant={isCompleted ? "outline" : "primary"}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson?.(lesson);
                      }}
                      className="font-bold text-xs"
                    >
                      <Play className="w-3.5 h-3.5 mr-1" />
                      {isCompleted ? t.tracks.reviewLesson : t.tracks.startLesson}
                    </Button>
                  ) : (
                    <Link href="/billing">
                      <Button size="sm" variant="secondary" className="gap-1.5 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        {t.tracks.unlockBtn}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
