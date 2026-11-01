import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MENTOR_SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export async function POST(req: NextRequest) {
  try {
    const { messages, trackId, language = "uz", isVoiceMode = false } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.text || "";

    // Track-specific system prompt selection
    let trackInstruction = MENTOR_SYSTEM_PROMPTS.mathTrack;
    if (trackId === "english") {
      trackInstruction = MENTOR_SYSTEM_PROMPTS.englishTrack;
    } else if (trackId === "it-basics") {
      trackInstruction = MENTOR_SYSTEM_PROMPTS.itTrack;
    }

    const systemPrompt = `${MENTOR_SYSTEM_PROMPTS.tutor}

Track Focus: ${trackInstruction}
Target Language: ${language === "uz" ? "Uzbek (O'zbek tili)" : language === "ru" ? "Russian (Русский)" : "English"}
Voice Mode: ${isVoiceMode ? "Active (Keep answers concise, clear and conversational for speech synthesis)" : "Inactive"}`;

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is provided, use live Gemini AI
    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt,
        });

        // Convert messages to history format
        const history = messages.slice(0, -1).map((m: any) => ({
          role: m.sender === "ai" ? "model" : "user",
          parts: [{ text: m.text }],
        }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastUserMessage);
        const responseText = result.response.text();

        return NextResponse.json({
          text: responseText,
          suggestions: generateContextualSuggestions(lastUserMessage, trackId, language),
        });
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, switching to pedagogical fallback:", geminiError?.message);
      }
    }

    // Intelligent fallback pedagogical response if no key configured or network is offline
    const responseText = generatePedagogicalFallback(lastUserMessage, trackId, language);
    return NextResponse.json({
      text: responseText,
      suggestions: generateContextualSuggestions(lastUserMessage, trackId, language),
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate tutor response", details: error.message },
      { status: 500 }
    );
  }
}

function generatePedagogicalFallback(userQuery: string, trackId: string, language: string): string {
  const q = userQuery.toLowerCase();

  if (language === "uz") {
    if (q.includes("salom") || q.includes("assalomu alaykum")) {
      return "Assalomu alaykum! Men sizning shaxsiy MentorAI murabbiyingizman. Litseyga kirish imtihonlariga birgalikda tayyorlanamiz. Bugun qaysi mavzu yoki misol ustida ishlaymiz?";
    }
    if (trackId === "math" || q.includes("kasr") || q.includes("tenglama") || q.includes("uchburchak")) {
      return `Juda yaxshi savol! Keling, buni qadam-baqadam tahlil qilamiz:
1. **Asosiy qoida**: Birinchi navbatda umumiy maxrajni yoki noma'lum o'zgaruvchini ajratib olamiz.
2. **Qadam**: Qavslarni oching va x hadlarini chap tomonga o'tkazing.
3. **Tekshirish**: Hosil bo'lgan natijani dastlabki ifodaga qo'yib ko'ring.

Qaysi qadamda to'xtab qoldingiz? Menga yozing yoki ovoz orqali ayting, birgalikda yechamiz!`;
    }
    if (trackId === "english" || q.includes("present") || q.includes("tense") || q.includes("grammar")) {
      return `Ajoyib savol! Ingliz tili imtihonlarida zamonlar va qoidalar eng ko'p ball olib keladi:
- **Asosiy qoida**: Agar gapda aniq o'tgan vaqt (yesterday, two days ago, in 2020) bo'lsa — har doim **Past Simple** ishlatiladi.
- Agar natija hozirgi vaqt bilan bog'liq bo'lsa yoki "so far, recently, ever, never" kabi so'zlar bo'lsa — **Present Perfect (have/has + V3)** tanlanadi.

Siz qaysi gapni tahlil qilmoqchisiz? Gapni to'liq yuboring!`;
    }
    return `MentorAI sizni eshitmoqda! Mavzuni tushunish uchun avval qoidani ko'rib chiqamiz, so'ngra Inha litseyi darajasidagi namunaviy testni yechamiz. Qanday savolingiz bor?`;
  }

  if (language === "ru") {
    if (q.includes("привет") || q.includes("здравствуй")) {
      return "Здравствуйте! Я ваш персональный ИИ-репетитор MentorAI. Мы вместе подготовимся к поступлению в лицей (Инха, Вестминстерский и академические лицеи). С какой темы начнем?";
    }
    if (trackId === "math") {
      return `Отличная задача! Давайте разберем её по шагам Сократовского метода:
1. **Определение данных**: Что нам известно и что нужно найти?
2. **Приведение к общему знаменателю / группировка**: Перенесем переменные в одну сторону, а числа в другую.
3. **Проверка**: Подставим полученный корень обратно.

На каком именно шаге возникло затруднение? Напишите или скажите голосом!`;
    }
    return `MentorAI на связи! По академической программе лицея мы фокусируемся на понимании фундаментальных принципов, а не на заучивании. Задайте вопрос или пришлите условие задачи!`;
  }

  // English fallback
  return `Great question! As your MentorAI tutor for lyceum entrance exam preparation, let's break this down methodically:
1. **Identify the Core Rule**: Pinpoint the underlying mathematical or grammatical theorem.
2. **Step-by-Step Isolation**: Isolate the variable or test marker.
3. **Verify**: Double-check for common entrance exam trap choices.

What specific line or calculation would you like us to solve together?`;
}

function generateContextualSuggestions(query: string, trackId: string, language: string): string[] {
  if (language === "uz") {
    if (trackId === "math") {
      return [
        "Kasrlarni qisqartirish usulini tushuntirib bering",
        "Viyet teoremasidan qanday tez foydalaniladi?",
        "To'g'ri burchakli uchburchak formulasini ko'rsating",
      ];
    }
    if (trackId === "english") {
      return [
        "Present Perfect va Past Simple farqi nima?",
        "Passive Voice formulasini tushuntiring",
        "Imtihon matnini tez o'qish sirlari",
      ];
    }
    return [
      "Semantic HTML teglar nima?",
      "Client va Server farqi",
      "Forma yaratish qoidalari",
    ];
  }

  return [
    "Explain this step-by-step",
    "Show me a lyceum exam practice problem",
    "How to avoid common trap choices?",
  ];
}
