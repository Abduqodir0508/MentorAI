'use client';

import React, { useState } from 'react';
import { Search, Shield, ShieldCheck, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  targetLyceum: string;
  subscriptionStatus: 'active' | 'inactive';
  mathLevel: string;
  englishLevel: string;
  gaps: string[];
}

export function UserRoleManager() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: 'usr-1',
      name: 'Azizbek Rahimov',
      email: 'azizbek.r@gmail.com',
      role: 'student',
      targetLyceum: 'Inha Academic Lyceum',
      subscriptionStatus: 'active',
      mathLevel: 'Grade 6 Foundations',
      englishLevel: 'A2 Elementary',
      gaps: ['Fractions & LCM', 'Present Simple vs Past Simple'],
    },
    {
      id: 'usr-2',
      name: 'Madina Karimova',
      email: 'madina.k@mail.ru',
      role: 'student',
      targetLyceum: 'ALWIUT (Westminster)',
      subscriptionStatus: 'active',
      mathLevel: 'Grade 8 Intermediate',
      englishLevel: 'B1 Intermediate',
      gaps: ['Quadratic Vieta Formulas'],
    },
    {
      id: 'usr-3',
      name: 'Shaxzod Tursunov',
      email: 'shaxzod.dev@gmail.com',
      role: 'student',
      targetLyceum: 'Al-Khwarizmi Specialized School',
      subscriptionStatus: 'inactive',
      mathLevel: 'Grade 4 Elementary',
      englishLevel: 'A1 Beginner',
      gaps: ['Fractions', 'Linear Equations', 'Basic Vocabulary'],
    },
    {
      id: 'usr-creator',
      name: 'Platform Creator (Admin)',
      email: 'creator@mentorai.uz',
      role: 'admin',
      targetLyceum: 'Full Superuser Access',
      subscriptionStatus: 'active',
      mathLevel: 'Grade 9+ Advanced',
      englishLevel: 'B2 Exam Ready',
      gaps: [],
    },
  ]);

  const toggleSubscription = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, subscriptionStatus: s.subscriptionStatus === 'active' ? 'inactive' : 'active' }
          : s
      )
    );
  };

  const toggleRole = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, role: s.role === 'admin' ? 'student' : 'admin' } : s
      )
    );
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.targetLyceum.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            Student Role & Diagnostic Gap Management
          </h3>
          <p className="text-xs text-slate-500">
            Superuser control: manage active subscription access, inspect diagnostic gaps, and configure roles.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="pb-3 px-2">Student</th>
              <th className="pb-3 px-2">Target Lyceum</th>
              <th className="pb-3 px-2">Diagnostic Levels</th>
              <th className="pb-3 px-2">Detected Gaps</th>
              <th className="pb-3 px-2">Pass (150K)</th>
              <th className="pb-3 px-2">Role</th>
              <th className="pb-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-2">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{s.name}</div>
                  <div className="text-[11px] text-slate-400">{s.email}</div>
                </td>
                <td className="py-3.5 px-2 text-slate-700 dark:text-slate-300">
                  {s.targetLyceum}
                </td>
                <td className="py-3.5 px-2">
                  <div className="text-indigo-600 dark:text-indigo-400 font-semibold">📐 {s.mathLevel}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-semibold">🇬🇧 {s.englishLevel}</div>
                </td>
                <td className="py-3.5 px-2">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {s.gaps.length > 0 ? (
                      s.gaps.map((gap, gIdx) => (
                        <span key={gIdx} className="px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-[10px]">
                          {gap}
                        </span>
                      ))
                    ) : (
                      <span className="text-emerald-600 font-semibold text-[10px]">No major gaps detected</span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-2">
                  <button
                    onClick={() => toggleSubscription(s.id)}
                    className="flex items-center gap-1.5 focus:outline-none"
                    title="Click to toggle subscription status"
                  >
                    {s.subscriptionStatus === 'active' ? (
                      <Badge variant="success" className="cursor-pointer">
                        <CheckCircle2 className="w-3 h-3" /> Active Pass
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="cursor-pointer text-slate-400">
                        <XCircle className="w-3 h-3" /> Inactive
                      </Badge>
                    )}
                  </button>
                </td>
                <td className="py-3.5 px-2">
                  {s.role === 'admin' ? (
                    <Badge variant="primary" className="gap-1">
                      <ShieldCheck className="w-3 h-3" /> Super Admin
                    </Badge>
                  ) : (
                    <Badge variant="default">Student</Badge>
                  )}
                </td>
                <td className="py-3.5 px-2 text-right">
                  <Button
                    size="sm"
                    variant={s.role === 'admin' ? 'outline' : 'ghost'}
                    onClick={() => toggleRole(s.id)}
                    className="text-[11px] h-8 px-2"
                  >
                    {s.role === 'admin' ? 'Demote to Student' : 'Elevate to Admin'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
