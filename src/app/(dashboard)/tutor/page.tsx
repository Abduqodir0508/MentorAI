'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, ArrowLeft, Sparkles, Volume2, Mic, BookOpen, ShieldCheck } from 'lucide-react';
import { TutorInterface } from '@/components/tutor/TutorInterface';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TutorPage() {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [userName, setUserName] = useState('Student');

  useEffect(() => {
    const savedRole = localStorage.getItem('mentorai_role') as 'student' | 'admin';
    if (savedRole) setRole(savedRole);

    const savedName = localStorage.getItem('mentorai_user_name');
    if (savedName) setUserName(savedName);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <Badge variant="primary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Socratic AI Tutor
            </Badge>
            {role === 'admin' && (
              <Badge variant="primary" className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Admin Free Pass
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            Real-Time Conversational AI Voice Tutor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Speak aloud or type your entrance exam questions. MentorAI guides you step-by-step in Uzbek, Russian, or English.
          </p>
        </div>
      </div>

      {/* Main Grid: Tutor Interface + Quick Guides Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TutorInterface
            initialTrackId="math"
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
              <span>Voice Interaction</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tap the microphone to speak naturally. MentorAI uses the Web Speech API to listen and can read its responses back to you in fluent speech.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div>🇺🇿 <strong>O&apos;zbek:</strong> Lotin imlosi va talaffuzi</div>
              <div>🇷🇺 <strong>Русский:</strong> Академический русский язык</div>
              <div>🇬🇧 <strong>English:</strong> Native exam vocabulary</div>
            </div>
          </Card>

          <Card className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Socratic Method</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instead of immediately revealing the final number, MentorAI asks guiding questions:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pl-3 list-disc">
              <li>&quot;What is the common denominator between 4 and 6?&quot;</li>
              <li>&quot;Is the time period finished or still ongoing?&quot;</li>
              <li>&quot;Can we apply the Pythagorean theorem here?&quot;</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
