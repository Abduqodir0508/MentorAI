'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Volume2, VolumeX, RotateCcw, BrainCircuit, ShieldAlert } from 'lucide-react';
import { TutorMessage } from '@/types';
import { ChatBubble } from './ChatBubble';
import { VoiceInput } from './VoiceInput';
import { LanguageSelector } from './LanguageSelector';
import { VoiceAssistant } from '@/lib/ai/voice';
import { cn } from '@/lib/utils';

interface TutorInterfaceProps {
  initialTrackId?: 'math' | 'english' | 'it-basics';
  studentName?: string;
  hasActiveSubscription?: boolean;
  isAdmin?: boolean;
}

export function TutorInterface({
  initialTrackId = 'math',
  studentName = 'Student',
  hasActiveSubscription = true,
  isAdmin = false,
}: TutorInterfaceProps) {
  const [trackId, setTrackId] = useState<'math' | 'english' | 'it-basics'>(initialTrackId);
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Assalomu alaykum, ${studentName}! Men sizning shaxsiy MentorAI murabbiyingizman. 

Litseyga (Inha, ALWIUT, akademik litseylar) kirish imtihonlariga tayyorlanishingizda har bir qadamda yordam beraman. 

Mavzuni tushunmay qolganingizda yoki qiyin masalaga duch kelganingizda savol bering yoki mikrofon orqali ayting!`,
      language: 'uz',
      timestamp: new Date().toISOString(),
      suggestions: [
        "Kasrlar va umumiy maxrajni qanday oson topish mumkin?",
        "Past Simple va Present Perfect farqini tushuntiring",
        "HTMLda semantic teglar nima uchun kerak?",
      ],
    },
  ]);

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
        text: data.text || "I'm ready to help! What question would you like to review next?",
        suggestions: data.suggestions || [],
        language,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If auto-speak enabled, synthesize speech
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
          text: "Tarmoq bilan ulanishda vaqtinchalik muammo bo'ldi. Iltimos qaytadan urinib ko'ring yoki savolni qisqartirib yozing.",
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
        text: language === 'uz'
          ? "Suhbat yangilandi. Qaysi mavzu bo'yicha savolingiz bor?"
          : language === 'ru'
          ? "Диалог обновлен. По какой теме у вас вопрос?"
          : "Chat reset. Which topic would you like to explore?",
        language,
        timestamp: new Date().toISOString(),
        suggestions: [
          "Matematika: chiziqli tenglamalar",
          "Ingliz tili: zamonlar va testlar",
          "IT: Web asoslari",
        ],
      },
    ]);
  };

  const tracks = [
    { id: 'math' as const, label: 'Math Prep', labelUz: 'Matematika', icon: '📐' },
    { id: 'english' as const, label: 'English Prep', labelUz: 'Ingliz Tili', icon: '🇬🇧' },
    { id: 'it-basics' as const, label: 'IT Foundations', labelUz: 'IT & Web', icon: '💻' },
  ];

  return (
    <div className="flex flex-col h-[740px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
        {/* Track selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl">
          {tracks.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTrackId(t.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                trackId === t.id
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span>{t.icon}</span>
              <span>{t.labelUz}</span>
            </button>
          ))}
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
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
            <span className="hidden sm:inline">{autoSpeak ? "Voice: ON" : "Voice: OFF"}</span>
          </button>

          {/* Reset chat */}
          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset conversation"
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
              <span>MentorAI is analyzing pedagogical approach</span>
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
              placeholder={
                language === 'uz'
                  ? "Savolingizni yozing yoki mikrofon orqali ayting..."
                  : language === 'ru'
                  ? "Напишите вопрос или произнесите в микрофон..."
                  : "Ask a math/English question or tap the mic..."
              }
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
          <span>💡 Socratic method active: MentorAI guides step-by-step for exam mastery</span>
          <span className="hidden md:inline">Web Speech API Voice enabled</span>
        </div>
      </div>
    </div>
  );
}
