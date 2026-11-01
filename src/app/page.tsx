'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Code,
  Atom,
  HeartPulse,
  Scale,
  Languages as LanguagesIcon,
  Mic,
  CheckCircle2,
  ShieldCheck,
  Users,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatUZS } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { ALL_TRACKS } from '@/lib/curriculum';

export default function LandingPage() {
  const { t, language } = useLanguage();

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
    <div className="flex flex-col min-h-screen animate-in fade-in">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.landing.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            {t.landing.heroTitle}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              {t.landing.heroTitleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.landing.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-indigo-600/25 font-bold">
                {t.landing.startFreeDiagnostic}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link href="/tutor" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-3.5 gap-2 font-bold">
                <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {t.landing.tryVoiceDemo}
              </Button>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{t.landing.statStudents}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.landing.statPassRate}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t.landing.statPrice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 CORE PILLARS */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">{language === 'uz' ? 'Qanday ishlaydi' : language === 'ru' ? 'Как это работает' : 'How It Works'}</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t.landing.whyTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.landing.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t.landing.pillar1Title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.landing.pillar1Desc}
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t.landing.pillar2Title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.landing.pillar2Desc}
              </p>
            </Card>

            <Card className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {t.landing.pillar3Title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.landing.pillar3Desc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ALL 5 TRACKS SHOWCASE */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="secondary">{language === 'uz' ? 'Barcha 5 Yo\'nalish' : language === 'ru' ? 'Все 5 Направлений' : 'All 5 Tracks'}</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t.landing.all5TracksTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.landing.all5TracksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_TRACKS.map((track) => {
              const Icon = trackIcons[track.id] || Code;
              const title = language === 'uz' ? track.title_uz : language === 'ru' ? track.title_ru : track.title;
              const desc = language === 'uz' ? track.description_uz : language === 'ru' ? track.description_ru : track.description;

              return (
                <Card key={track.id} className="p-6 flex flex-col justify-between hover:shadow-xl transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="primary">{track.level}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-4 leading-relaxed">
                      {desc}
                    </p>

                    {/* Subjects list */}
                    {track.subjects && (
                      <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {track.subjects.map((sub) => {
                          const subName = language === 'uz' ? sub.name_uz : language === 'ru' ? sub.name_ru : sub.name;
                          return (
                            <div key={sub.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{subName}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Link href={`/tracks/${track.slug}`}>
                    <Button variant="outline" className="w-full text-xs font-bold">
                      {t.dashboard.exploreTrackBtn}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING & SUBSCRIPTION PASS SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="success">{t.landing.pricingBadge}</Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {t.landing.pricingTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t.landing.pricingSubtitle}
          </p>

          <Card className="max-w-lg mx-auto p-8 border-2 border-indigo-600 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              {t.landing.popularPass}
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {t.landing.passName}
            </div>

            <div className="flex items-baseline gap-2 my-4">
              <span className="text-4xl font-black text-slate-900 dark:text-slate-100">
                {formatUZS(150000)}
              </span>
              <span className="text-sm text-slate-500 font-medium">/ {t.landing.month}</span>
            </div>

            <div className="space-y-3 py-4 border-y border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.tracks.it.title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.tracks.exactSciences.title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.tracks.medicine.title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.tracks.law.title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.tracks.languages.title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t.nav.aiVoiceTutor} (24/7 Socratic Method)</span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Link href="/billing">
                <Button size="lg" className="w-full font-bold text-base shadow-lg shadow-indigo-600/30">
                  {t.landing.activatePass}
                </Button>
              </Link>
              <p className="text-[11px] text-center text-slate-400">
                {t.landing.instantAccess}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900 dark:text-slate-100">MentorAI</span>
            <span>— {t.landing.badge}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {t.nav.dashboard}
            </Link>
            <Link href="/onboarding" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {t.landing.startFreeDiagnostic}
            </Link>
            <Link href="/tutor" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {t.nav.aiVoiceTutor}
            </Link>
            <Link href="/billing" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {t.nav.pass}
            </Link>
            <Link href="/admin" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              {t.nav.adminDashboard}
            </Link>
          </div>

          <div>{t.common.allRights}</div>
        </div>
      </footer>
    </div>
  );
}
