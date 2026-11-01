'use client';

import React from 'react';
import { Sparkles, Volume2, VolumeX, Square, BrainCircuit, Bot, Radio } from 'lucide-react';
import { TrackType } from '@/types';
import { cn } from '@/lib/utils';

export type AvatarState = 'idle' | 'thinking' | 'speaking';

interface AIAvatarWidgetProps {
  state: AvatarState;
  trackId?: TrackType;
  language?: 'uz' | 'ru' | 'en';
  autoSpeak?: boolean;
  onToggleAutoSpeak?: () => void;
  onStopSpeaking?: () => void;
  compact?: boolean;
  className?: string;
}

export function AIAvatarWidget({
  state,
  trackId = 'it',
  language = 'uz',
  autoSpeak = false,
  onToggleAutoSpeak,
  onStopSpeaking,
  compact = false,
  className,
}: AIAvatarWidgetProps) {
  const getStatusLabel = () => {
    if (language === 'uz') {
      switch (state) {
        case 'thinking':
          return { status: "O'ylamoqda...", detail: 'Gemini AI tahlil qilmoqda' };
        case 'speaking':
          return { status: 'Gapirmoqda...', detail: 'Ovozli tushuntirmoqda' };
        default:
          return { status: 'Tayyor', detail: 'Savolingizni kutyapman' };
      }
    }
    if (language === 'ru') {
      switch (state) {
        case 'thinking':
          return { status: 'Анализирует...', detail: 'Gemini AI формирует ответ' };
        case 'speaking':
          return { status: 'Говорит...', detail: 'Голосовое воспроизведение' };
        default:
          return { status: 'В сети', detail: 'Готов к разбору задач' };
      }
    }
    switch (state) {
      case 'thinking':
        return { status: 'Thinking...', detail: 'Gemini AI analyzing problem' };
      case 'speaking':
        return { status: 'Speaking...', detail: 'Reading answer aloud' };
      default:
        return { status: 'Online', detail: 'Ready for your questions' };
    }
  };

  const info = getStatusLabel();

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border transition-all duration-300',
          state === 'thinking' && 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
          state === 'speaking' && 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400',
          state === 'idle' && 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300',
          className
        )}
      >
        {/* Compact Mini Avatar Orb */}
        <div className="relative flex items-center justify-center w-6 h-6">
          {state === 'speaking' && (
            <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-40" />
          )}
          {state === 'thinking' && (
            <span className="absolute inset-0 rounded-full border border-dashed border-amber-500 animate-spin" />
          )}
          <div
            className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] shadow-sm transition-all',
              state === 'thinking' && 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/50',
              state === 'speaking' && 'bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-violet-500/50 scale-105',
              state === 'idle' && 'bg-gradient-to-tr from-indigo-500 to-cyan-500'
            )}
          >
            {state === 'thinking' ? (
              <BrainCircuit className="w-3 h-3 animate-spin" />
            ) : state === 'speaking' ? (
              <Radio className="w-3 h-3 animate-pulse" />
            ) : (
              <Bot className="w-3 h-3" />
            )}
          </div>
        </div>

        {/* Text Status */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold leading-none flex items-center gap-1">
            {info.status}
            {state === 'speaking' && (
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-0.5 h-2 bg-violet-500 animate-pulse" />
                <span className="w-0.5 h-3 bg-violet-500 animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-violet-500 animate-pulse delay-150" />
              </span>
            )}
          </span>
        </div>

        {state === 'speaking' && onStopSpeaking && (
          <button
            type="button"
            onClick={onStopSpeaking}
            className="p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-600 transition-colors"
            title="Stop speaking"
          >
            <Square className="w-3 h-3 fill-rose-600" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl p-5 border transition-all duration-500 backdrop-blur-xl',
        state === 'thinking' && 'bg-gradient-to-b from-amber-500/10 via-slate-900/40 to-slate-950/80 border-amber-500/40 shadow-xl shadow-amber-500/10',
        state === 'speaking' && 'bg-gradient-to-b from-violet-600/15 via-indigo-950/40 to-slate-950/80 border-violet-500/40 shadow-xl shadow-violet-500/20',
        state === 'idle' && 'bg-gradient-to-b from-indigo-500/5 via-slate-900/30 to-slate-950/60 border-slate-200 dark:border-slate-800 shadow-lg',
        className
      )}
    >
      {/* Background Ambient Glow */}
      <div
        className={cn(
          'absolute -top-16 -left-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-700',
          state === 'thinking' && 'bg-amber-500/30 scale-125',
          state === 'speaking' && 'bg-violet-500/35 scale-150',
          state === 'idle' && 'bg-indigo-500/15 scale-100'
        )}
      />
      <div
        className={cn(
          'absolute -bottom-16 -right-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-all duration-700',
          state === 'thinking' && 'bg-orange-500/25',
          state === 'speaking' && 'bg-indigo-500/30',
          state === 'idle' && 'bg-cyan-500/10'
        )}
      />

      <div className="relative flex flex-col items-center text-center space-y-4">
        {/* Header Tag */}
        <div className="flex items-center justify-between w-full px-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/60 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 shadow-sm">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            MentorAI Copilot
          </span>

          {/* Voice Mode Toggle Quick Access */}
          {onToggleAutoSpeak && (
            <button
              type="button"
              onClick={onToggleAutoSpeak}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors',
                autoSpeak
                  ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              )}
              title={autoSpeak ? 'Voice output active' : 'Voice output muted'}
            >
              {autoSpeak ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
              <span>{autoSpeak ? 'Voice ON' : 'Voice OFF'}</span>
            </button>
          )}
        </div>

        {/* Central Animated Holographic Orb Character */}
        <div className="relative my-2 flex items-center justify-center w-28 h-28">
          {/* Outer Pulsing Soundwave Rings (Speaking) */}
          {state === 'speaking' && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/40 animate-ping opacity-60" />
              <div className="absolute -inset-3 rounded-full border border-violet-400/30 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40" />
            </>
          )}

          {/* Spinning Orbit Ring (Thinking) */}
          {state === 'thinking' && (
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-400 animate-[spin_3s_linear_infinite]" />
          )}

          {/* Gentle Breathing Ring (Idle) */}
          {state === 'idle' && (
            <div className="absolute -inset-1.5 rounded-full border border-indigo-400/20 dark:border-indigo-500/30 animate-pulse" />
          )}

          {/* Main Avatar Character Body */}
          <div
            className={cn(
              'relative w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500',
              state === 'thinking' && 'bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-300 shadow-amber-500/50 scale-105',
              state === 'speaking' && 'bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-400 shadow-violet-500/60 scale-110',
              state === 'idle' && 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-indigo-500/40 hover:scale-105'
            )}
          >
            {/* Holographic Specular Glare */}
            <div className="absolute top-2 left-3 w-8 h-4 rounded-full bg-white/30 blur-[2px] transform -rotate-45" />

            {/* Robot Face Eyes & Smile */}
            <div className="flex flex-col items-center justify-center space-y-2 z-10">
              {/* Eyes */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'rounded-full bg-white transition-all shadow-md',
                    state === 'thinking' && 'w-3 h-3 bg-amber-100 animate-bounce',
                    state === 'speaking' && 'w-3.5 h-3.5 bg-white shadow-violet-200 animate-pulse',
                    state === 'idle' && 'w-3 h-3.5 bg-white'
                  )}
                />
                <div
                  className={cn(
                    'rounded-full bg-white transition-all shadow-md',
                    state === 'thinking' && 'w-3 h-3 bg-amber-100 animate-bounce delay-100',
                    state === 'speaking' && 'w-3.5 h-3.5 bg-white shadow-violet-200 animate-pulse',
                    state === 'idle' && 'w-3 h-3.5 bg-white'
                  )}
                />
              </div>

              {/* Mouth / Audio Equalizer */}
              {state === 'speaking' ? (
                /* Dynamic waveform equalizer bars */
                <div className="flex items-end gap-1 h-4 px-2">
                  <span className="w-1 bg-white rounded-full h-2 animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-1 bg-white rounded-full h-4 animate-[pulse_0.6s_ease-in-out_infinite_0.1s]" />
                  <span className="w-1 bg-white rounded-full h-3 animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
                  <span className="w-1 bg-white rounded-full h-4 animate-[pulse_0.7s_ease-in-out_infinite_0.15s]" />
                  <span className="w-1 bg-white rounded-full h-2 animate-[pulse_0.4s_ease-in-out_infinite_0.05s]" />
                </div>
              ) : state === 'thinking' ? (
                /* Thinking line wave */
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping delay-100" />
                </div>
              ) : (
                /* Friendly smile */
                <div className="w-5 h-2 border-b-2 border-white/90 rounded-full" />
              )}
            </div>
          </div>
        </div>

        {/* Status Indicator & Live Description */}
        <div className="space-y-1 w-full">
          <div className="flex items-center justify-center gap-2">
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                state === 'thinking' && 'bg-amber-400 animate-ping',
                state === 'speaking' && 'bg-violet-400 animate-ping',
                state === 'idle' && 'bg-emerald-400'
              )}
            />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{info.status}</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{info.detail}</p>
        </div>

        {/* Live Audio Stop Control */}
        {state === 'speaking' && onStopSpeaking && (
          <button
            type="button"
            onClick={onStopSpeaking}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors shadow-sm"
          >
            <Square className="w-3.5 h-3.5 fill-rose-600 dark:fill-rose-400" />
            <span>{language === 'uz' ? "Ovozni to'xtatish" : language === 'ru' ? 'Остановить голос' : 'Stop voice'}</span>
          </button>
        )}
      </div>
    </div>
  );
}

