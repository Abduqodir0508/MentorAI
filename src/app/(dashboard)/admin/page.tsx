'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Code,
  Atom,
  HeartPulse,
  Scale,
  Languages as LanguagesIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { UserRoleManager } from '@/components/admin/UserRoleManager';
import { ALL_TRACKS, TRACK_LESSONS } from '@/lib/curriculum';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'curriculum'>('overview');

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              {t.admin.badge}
            </Badge>
            <span className="text-xs text-slate-400">{t.admin.badgeSub}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {t.admin.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.admin.subtitle}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.admin.tabAnalytics}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'users'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.admin.tabStudents}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'curriculum'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.admin.tabCurriculum}
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AdminAnalytics />
          <UserRoleManager />
        </div>
      )}

      {/* Tab 2: User Role Manager */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <UserRoleManager />
        </div>
      )}

      {/* Tab 3: Curriculum Oversight */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_TRACKS.map((track) => {
              const Icon = trackIcons[track.id] || Code;
              const lessons = TRACK_LESSONS[track.id] || [];
              const freeCount = lessons.filter((l) => l.is_free_preview).length;
              const title = language === 'uz' ? track.title_uz : language === 'ru' ? track.title_ru : track.title;
              const desc = language === 'uz' ? track.description_uz : language === 'ru' ? track.description_ru : track.description;

              return (
                <Card key={track.id} className="p-6 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{title}</span>
                      </div>
                      <Badge variant="outline">{lessons.length} {language === 'uz' ? 'Dars' : language === 'ru' ? 'Уроков' : 'Lessons'}</Badge>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {desc}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                      <div className="flex justify-between">
                        <span>{t.tracks.freePreview}:</span>
                        <strong className="text-emerald-600 font-semibold">{freeCount}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.tracks.lockedLesson}:</span>
                        <strong className="text-indigo-600 font-semibold">{lessons.length - freeCount}</strong>
                      </div>
                    </div>
                  </div>

                  <Link href={`/tracks/${track.slug}`} className="block pt-2">
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      {t.admin.inspectTrack}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
