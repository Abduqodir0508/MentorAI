'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Bot, User, Sparkles } from 'lucide-react';
import { TutorMessage } from '@/types';
import { VoiceAssistant } from '@/lib/ai/voice';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: TutorMessage;
  onSuggestionClick?: (text: string) => void;
}

export function ChatBubble({ message, onSuggestionClick }: ChatBubbleProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAI = message.sender === 'ai';

  const handleSpeak = () => {
    if (isSpeaking) {
      VoiceAssistant.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const langCode = message.language === 'uz' ? 'uz-UZ' : message.language === 'ru' ? 'ru-RU' : 'en-US';
      VoiceAssistant.speak(message.text, {
        lang: langCode,
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("flex flex-col gap-2 my-3", isAI ? "items-start" : "items-end")}>
      <div className={cn("flex items-start gap-3 max-w-[85%] md:max-w-[75%]", isAI ? "flex-row" : "flex-row-reverse")}>
        {/* Avatar */}
        <div
          className={cn(
            "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5",
            isAI
              ? "bg-gradient-to-tr from-indigo-600 to-violet-600 text-white"
              : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
          )}
        >
          {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </div>

        {/* Message Card */}
        <div
          className={cn(
            "rounded-2xl p-4 shadow-sm text-sm leading-relaxed transition-all",
            isAI
              ? "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-100"
              : "bg-indigo-600 text-white"
          )}
        >
          <div className="whitespace-pre-wrap font-sans">{message.text}</div>

          {/* Action Footer for AI messages */}
          {isAI && (
            <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-slate-400">
              <button
                type="button"
                onClick={handleSpeak}
                className={cn(
                  "p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors",
                  isSpeaking
                    ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 animate-pulse"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
                )}
                title={isSpeaking ? "Stop voice" : "Read aloud"}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-medium">{isSpeaking ? "Stop" : "Listen"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg text-xs flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Copy text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px] font-medium">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggestion Chips */}
      {isAI && message.suggestions && message.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 ml-11 max-w-[85%] mt-1">
          {message.suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSuggestionClick?.(suggestion)}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/50 dark:border-indigo-800/50 transition-colors font-medium text-left"
            >
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
