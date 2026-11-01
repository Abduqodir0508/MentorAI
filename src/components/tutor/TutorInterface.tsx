'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Volume2, VolumeX, RotateCcw, BrainCircuit } from 'lucide-react';
import { TutorMessage, TrackType } from '@/types';
import { ChatBubble } from './ChatBubble';
import { VoiceInput } from './VoiceInput';
import { LanguageSelector } from './LanguageSelector';
import { VoiceAssistant } from '@/lib/ai/voice';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface TutorInterfaceProps {
  initialTrackId?: TrackType;
  studentName?: string;
  hasActiveSubscription?: boolean;
  isAdmin?: boolean;
}

export function TutorInterface({
  initialTrackId = 'it',
  studentName = 'Student',
  hasActiveSubscription = true,
  isAdmin = false,
}: TutorInterfaceProps) {
  const { language, setLanguage, t } = useLanguage();
  const [trackId, setTrackId] = useState<TrackType>(initialTrackId);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getWelcomeText = (lang: string, name: string) => {
    if (lang === 'uz') {
      return `Assalomu alaykum, ${name}! Men sizning shaxsiy MentorAI repetitoringizman.

Litsey va kollejlarga (Inha, ALWIUT, Toshkent tibbiyot, Yuridik va boshqa litseylar) kirish imtihonlariga tayyorlanishingizda har bir qadamda yordam beraman.

Mavzuni tushunmay qolganingizda yoki savolingiz bo'lsa, yozing yoki mikrofon orqali ayting!`;
    }
    if (lang === 'ru') {
      return `Здравствуйте, ${name}! Я ваш персональный ИИ-репетитор MentorAI.

Я помогу вам подготовиться к поступлению в лицеи (Инха, Вестминстерский, медицинские и академические лицеи).

Если у вас возник вопрос по задаче или теории — напишите или произнесите в микрофон!`;
    }
    return `Hello, ${name}! I am your personal MentorAI entrance exam tutor.

I will guide you step-by-step through admissions prep for Inha, ALWIUT, and competitive specialized colleges.

Whenever you are stuck or need a step explained, type or use your microphone!`;
  };

  const getInitialSuggestions = (lang: string) => {
    if (lang === 'uz') {
      return [
        "Kasrlarni qisqartirish va umumiy maxraj topish",
        "Viyet teoremasidan qanday tez foydalaniladi?",
        "O'simlik va hayvon hujayralari farqi nima?",
      ];
    }
    if (lang === 'ru') {
      return [
        "Как быстро находить общий знаменатель дробей?",
        "Как применять теорему Виета для x₁² + x₂²?",
        "Разница между Past Simple и Present Perfect",
      ];
    }
    return [
      "How to find common denominator for fractions?",
      "Explain Vieta's formulas for quadratics",
      "Past Simple vs Present Perfect triggers",
    ];
  };

  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: getWelcomeText(language, studentName),
      language,
      timestamp: new Date().toISOString(),
      suggestions: getInitialSuggestions(language),
    },
  ]);

  // Update welcome message if language changes and only welcome is present
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [
          {
            id: 'welcome-msg',
            sender: 'ai',
            text: getWelcomeText(language, studentName),
            language,
            timestamp: new Date().toISOString(),
            suggestions: getInitialSuggestions(language),
          },
        ];
      }
      return prev;
    });
  }, [language, studentName]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: TutorMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      language,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          trackId,
          language,
          isVoiceMode: autoSpeak,
        }),
      });

      const data = await response.json();

      const aiMsg: TutorMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "Ready to continue! What problem should we analyze next?",
        suggestions: data.suggestions || [],
        language,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If auto-speak enabled, synthesize speech in target language
      if (autoSpeak) {
        const langCode = language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US';
        VoiceAssistant.speak(aiMsg.text, { lang: langCode });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text:
            language === 'uz'
              ? "Ulanishda vaqtinchalik muammo bo'ldi. Qaytadan urinib ko'ring."
              : language === 'ru'
              ? "Временная ошибка сети. Пожалуйста, повторите запрос."
              : "Temporary connection issue. Please retry.",
          language,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    VoiceAssistant.stopSpeaking();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: getWelcomeText(language, studentName),
        language,
        timestamp: new Date().toISOString(),
        suggestions: getInitialSuggestions(language),
      },
    ]);
  };

  const tracks = [
    { id: 'it' as const, label: t.tracks.it.shortTitle, icon: '💻' },
    { id: 'exact-sciences' as const, label: t.tracks.exactSciences.shortTitle, icon: '📐' },
    { id: 'medicine' as const, label: t.tracks.medicine.shortTitle, icon: '🧬' },
    { id: 'law' as const, label: t.tracks.law.shortTitle, icon: '⚖️' },
    { id: 'languages' as const, label: t.tracks.languages.shortTitle, icon: '🌐' },
  ];

  return (
    <div className="flex flex-col h-[740px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
        {/* 5 Tracks Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl overflow-x-auto max-w-full">
          {tracks.map((tItem) => (
            <button
              key={tItem.id}
              type="button"
              onClick={() => setTrackId(tItem.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
                trackId === tItem.id
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span>{tItem.icon}</span>
              <span>{tItem.label}</span>
            </button>
          ))}
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          {/* Language selector in tutor */}
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

          {/* Auto voice output toggle */}
          <button
            type="button"
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors",
              autoSpeak
                ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-300"
                : "border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            )}
            title="Auto-read AI answers out loud"
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoSpeak ? t.tutor.voiceOn : t.tutor.voiceOff}</span>
          </button>

          {/* Reset chat */}
          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={t.tutor.resetChat}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            onSuggestionClick={(suggestion) => handleSendMessage(suggestion)}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-xs py-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 animate-pulse">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span>{t.tutor.analyzingText}</span>
              <span className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Speech-to-text mic */}
          <VoiceInput
            language={language}
            onTranscript={(transcript) => {
              setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
            }}
            disabled={isLoading}
          />

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.tutor.typePlaceholder}
              disabled={isLoading}
              className="w-full h-12 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="h-12 w-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-indigo-500/25 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-2 px-1">
          <span>{t.tutor.socraticNotice}</span>
          <span className="hidden md:inline">{t.tutor.speechEnabledNotice}</span>
        </div>
      </div>
    </div>
  );
}
