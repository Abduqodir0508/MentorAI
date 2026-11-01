'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Code, Atom, HeartPulse, Scale, Languages as LanguagesIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ALL_TRACKS, TRACK_LESSONS } from '@/lib/curriculum';
import { useLanguage } from '@/context/LanguageContext';

export function RecommendedLessons() {
  const { t, language } = useLanguage();
  const nextLesson = TRACK_LESSONS.it[0]; // First lesson

  const lessonTitle =
    language === 'uz' ? nextLesson.title_uz : language === 'ru' ? nextLesson.title_ru : nextLesson.title;
  const lessonDesc =
    language === 'uz' ? nextLesson.description_uz : language === 'ru' ? nextLesson.description_ru : nextLesson.description;

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

  return (
    <div className="space-y-4">
      {/* Featured Next Lesson */}
      <Card className="p-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white border-0 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                <Sparkles className="w-3 h-3" />
                {t.dashboard.adaptiveRecBadge}
              </span>
              <span className="text-xs text-indigo-200/70 font-medium">
                {nextLesson.grade_level}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {lessonTitle}
            </h3>

            <p className="text-xs md:text-sm text-indigo-200/80 leading-relaxed">
              {lessonDesc}
            </p>

            <div className="flex items-center gap-4 text-xs text-indigo-300 pt-1">
              <span>⏱️ {nextLesson.duration_minutes} min</span>
              <span>🏆 +{nextLesson.xp_reward} XP</span>
              <span className="text-emerald-400 font-medium">{t.tracks.freePreview}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/tracks/it">
              <Button size="lg" className="bg-white text-indigo-950 hover:bg-indigo-50 shadow-lg font-bold">
                {t.dashboard.startNextLessonBtn}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 5 Tracks Quick Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ALL_TRACKS.map((track) => {
          const Icon = trackIcons[track.id] || Code;
          const title = language === 'uz' ? track.title_uz : language === 'ru' ? track.title_ru : track.title;

          return (
            <Link key={track.id} href={`/tracks/${track.slug}`}>
              <Card className="p-4 hover:border-indigo-500/50 hover:shadow-md transition-all group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/60 dark:group-hover:text-indigo-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {track.targetSchools[0]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{t.dashboard.exploreTrackBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
