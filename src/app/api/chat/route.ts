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

    const systemPrompt = `You are MentorAI — an intelligent, highly knowledgeable tutor helping middle and high school students prepare for competitive academic lyceum and college entrance exams in Uzbekistan (Inha Lyceum, Westminster ALWIUT, TUIT Lyceum, TMA Medical Lyceum, TSUL Law Lyceum, Specialized Lyceums).

Current Track Context: ${trackInstruction}
Selected Output Language: ${langName}

CRITICAL PEDAGOGICAL INSTRUCTIONS:
1. EXPLAIN DIRECTLY & DEEPLY:
   - When the student asks a concept question (e.g., "Semantic HTML teglar nima uchun kerak?", "Viyet teoremasi nima?", "Hujayra organoidlari qanday ishlaydi?"), NEVER dodge the question or respond with empty placeholders or repetitive loops.
   - Explain the concept DIRECTLY, clearly, and thoroughly with concrete real-world code snippets, mathematical derivations, or scientific principles.
   - Break down WHY this topic is tested on competitive entrance exams and how to remember it.
2. STRICT LANGUAGE CONSISTENCY:
   - Reply 100% in ${langName}. Do NOT mix random English or Russian words when Uzbek is selected, and vice-versa.
3. VOICE SYNTHESIS READY:
   - Voice Mode is currently: ${isVoiceMode ? "ACTIVE (Write with natural, rhythmic, and clear sentence cadence suitable for text-to-speech audio)" : "Standard"}.
4. FORMATTING:
   - Use clean Markdown with headers (###), bold key terms, concise bullet points, and code blocks where applicable so the explanation is visually engaging and effortless to study.`;

    const apiKey = process.env.GEMINI_API_KEY;

    // Real Gemini API Integration
    if (apiKey && apiKey !== "your_gemini_api_key_here") {
      const candidateModels = [
        "gemini-3.5-flash",
        "gemini-3.1-flash-lite",
        "gemini-flash-latest",
        "gemini-3.8-flash",
        "gemini-2.5-flash",
      ];
      const genAI = new GoogleGenerativeAI(apiKey);

      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemPrompt,
          });

          // Build alternating valid history for Gemini API
          const validHistory: { role: "user" | "model"; parts: { text: string }[] }[] = [];
          for (let i = 0; i < messages.length - 1; i++) {
            const m = messages[i];
            const role: "user" | "model" = m.sender === "ai" ? "model" : "user";
            const textContent = m.text ? m.text.trim() : "";
            if (!textContent) continue;

            // Gemini history must start with user turn
            if (validHistory.length === 0 && role === "model") {
              continue;
            }

            // Merge consecutive messages with the same role
            if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === role) {
              validHistory[validHistory.length - 1].parts[0].text += `\n${textContent}`;
            } else {
              validHistory.push({
                role,
                parts: [{ text: textContent }],
              });
            }
          }

          const chat = model.startChat({ history: validHistory });
          const result = await chat.sendMessage(lastUserMessage);
          const responseText = result.response.text();

          if (responseText && responseText.trim().length > 0) {
            return NextResponse.json({
              text: responseText,
              suggestions: generateContextualSuggestions(lastUserMessage, trackId, language),
            });
          }
        } catch (geminiError: any) {
          console.warn(`Gemini model ${modelName} returned error:`, geminiError?.message);
          // Try next candidate model
        }
      }
    }

    // High quality pedagogical fallback responder if API is unreachable
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
      return "Assalomu alaykum! Men sizning shaxsiy MentorAI murabbiyingizman. Akademik litsey va kollej imtihonlariga tayyorlanishingizda har bir mavzuni chuqur tushunishingizga yordam beraman. Qaysi savol yoki masala ustida ishlaymiz?";
    }
    if (q.includes("semantik") || q.includes("html") || q.includes("teg") || q.includes("tag")) {
      return `**Semantik HTML teglar** — bu shunchaki sahifa ko'rinishi uchun emas, balki kodning **mazmuni va vazifasini** aniq ifodalovchi teglardir.

### 1. No-semantik va Semantik farqi:
- **No-semantik:** \`<div>\`, \`<span>\` — ichida nima borligini bildirmaydi, faqat oddiy blok.
- **Semantik:** \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\` — o'z nomi bilan vazifasini bildiradi.

### 2. Nima uchun kerak?
1. **SEO (Qidiruv tizimlari):** Google va boshqa robotlar sahifani tahlil qilayotganda semantik teglarga tayanib saytni yuqori o'ringa chiqaradi.
2. **Accessibility (A11y):** Ko'rish imkoniyati cheklangan foydalanuvchilar ekran o'qish dasturlari (Screen Readers) orqali saytni qulay tinglay oladilar.
3. **Clean Code (Toza kod):** Litsey imtihonlarida va jamoaviy loyihalarda kodni o'qish va tahrirlash juda oson bo'ladi.

*Misol:*
\`\`\`html
<header>
  <nav><a href="#home">Bosh sahifa</a></nav>
</header>
<main>
  <article><h1>Asosiy mavzu</h1></article>
</main>
<footer><p>© 2026 MentorAI</p></footer>
\`\`\`

Yana qaysi teg yoki mavzu bo'yicha savolingiz bor?`;
    }
    if (trackId === "exact-sciences" || q.includes("viyet") || q.includes("fizika") || q.includes("nyuton") || q.includes("kasr")) {
      return `Ajoyib masala! Aniq fanlar yo'nalishida litsey imtihoni talablari bo'yicha qadam-baqadam yondashamiz:

1. **Berilganlarni ajratish**: Noma'lum o'zgaruvchini belgilab olamiz.
2. **Formulani tanlash**:
   - Kvadrat tenglamada Viyet formulasi: $x_1 + x_2 = -b/a$ va $x_1 \\cdot x_2 = c/a$.
   - Mexanikada Nyutonning 2-qonuni: $F = m \\cdot a$.
3. **Hisoblash**: Qiymatlarni o'rniga qo'yib, javobni mantiqiy tekshiramiz.

Qaysi qatorda to'xtab qoldingiz? Yozing yoki mikrofonda ayting!`;
    }
    if (trackId === "medicine" || q.includes("hujayra") || q.includes("kimyo") || q.includes("valentlik")) {
      return `Tibbiyot litseylari uchun asosiy biologik va kimyoviy tamoyil:
- **Biologiya (Sitologiya)**: Hujayra energetik markazi — mitoxondriya (ATF sintez qiladi). O'simliklarda fotosintez xloroplastlarda boradi.
- **Kimyo**: Modda formulasini tuzishda valentliklar ko'paytmasi teng bo'lishi shart.

Qaysi reaksiya yoki organoid haqida batafsil to'xtalamiz?`;
    }
    if (trackId === "law" || q.includes("tarix") || q.includes("huquq") || q.includes("temur")) {
      return `Yuridik litsey yo'nalishi bo'yicha muhim eslatma:
- **Tarix**: 1370-yilda Amir Temur Balxdagi qurultoyda Movarounnahr hukmdori deb e'lon qilindi. Uning shiori: «Kuch — adolatdadir».
- **Davlat va Huquq**: Qonun ustuvorligi va sudlarning mustaqilligi demokratik huquqiy davlatning asosidir.

Qaysi davr yoki huquqiy tushunchani tahlil qilmoqchisiz?`;
    }
    return `MentorAI repetitori siz bilan! Savolingizni aniq bering — qoidani misollar bilan tushuntirib, litsey testlarida tushadigan variantlarni birga tahlil qilamiz.`;
  }

  // RUSSIAN LOCALIZATION
  if (language === "ru") {
    if (q.includes("привет") || q.includes("здравствуй")) {
      return "Здравствуйте! Я ваш персональный ИИ-репетитор MentorAI. Мы готовимся к поступлению в академические лицеи (Инха, Вестминстерский, медицинские и юридические лицеи). Какой вопрос или тему разберем?";
    }
    if (q.includes("семантик") || q.includes("html") || q.includes("тег") || q.includes("tag")) {
      return `**Семантический HTML** — это использование тегов, которые несут в себе смысловую нагрузку и описывают свое предназначение браузерам и разработчикам.

### 1. Отличие от несемантических тегов:
- **Несемантические:** \`<div>\`, \`<span>\` — никак не сообщают о своем содержимом (просто контейнеры).
- **Семантические:** \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\` — прямо говорят, какой контент внутри.

### 2. Главные преимущества:
1. **SEO (Поисковая оптимизация):** Поисковики лучше индексируют структуру страницы и поднимают сайт в результатах выдачи.
2. **Доступность (Accessibility):** Экранные дикторы для людей с нарушениями зрения могут легко ориентироваться по блокам.
3. **Чистый код:** Преподавателям лицеев и разработчикам намного проще читать такой код без «дивовой каши».`;
    }
    return `MentorAI на связи! Сформулируйте ваш вопрос, и мы разберем теорию, решим задачу и закрепим материал для экзаменов.`;
  }

  // ENGLISH LOCALIZATION
  if (q.includes("semantic") || q.includes("html") || q.includes("tag")) {
    return `**Semantic HTML** means using HTML tags that reinforce the meaning of the information on web pages rather than just defining its appearance.

### 1. Non-Semantic vs Semantic:
- **Non-semantic:** \`<div>\` and \`<span>\` tell nothing about their contents.
- **Semantic:** \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<footer>\` clearly describe their role to both the browser and the developer.

### 2. Why it matters for entrance exams & modern development:
1. **Accessibility (a11y):** Screen readers use semantic landmarks to help visually impaired users navigate.
2. **SEO Ranking:** Search engines prioritize structured semantic markup.
3. **Maintainability:** Code is significantly easier to understand, audit, and debug.`;
  }

  return `Hello! As your MentorAI tutor preparing you for competitive lyceum entrance exams, I am ready to break down any mathematical, scientific, linguistic, or computing topic step-by-step. What problem shall we examine?`;
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
          "Semantic HTML teglar nima uchun kerak?",
          "Kasrlarni qisqartirish usulini tushuntirib bering",
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
          "Семантические теги в HTML5",
          "Разница между Past Simple и Present Perfect",
          "Как быстро находить общий знаменатель дробей?",
        ];
    }
  }

  return [
    "Explain this step-by-step",
    "Show me a competitive lyceum exam problem",
    "How to avoid common trap choices?",
  ];
}
