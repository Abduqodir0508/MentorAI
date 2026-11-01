'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Calculator, Languages, Code } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TRACKS_DATA, LESSONS_DATA } from '@/lib/curriculum';

interface RecommendedLessonsProps {
  onOpenLesson?: (lessonId: string) => void;
}

export function RecommendedLessons({ onOpenLesson }: RecommendedLessonsProps) {
  const nextLesson = LESSONS_DATA[0]; // First lesson: Mastering Fractions

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
                Adaptive Recommendation
              </span>
              <span className="text-xs text-indigo-200/70 font-medium">
                {nextLesson.grade_level}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              {nextLesson.title}
            </h3>

            <p className="text-xs md:text-sm text-indigo-200/80 leading-relaxed">
              {nextLesson.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-indigo-300 pt-1">
              <span>⏱️ {nextLesson.duration_minutes} mins</span>
              <span>🏆 +{nextLesson.xp_reward} XP</span>
              <span className="text-emerald-400 font-medium">Free Preview</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/learn/math">
              <Button size="lg" className="bg-white text-indigo-950 hover:bg-indigo-50 shadow-lg font-bold">
                Start Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 3 Tracks Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TRACKS_DATA.map((track) => {
          const iconMap = {
            math: Calculator,
            english: Languages,
            'it-basics': Code,
          };
          const Icon = iconMap[track.id as keyof typeof iconMap] || BookOpen;

          return (
            <Link key={track.id} href={`/learn/${track.id}`}>
              <Card className="p-5 hover:border-indigo-500/50 hover:shadow-md transition-all group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/60 dark:group-hover:text-indigo-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {track.level}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {track.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Enter Track</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
