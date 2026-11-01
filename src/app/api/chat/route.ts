import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MENTOR_SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export async function POST(req: NextRequest) {
  try {
    const { messages, trackId = "it", language = "uz", isVoiceMode = false } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.text || "";

    // Track-specific system prompt selection
    const trackInstruction =
      MENTOR_SYSTEM_PROMPTS.tracks[trackId as keyof typeof MENTOR_SYSTEM_PROMPTS.tracks] ||
      MENTOR_SYSTEM_PROMPTS.tracks.it;

    const langName =
      language === "uz" ? "Uzbek (O'zbek tili, Lotin imlosi)" : language === "ru" ? "Russian (Русский язык)" : "English";

    const systemPrompt = `${MENTOR_SYSTEM_PROMPTS.tutor}

Track Focus: ${trackInstruction}
Selected UI & Output Language: ${langName}
CRITICAL RULE: Always reply entirely in ${langName}. Do NOT mix other languages.
Voice Synthesis Mode: ${isVoiceMode ? "ACTIVE (Keep sentences concise, rhythmic, and clear for voice synthesis)" : "Standard"}`;

    const apiKey = process.env.GEMINI_API_KEY;

    // Live Gemini AI if key exists and is not placeholder
    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: systemPrompt,
        });

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
        console.warn("Gemini API call error, falling back to local pedagogical responder:", geminiError?.message);
      }
    }

    // High quality pedagogical fallback responder
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

  // UZBEK LOCALIZATION
  if (language === "uz") {
    if (q.includes("salom") || q.includes("assalomu")) {
      return "Assalomu alaykum! Men sizning shaxsiy MentorAI murabbiyingizman. Litsey imtihonlariga tayyorlanishingizda har bir bosqichda yordam beraman. Bugun qaysi mavzu yoki masala ustida ishlaymiz?";
    }
    if (trackId === "exact-sciences" || q.includes("viyet") || q.includes("fizika") || q.includes("nyuton")) {
      return `Ajoyib masala! Aniq fanlar yo'nalishida Sokratik uslubda qadam-baqadam yondashamiz:
1. **Asosiy qoida**: Berilgan kattaliklarni va noma'lumni ajratib oling.
2. **Formulani tanlash**: Kvadrat tenglama bo'lsa Viyet formulalari x₁ + x₂ = -b/a, fizika bo'lsa F = m · a qonunini qo'llaymiz.
3. **Qadam**: Natijani tekshirib ko'ring.

Qaysi qatorda to'xtab qoldingiz? Menga yozing yoki mikrofon orqali ayting!`;
    }
    if (trackId === "medicine" || q.includes("hujayra") || q.includes("kimyo") || q.includes("valentlik")) {
      return `Tibbiyot yo'nalishi uchun muhim savol! Keling, buni biologiya/kimyo tamoyillari asosida ko'ramiz:
- **Biologiya**: O'simlik va hayvon hujayralari farqi (mitoxondriya ATF beradi, xloroplast esa fotosintez qiladi).
- **Kimyo**: Reaksiyada massaning saqlanish qonuni bo'yicha chap va o'ng tomondagi atomlar soni teng bo'lishi shart.

Qaysi modda yoki organoid haqida to'liqroq bilmoqchisiz?`;
    }
    if (trackId === "law" || q.includes("tarix") || q.includes("huquq") || q.includes("temur")) {
      return `Yuridik litsey uchun ajoyib savol! 
- **Tarixiy asos**: 1370-yilda Amir Temur Balxdagi qurultoyda davlat asoschisi deb e'lon qilingan va "Kuch — adolatdadir" tamoyilini o'rnatgan.
- **Huquqiy asos**: O'zbekiston Respublikasida qonun chiqaruvchi oliy organ — Oliy Majlis hisoblanadi.

Siz qaysi davr yoki huquqiy norma bo'yicha tahlil qilmoqchisiz?`;
    }
    if (trackId === "languages" || q.includes("present") || q.includes("tense") || q.includes("passive")) {
      return `Ingliz tili imtihonlari bo'yicha asosiy qoidani eslataman:
- Agar gapda aniq tugallangan vaqt ko'rsatilgan bo'lsa (yesterday, two days ago, in 2021) — har doim **Past Simple** ishlatiladi.
- Agar natija hozirgi vaqtga ta'sir qilsa yoki "so far, recently, ever" bo'lsa — **Present Perfect (have/has + V3)** tanlanadi.

Qaysi gapni birgalikda tekshiramiz?`;
    }
    return `MentorAI sizni eshitmoqda! Mavzuni chuqur tushunish uchun avval qoidani ko'rib chiqamiz, so'ngra litsey testini yechamiz. Savolingizni bering!`;
  }

  // RUSSIAN LOCALIZATION
  if (language === "ru") {
    if (q.includes("привет") || q.includes("здравствуй")) {
      return "Здравствуйте! Я ваш персональный ИИ-репетитор MentorAI. Мы готовимся к поступлению в лицеи (Инха, Вестминстерский, медицинские и академические лицеи). По какому предмету или теме начнем разбор?";
    }
    if (trackId === "exact-sciences" || q.includes("виет") || q.includes("физик") || q.includes("ньютон")) {
      return `Отличная задача! Давайте разберем её по шагам Сократовского метода:
1. **Данные**: Что нам известно и какую величину нужно выразить?
2. **Формула**: Если это квадратное уравнение — применяем теорему Виета x₁ + x₂ = -b/a. Если механика — второй закон Ньютона F = m · a.
3. **Проверка**: Проверяем размерности и подставляем значения.

На каком именно шаге возник вопрос? Напишите или скажите голосом!`;
    }
    if (trackId === "medicine" || q.includes("клетк") || q.includes("хими") || q.includes("валентност")) {
      return `Важный вопрос для медицинского лицея!
- **Цитология**: Митохондрии вырабатывают молекулы АТФ, рибосомы синтезируют белок, а хлоропласты отвечают за фотосинтез у растений.
- **Химия**: Сумма единиц валентности первого элемента должна строго равняться сумме валентностей второго элемента.

Какую конкретно реакцию или структуру клетки разберем подробнее?`;
    }
    if (trackId === "law" || q.includes("истори") || q.includes("прав") || q.includes("темур")) {
      return `Замечательный вопрос для юридического направления!
- **История**: В 1370 году на курултае в Балхе Амир Темур был провозглашен верховным правителем. Девиз: «Сила — в справедливости».
- **Право**: Высшим законодательным органом Республики Узбекистан является Олий Мажлис.

Какой исторический период или правовую норму вы хотите разобрать?`;
    }
    return `MentorAI на связи! По программе академических лицеев мы учимся глубокому пониманию принципов, а не заучиванию. Задайте вопрос или пришлите формулу!`;
  }

  // ENGLISH LOCALIZATION
  return `Hello! As your MentorAI tutor preparing you for competitive lyceum entrance exams, let's break this down methodically:
1. **Identify the Core Principle**: Pinpoint the governing mathematical, grammatical, or scientific theorem.
2. **Step-by-Step Isolation**: Isolate the variable or test trigger word.
3. **Verify**: Eliminate distractor choices designed to trap hasty test-takers.

What specific line, formula, or sentence would you like us to solve together?`;
}

