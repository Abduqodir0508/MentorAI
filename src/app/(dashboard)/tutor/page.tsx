'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, ArrowLeft, Sparkles, Mic, BookOpen, ShieldCheck } from 'lucide-react';
import { TutorInterface } from '@/components/tutor/TutorInterface';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function TutorPage() {
  const { t, language } = useLanguage();
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const savedRole = localStorage.getItem('mentorai_role') as 'student' | 'admin';
    if (savedRole) setRole(savedRole);

    const savedName = localStorage.getItem('mentorai_user_name');
    if (savedName) setUserName(savedName);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.nav.dashboard}
            </Link>
            <Badge variant="primary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Socratic AI Tutor
            </Badge>
            {role === 'admin' && (
              <Badge variant="primary" className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <ShieldCheck className="w-3 h-3 mr-1" />
                {t.nav.adminMode}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {t.tutor.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.tutor.subtitle}
          </p>
        </div>
      </div>

      {/* Main Grid: Tutor Interface + Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TutorInterface
            initialTrackId="it"
            studentName={userName}
            hasActiveSubscription={true}
            isAdmin={role === 'admin'}
          />
        </div>

        {/* Sidebar Info & Exam Hints */}
        <div className="space-y-4">
          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Mic className="w-4 h-4" />
              <span>{t.tutor.voiceInteractionTitle}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.tutor.voiceInteractionDesc}
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div>🇺🇿 <strong>O&apos;zbek:</strong> Lotin imlosi va fonetikasi</div>
              <div>🇷🇺 <strong>Русский:</strong> Академический научный язык</div>
              <div>🇬🇧 <strong>English:</strong> Native entrance exam speech</div>
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{t.tutor.socraticTitle}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.tutor.socraticDesc}
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pl-3 list-disc">
              <li>{t.tutor.socratic1}</li>
              <li>{t.tutor.socratic2}</li>
              <li>{t.tutor.socratic3}</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
