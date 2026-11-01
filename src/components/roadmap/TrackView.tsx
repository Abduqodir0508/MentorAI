'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Code,
  Atom,
  HeartPulse,
  Scale,
  Languages as LanguagesIcon,
  ArrowLeft,
  Bot,
  School,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CurriculumRoadmap } from '@/components/roadmap/CurriculumRoadmap';
import { LessonModal } from '@/components/roadmap/LessonModal';
import { TrackProgressBar } from '@/components/roadmap/TrackProgressBar';
import { getTrackBySlugOrId, getLessonsByTrackId } from '@/lib/curriculum';
import { useLanguage } from '@/context/LanguageContext';
import { Lesson, TrackType } from '@/types';

interface TrackViewProps {
  trackId: TrackType;
}

export function TrackView({ trackId }: TrackViewProps) {
  const { t, language } = useLanguage();
  const track = getTrackBySlugOrId(trackId)!;
  const lessons = getLessonsByTrackId(trackId);

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([lessons[0]?.id || 'it-01']);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('mentorai_role');
    if (role === 'admin') {
      setIsAdmin(true);
    }
    const savedCompleted = localStorage.getItem(`mentorai_completed_${trackId}`);
    if (savedCompleted) {
      try {
        setCompletedLessonIds(JSON.parse(savedCompleted));
      } catch (e) {}
    }
  }, [trackId]);

  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleLessonCompleted = (lessonId: string, score: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      localStorage.setItem(`mentorai_completed_${trackId}`, JSON.stringify(updated));
    }
  };

  const iconMap = {
    it: Code,
    'exact-sciences': Atom,
    medicine: HeartPulse,
    law: Scale,
    languages: LanguagesIcon,
    math: Code,
    english: LanguagesIcon,
    'it-basics': Code,
  };

  const Icon = iconMap[trackId] || Code;

  const colorStyles: Record<string, { gradient: string; badge: string; iconBg: string }> = {
    it: {
      gradient: 'from-indigo-950 via-slate-900 to-indigo-900',
      badge: 'bg-indigo-500/30 text-indigo-200 border-indigo-400/30',
      iconBg: 'bg-indigo-500/20 border-indigo-400/20 text-indigo-300',
    },
    'exact-sciences': {
      gradient: 'from-blue-950 via-slate-900 to-blue-900',
      badge: 'bg-blue-500/30 text-blue-200 border-blue-400/30',
      iconBg: 'bg-blue-500/20 border-blue-400/20 text-blue-300',
    },
    medicine: {
      gradient: 'from-emerald-950 via-slate-900 to-teal-900',
      badge: 'bg-emerald-500/30 text-emerald-200 border-emerald-400/30',
      iconBg: 'bg-emerald-500/20 border-emerald-400/20 text-emerald-300',
    },
    law: {
      gradient: 'from-purple-950 via-slate-900 to-slate-900',
      badge: 'bg-purple-500/30 text-purple-200 border-purple-400/30',
      iconBg: 'bg-purple-500/20 border-purple-400/20 text-purple-300',
    },
    languages: {
      gradient: 'from-amber-950 via-slate-900 to-amber-900',
      badge: 'bg-amber-500/30 text-amber-200 border-amber-400/30',
      iconBg: 'bg-amber-500/20 border-amber-400/20 text-amber-300',
    },
  };

  const styling = colorStyles[trackId] || colorStyles.it;

  // Localized texts
  const trackTitle =
    language === 'uz' ? track.title_uz : language === 'ru' ? track.title_ru : track.title;
  const trackDesc =
    language === 'uz' ? track.description_uz : language === 'ru' ? track.description_ru : track.description;
  const trackLevel =
    language === 'uz' ? track.level_uz || track.level : language === 'ru' ? track.level_ru || track.level : track.level;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Nav Controls */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.backToDashboard}</span>
        </Link>

        <Link href="/tutor">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t.dashboard.talkToTutor}</span>
          </Button>
        </Link>
      </div>

      {/* Hero Track Header */}
      <Card className={`p-6 md:p-8 bg-gradient-to-r ${styling.gradient} text-white border-0 shadow-xl relative overflow-hidden`}>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className={`p-2.5 rounded-2xl border ${styling.iconBg}`}>
              <Icon className="w-6 h-6" />
            </div>
            <Badge variant="primary" className={styling.badge}>
              {trackLevel}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {trackTitle}
          </h1>

          <p className="text-sm text-slate-200/90 max-w-2xl leading-relaxed">
            {trackDesc}
          </p>

          {/* Target Institutions Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
            <School className="w-4 h-4 text-indigo-300 shrink-0" />
            <span className="font-semibold">{language === 'uz' ? 'Maqsad litseylar:' : language === 'ru' ? 'Целевые лицеи:' : 'Target Schools:'}</span>
            {track.targetSchools.map((school, sIdx) => (
              <span key={sIdx} className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-[11px]">
                {school}
              </span>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="pt-3 max-w-md">
            <TrackProgressBar
              completedLessons={completedLessonIds.length}
              totalLessons={lessons.length}
              color={trackId === 'medicine' ? 'emerald' : trackId === 'exact-sciences' ? 'indigo' : 'indigo'}
              label={t.tracks.trackProgress}
              className="text-white"
            />
          </div>
        </div>
      </Card>

      {/* Subjects Overview in this track */}
      {track.subjects && track.subjects.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            {language === 'uz' ? 'Yo\'nalish Fani Tarkibi' : language === 'ru' ? 'Предметы Направления' : 'Subjects in this Track'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {track.subjects.map((sub) => {
              const subName = language === 'uz' ? sub.name_uz : language === 'ru' ? sub.name_ru : sub.name;
              const subDesc = language === 'uz' ? sub.description_uz : language === 'ru' ? sub.description_ru : sub.description;
              return (
                <Card key={sub.id} className="p-4 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{subName}</span>
                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                        {sub.topicsCount} {language === 'uz' ? 'mavzu' : language === 'ru' ? 'тем' : 'topics'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{subDesc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'uz' ? 'Imtihon standartiga mos' : language === 'ru' ? 'Соответствует стандартам' : 'Exam Aligned'}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Progressive Roadmap & Lessons */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {t.tracks.syllabusTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {t.tracks.syllabusSub}
          </p>
        </div>

        <CurriculumRoadmap
          trackId={trackId}
          lessons={lessons}
          completedLessonIds={completedLessonIds}
          hasSubscription={hasSubscription}
          isAdmin={isAdmin}
          onSelectLesson={handleOpenLesson}
        />
      </div>

      {/* Interactive Lesson Modal */}
      <LessonModal
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleLessonCompleted}
      />
    </div>
  );
}

