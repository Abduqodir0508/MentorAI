/**
 * Web Speech API helper for MentorAI
 * Handles Speech-to-Text (STT) and Text-to-Speech (TTS)
 * Supports Uzbek, Russian, and English
 */

export interface SpeechOptions {
  lang?: 'uz-UZ' | 'ru-RU' | 'en-US' | string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export class VoiceAssistant {
  private static synth: SpeechSynthesis | null = null;
  private static recognition: any = null;
  private static isListening: boolean = false;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  /**
   * Speak text aloud using SpeechSynthesis
   */
  public static speak(text: string, options: SpeechOptions = {}) {
    const synth = this.getSynth();
    if (!synth) {
      console.warn("Web SpeechSynthesis is not supported in this browser.");
      options.onEnd?.();
      return;
    }

    // Cancel any previous speaking
    synth.cancel();

    // Clean text of markdown, code blocks, URLs, and latex formatting before speaking
    const cleanText = text
      .replace(/```[\s\S]*?```/g, ' ') // remove code blocks
      .replace(/`([^`]+)`/g, '$1')     // remove inline code ticks
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // markdown links
      .replace(/[*#_~>\[\]()]/g, ' ')  // symbols and formatting
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      options.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = options.pitch ?? 1.0;
    utterance.volume = options.volume ?? 1.0;

    // Pick a matching voice if available
    const voices = synth.getVoices();
    const targetLang = utterance.lang.split('-')[0].toLowerCase();
    const matchedVoice = voices.find((v) => 
      v.lang.toLowerCase().startsWith(targetLang) ||
      (targetLang === 'uz' && v.lang.toLowerCase().includes('tr')) // Fallback Turkish accent for Turkic Uzbek phonetics if uz voice not installed
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      options.onError?.(e);
      options.onEnd?.();
    };

    synth.speak(utterance);
  }

  /**
   * Stop any current speech
   */
  public static stopSpeaking() {
    const synth = this.getSynth();
    if (synth) {
      synth.cancel();
    }
  }

  /**
   * Check if speech synthesis is currently active
   */
  public static isSpeaking(): boolean {
    const synth = this.getSynth();
    return synth ? synth.speaking : false;
  }

  /**
   * Start listening for voice input (SpeechRecognition)
   */
  public static startListening(
    onResult: (transcript: string) => void,
    onStatusChange?: (isListening: boolean) => void,
    lang: 'uz-UZ' | 'ru-RU' | 'en-US' = 'en-US'
  ): boolean {
    if (typeof window === 'undefined') return false;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return false;
    }

    if (this.recognition && this.isListening) {
      try {
        this.recognition.abort();
      } catch (e) {
        // ignore
      }
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = lang;

      this.recognition.onstart = () => {
        this.isListening = true;
        onStatusChange?.(true);
      };

      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript.trim()) {
          onResult(finalTranscript);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        onStatusChange?.(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onStatusChange?.(false);
      };

      this.recognition.start();
      return true;
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      this.isListening = false;
      onStatusChange?.(false);
      return false;
    }
  }

  /**
   * Stop listening
   */
  public static stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListening = false;
  }
}

