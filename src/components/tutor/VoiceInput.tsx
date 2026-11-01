'use client';

import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { VoiceAssistant } from '@/lib/ai/voice';
import { cn } from '@/lib/utils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language?: 'uz' | 'ru' | 'en';
  className?: string;
  disabled?: boolean;
}

export function VoiceInput({
  onTranscript,
  language = 'uz',
  className,
  disabled = false,
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = async () => {
    if (isListening) {
      VoiceAssistant.stopListening();
      setIsListening(false);
    } else {
      // Trigger mediaDevices.getUserMedia cleanly on click to present permission modal
      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
        } catch (micErr) {
          console.warn("Microphone access permission was not granted:", micErr);
          setIsListening(false);
          return;
        }
      }

      const langCode = language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US';
      const started = VoiceAssistant.startListening(
        (transcript) => {
          onTranscript(transcript);
        },
        (listeningState) => {
          setIsListening(listeningState);
        },
        langCode
      );

      if (!started) {
        setIsListening(false);
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {isListening && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
      )}
      <button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
        className={cn(
          "relative p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center",
          isListening
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105 animate-pulse"
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        title={isListening ? "Listening... click to stop" : "Speak your question"}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>
    </div>
  );
}

