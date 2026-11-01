'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Code, ArrowLeft, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CurriculumRoadmap } from '@/components/roadmap/CurriculumRoadmap';
import { LessonModal } from '@/components/roadmap/LessonModal';
import { TrackProgressBar } from '@/components/roadmap/TrackProgressBar';
import { getTrack, getLessonsByTrack } from '@/lib/curriculum';
import { Lesson } from '@/types';

export default function ITBasicsTrackPage() {
  const track = getTrack('it-basics')!;
  const lessons = getLessonsByTrack('it-basics');

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['it-01']);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('mentorai_role');
    if (role === 'admin') {
      setIsAdmin(true);
    }
    const savedCompleted = localStorage.getItem('mentorai_completed_it');
    if (savedCompleted) {
      try {
        setCompletedLessonIds(JSON.parse(savedCompleted));
      } catch (e) {}
    }
  }, []);

  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleLessonCompleted = (lessonId: string, score: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      const updated = [...completedLessonIds, lessonId];
      setCompletedLessonIds(updated);
      localStorage.setItem('mentorai_completed_it', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <Link href="/tutor">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Bot className="w-4 h-4 text-amber-600" />
            <span>Ask IT AI Tutor</span>
          </Button>
        </Link>
      </div>

      {/* Track Header Card */}
      <Card className="p-6 md:p-8 bg-gradient-to-r from-amber-950 via-orange-950 to-slate-950 text-white border-0 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/20 text-amber-300">
              <Code className="w-6 h-6" />
            </div>
            <Badge variant="primary" className="bg-amber-500/30 text-amber-200 border-amber-400/30">
              IT Lyceum & Web Foundations
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {track.title}
          </h1>

          <div className="text-xs text-amber-300 font-semibold">
            🇺🇿 {track.title_uz}
          </div>

          <p className="text-sm text-amber-200/80 max-w-2xl leading-relaxed">
            {track.description}
          </p>

          <div className="pt-4 max-w-md">
            <TrackProgressBar
              completedLessons={completedLessonIds.length}
              totalLessons={lessons.length}
              color="amber"
              label="Track Mastery"
              className="text-white"
            />
          </div>
        </div>
      </Card>

      {/* Interactive Curriculum Roadmap */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Web & Semantic HTML5 Curriculum
            </h3>
            <p className="text-xs text-slate-500">
              Fundamental architecture of the web, semantic tags, forms, and computational thinking for technical entrance tests.
            </p>
          </div>
        </div>

        <CurriculumRoadmap
          trackId="it-basics"
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