function generateContextualSuggestions(query: string, trackId: string, language: string): string[] {
  if (language === "uz") {
    switch (trackId) {
      case "exact-sciences":
        return [
          "Viyet teoremasidan qanday tez foydalaniladi?",
          "Nyutonning 2-qonuniga oid misol ko'rsating",
          "O'rtacha tezlik formulasini tushuntiring",
        ];
      case "medicine":
        return [
          "O'simlik va hayvon hujayralari farqi nima?",
          "Kimyoviy valentlik qanday aniqlanadi?",
          "Reaksiyalarni tenglashning tezkor usuli",
        ];
      case "law":
        return [
          "Temuriylar davlati qachon tashkil topgan?",
          "Hokimiyat bo'linishi prinsipi nima?",
          "Aybsizlik prezumpsiyasi qoidasi",
        ];
      case "languages":
        return [
          "Present Perfect va Past Simple farqi nima?",
          "Passive Voice formulasini tushuntiring",
          "Imtihon matnini tez o'qish (skimming) sirlari",
        ];
      default:
        return [
          "Kasrlarni qisqartirish usulini tushuntirib bering",
          "Semantic HTML teglar nima uchun kerak?",
          "Chiziqli tenglamalarni yechish qoidalari",
        ];
    }
  }

  if (language === "ru") {
    switch (trackId) {
      case "exact-sciences":
        return [
          "Как применять теорему Виета для x₁² + x₂²?",
          "Формула средней скорости при движении",
          "Второй закон Ньютона: пример задачи",
        ];
      case "medicine":
        return [
          "Функции митохондрий и рибосом в клетке",
          "Как составлять формулы оксидов по валентности?",
          "Уравнивание химических реакций",
        ];
      case "law":
        return [
          "Когда Амир Темур основал централизованное государство?",
          "Ветви власти в Республике Узбекистан",
          "Что такое презумпция невиновности?",
        ];
      default:
        return [
          "Разница между Past Simple и Present Perfect",
          "Как быстро находить общий знаменатель дробей?",
          "Семантические теги в HTML5",
        ];
    }
  }

  return [
    "Explain this step-by-step",
    "Show me a competitive lyceum exam problem",
    "How to avoid common trap choices?",
  ];
}
