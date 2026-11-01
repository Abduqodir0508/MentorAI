import { DiagnosticQuestion, TrackType } from '@/types';

export const MENTOR_SYSTEM_PROMPTS = {
  // Main Socratic Tutor Prompt
  tutor: `You are MentorAI — an elite, encouraging, and highly effective AI tutor preparing middle and high school students for competitive academic entrance exams across Uzbekistan:
- Inha Academic Lyceum (IUT)
- ALWIUT (Westminster International Academic Lyceum)
- Al-Khwarizmi Specialized IT School
- Tashkent State University of Law Lyceum
- Tashkent Medical Academy & Pediatric Lyceums
- Specialized Foreign Language & Philology Lyceums
- Presidential & Specialized Lyceums

Your Pedagogical Principles:
1. **Socratic Guidance**: Never provide full answers directly. Decompose the question into smaller steps. Ask guiding questions to help the student formulate the step themselves.
2. **From Elementary Basics to Exam Mastery**: Many 8th and 9th grade difficulties stem from elementary gaps (fractions in 4th-5th grade, negative numbers, valency, grammar trigger markers). If a student struggles, inspect the root foundation.
3. **Strict Language Alignment**:
   - If the student or UI language is 'uz' (Uzbek), reply in natural, supportive, grammatically accurate Uzbek (Lotin imlosi).
   - If 'ru' (Russian), reply in rigorous, clear academic Russian.
   - If 'en' (English), reply in fluent, idiomatic English.
4. **Formatting**: Use clean markdown, bold headers, and bulleted lists. Keep sentences digestible for speech synthesis.`,

  // Track-specific instructions
  tracks: {
    it: `Track: IT & Computer Science. Emphasize algorithmic logic, fraction reduction, linear/quadratic equations, geometry, and semantic HTML5 principles (<header>, <nav>, <main>, forms). Help students prepare for Inha and Al-Khwarizmi exams.`,
    "exact-sciences": `Track: Exact Sciences & Economics. Focus on advanced algebra, Vieta shortcuts, systems of equations, kinematics, Newton's second law (F = ma), Archimedes force, and Westminster logic/percentage problems.`,
    medicine: `Track: Medicine & Natural Sciences. Focus on cytology (mitochondria, ribosomes, plant vs animal cells), organ systems, genetics basics, chemical valency, balancing reactions, and solution concentrations.`,
    law: `Track: Law & Humanities. Focus on national history (Timurids, modern history dates), constitutional law (separation of powers, civil rights), and critical reading analysis of classical and contemporary texts.`,
    languages: `Track: Foreign Languages & Philology. Focus on CEFR B1/B2 grammar drills (tenses, passive voice, conditionals), academic reading strategies (skimming/scanning), and conversational confidence.`,
    math: `Track: Math Foundations. Focus on Grade 4 arithmetic, fractions, equations, Vieta formulas, and plane geometry.`,
    english: `Track: English Prep. Focus on grammatical traps, reading comprehension, and vocabulary in context.`,
    "it-basics": `Track: IT Foundations. Focus on internet architecture, semantic HTML, and computational logic.`,
  },

  // Mood and Persona Modulation Prompts
  moods: {
    classic: `Personality: Classic Academic Socratic Mentor. Maintain a balanced, objective, calm, and structured tone. Guide the student methodically with clear logical steps.`,
    strict: `Personality: Strict & Demanding Examiner (Jahldor/Talabchan Ustoz). Act as an uncompromising, disciplined, and strict entrance exam supervisor. You have zero tolerance for carelessness, slacking, or superficial guesses. Speak with sharp, direct, and rigorous pedagogical authority (e.g. "Diqqat bilan qara!", "Xatoga yo'l qo'yishga vaqtimiz yo'q!", "Bu oddiy qoidani bilmasang litseyga qanday kirmoqchisan?"). Challenge the student to concentrate 100% and provide rigorous answers.`,
    kind: `Personality: Warm & Encouraging Mentor (Mehribon Ustoz). Act as an extremely kind, warm, patient, and empathetic mentor. Praise the student's efforts and curiosity (e.g. "Barakalla, juda yaxshi urinish!", "Hech xavotir olma, birgalikda oson o'rganamiz!"). Explain tricky parts with gentle care and make the student feel completely safe and confident.`,
    inspirational: `Personality: Inspirational & Passionate Mentor (Ilhomlantiruvchi Ustoz). Speak with intellectual passion, poetic eloquence, and contagious enthusiasm for science and knowledge (e.g. "Matematika — koinotning eng go'zal tili!", "Har bir yechilgan masala — buyuk kelajakka qo'yilgan poydevordir!"). Inspire the student to dream big and see the artistic brilliance of logic.`,
  },

  genders: {
    female: `Tutor Gender Role: Female educator (Ustoz opa / Muallima). Express yourself with natural female teacher presence, maternal warmth, or assertive sisterly pedagogical guidance.`,
    male: `Tutor Gender Role: Male educator (Ustoz aka / Muallim). Express yourself with brotherly discipline, resolute masculine confidence, and steady mentorship.`,
  },
};

export const TRACK_DIAGNOSTIC_QUESTIONS: Record<string, DiagnosticQuestion[]> = {
  it: [
    {
      id: "it-diag-1",
      track_id: "it",
      subject: "math",
      difficulty: "elementary",
      question: "Solve step-by-step: 3/4 + 2/5 - 1/2. What is the fraction in simplest form?",
      question_uz: "Qadam-baqadam hisoblang: 3/4 + 2/5 - 1/2. Natijani qisqarmaydigan kasr shaklida yozing:",
      question_ru: "Решите по шагам: 3/4 + 2/5 - 1/2. Запишите в виде несократимой дроби:",
      correctAnswer: "13/20",
      expectedConcept: "Common denominator (LCM) and fraction arithmetic",
      gapIdentifiedIfWrong: "Fractions & Common Denominator (Grade 4-5)",
      gapIdentifiedIfWrong_uz: "Oddiy kasrlar va umumiy maxraj (4–5 sinf)",
      gapIdentifiedIfWrong_ru: "Обыкновенные дроби и общий знаменатель (4–5 класс)",
    },
    {
      id: "it-diag-2",
      track_id: "it",
      subject: "math",
      difficulty: "intermediate",
      question: "Solve the equation for x: 3(2x - 4) = 4x + 10.",
      question_uz: "Tenglamani x uchun yeching: 3(2x - 4) = 4x + 10.",
      question_ru: "Найдите x из уравнения: 3(2x - 4) = 4x + 10.",
      correctAnswer: "11",
      expectedConcept: "Linear equations with brackets, transposing terms",
      gapIdentifiedIfWrong: "Linear Equations & Bracket Expansion (Grade 6-7)",
      gapIdentifiedIfWrong_uz: "Chiziqli tenglamalar va qavslarni ochish (6–7 sinf)",
      gapIdentifiedIfWrong_ru: "Линейные уравнения и раскрытие скобок (6–7 класс)",
    },
    {
      id: "it-diag-3",
      track_id: "it",
      subject: "web",
      difficulty: "foundation",
      question: "Which HTML5 semantic element should wrap the primary website navigation links?",
      question_uz: "Veb-saytning asosiy navigatsiya havolalarini qaysi semantik HTML5 elementi o'rab turishi kerak?",
      question_ru: "Какой семантический элемент HTML5 должен оборачивать главные ссылки навигации сайта?",
      correctAnswer: "<nav>",
      expectedConcept: "Semantic HTML5 markup hierarchy",
      gapIdentifiedIfWrong: "Semantic Web Structure & HTML5 Tags",
      gapIdentifiedIfWrong_uz: "Semantik HTML5 teglari va veb tuzilishi",
      gapIdentifiedIfWrong_ru: "Семантические теги и структура HTML5",
    },
  ],

  "exact-sciences": [
    {
      id: "exact-diag-1",
      track_id: "exact-sciences",
      subject: "math",
      difficulty: "exam",
      question: "If x₁ and x₂ are roots of x² - 8x + 12 = 0, find x₁² + x₂² using Vieta's formulas.",
      question_uz: "Agar x₁ va x₂ sonlari x² - 8x + 12 = 0 tenglama ildizlari bo'lsa, Viyet teoremasidan foydalanib x₁² + x₂² ni toping:",
      question_ru: "Если x₁ и x₂ — корни уравнения x² - 8x + 12 = 0, найдите x₁² + x₂² через формулы Виета:",
      correctAnswer: "40",
      expectedConcept: "Vieta's formula identity: (x₁+x₂)² - 2x₁x₂",
      gapIdentifiedIfWrong: "Quadratic Shortcuts & Vieta's Identity (Grade 8-9)",
      gapIdentifiedIfWrong_uz: "Kvadrat tenglamalar va Viyet ayniyatlari (8–9 sinf)",
      gapIdentifiedIfWrong_ru: "Свойства корней и теорема Виета (8–9 класс)",
    },
    {
      id: "exact-diag-2",
      track_id: "exact-sciences",
      subject: "physics",
      difficulty: "intermediate",
      question: "A net force of 24 N acts on a 6 kg object. What is its acceleration in m/s²?",
      question_uz: "Massasi 6 kg bo'lgan jismga 24 N teng ta'sir etuvchi kuch berildi. Jism tezlanishini (m/s²) toping:",
      question_ru: "На тело массой 6 кг действует равнодействующая сила 24 Н. Чему равно ускорение в м/с²?",
      correctAnswer: "4",
      expectedConcept: "Newton's 2nd Law: a = F / m",
      gapIdentifiedIfWrong: "Newton's Laws of Motion & Dynamics",
      gapIdentifiedIfWrong_uz: "Nyuton qonunlari va harakat dinamikasi",
      gapIdentifiedIfWrong_ru: "Законы Ньютона и динамика движения",
    },
    {
      id: "exact-diag-3",
      track_id: "exact-sciences",
      subject: "logic",
      difficulty: "intermediate",
      question: "A price increased by 20%, then the new price decreased by 20%. What is the net percentage change from the original?",
      question_uz: "Mahsulot narxi 20% ga oshirildi, so'ng yangi narx 20% ga tushirildi. Dastlabki narx necha foizga o'zgargan?",
      question_ru: "Цена товара выросла на 20%, а затем новая цена снизилась на 20%. Как изменилась цена в процентах от исходной?",
      correctAnswer: "-4%",
      expectedConcept: "Consecutive percentage changes (1.2 × 0.8 = 0.96)",
      gapIdentifiedIfWrong: "Compound Percentage & Ratio Calculations",
      gapIdentifiedIfWrong_uz: "Ketma-ket foiz o'zgarishi va nisbatlar",
      gapIdentifiedIfWrong_ru: "Последовательные проценты и пропорции",
    },
  ],

  medicine: [
    {
      id: "med-diag-1",
      track_id: "medicine",
      subject: "biology",
      difficulty: "elementary",
      question: "Which cellular organelle synthesizes ATP molecules during aerobic respiration?",
      question_uz: "Kislorodli nafas olishda ATF molekulalarini sintez qiluvchi organoid qaysi?",
      question_ru: "Какой органоид клетки синтезирует молекулы АТФ в процессе клеточного дыхания?",
      correctAnswer: "mitochondria",
      expectedConcept: "Cellular organelles and ATP production",
      gapIdentifiedIfWrong: "Cell Biology & Organelle Functions",
      gapIdentifiedIfWrong_uz: "Hujayra organoidlari va ularning vazifalari",
      gapIdentifiedIfWrong_ru: "Органоиды клетки и их функции",
    },
    {
      id: "med-diag-2",
      track_id: "medicine",
      subject: "chemistry",
      difficulty: "intermediate",
      question: "What is the formula of Aluminum Oxide where Al has valency III and O has valency II?",
      question_uz: "Alyuminiy valentligi III, kislorod valentligi II bo'lsa, alyuminiy oksid formulasini yozing:",
      question_ru: "Запишите формулу оксида алюминия, если валентность Al равна III, а кислорода — II:",
      correctAnswer: "Al2O3",
      expectedConcept: "Chemical valency and binary formula construction",
      gapIdentifiedIfWrong: "Valency & Chemical Formula Writing",
      gapIdentifiedIfWrong_uz: "Kimyoviy valentlik va formulalar tuzish",
      gapIdentifiedIfWrong_ru: "Валентность и составление химических формул",
    },
    {
      id: "med-diag-3",
      track_id: "medicine",
      subject: "biology",
      difficulty: "intermediate",
      question: "Which organelle is present in plant cells but absent in typical animal cells?",
      question_uz: "O'simlik hujayrasida mavjud bo'lib, hayvon hujayrasida bo'lmagan organoidni ayting:",
      question_ru: "Какой органоид есть в клетках растений, но отсутствует в клетках животных?",
      correctAnswer: "chloroplast",
      expectedConcept: "Differences between plant and animal cells (chloroplasts, cell wall)",
      gapIdentifiedIfWrong: "Comparative Cytology & Plant Physiology",
      gapIdentifiedIfWrong_uz: "O'simlik va hayvon hujayralari farqlari",
      gapIdentifiedIfWrong_ru: "Сравнительная цитология растений и животных",
    },
  ],

  law: [
    {
      id: "law-diag-1",
      track_id: "law",
      subject: "history",
      difficulty: "foundation",
      question: "In what year was Amir Timur proclaimed supreme ruler in Balkh, founding his centralized state?",
      question_uz: "Amir Temur qaysi yilda Balxda oliy hukmdor deb e'lon qilinib, markazlashgan davlatiga asos solgan?",
      question_ru: "В каком году на курултае в Балхе Амир Темур был провозглашен верховным правителем?",
      correctAnswer: "1370",
      expectedConcept: "Chronology of Timurid statehood",
      gapIdentifiedIfWrong: "Timurid Empire Chronology & Governance",
      gapIdentifiedIfWrong_uz: "Temuriylar davlati xronologiyasi va sanalari",
      gapIdentifiedIfWrong_ru: "Хронология и эпоха государства Темуридов",
    },
    {
      id: "law-diag-2",
      track_id: "law",
      subject: "state_law",
      difficulty: "intermediate",
      question: "Which state body exercises supreme legislative authority in the Republic of Uzbekistan?",
      question_uz: "O'zbekiston Respublikasida oliy qonun chiqaruvchi hokimiyatni qaysi organ amalga oshiradi?",
      question_ru: "Какой государственный орган осуществляет высшую законодательную власть в Республике Узбекистан?",
      correctAnswer: "Oliy Majlis",
      expectedConcept: "Separation of powers and legislative branch",
      gapIdentifiedIfWrong: "Constitutional Law & Separation of Powers",
      gapIdentifiedIfWrong_uz: "Davlat hokimiyatining bo'linishi va Oliy Majlis",
      gapIdentifiedIfWrong_ru: "Конституционное право и разделение властей",
    },
    {
      id: "law-diag-3",
      track_id: "law",
      subject: "reading",
      difficulty: "intermediate",
      question: "What legal principle states that an accused person is considered innocent until proven guilty by court?",
      question_uz: "Ayblanuvchi sudi qonuniy kuchga kirmaguncha aybsiz deb hisoblanishi qaysi huquqiy prinsip deb ataladi?",
      question_ru: "Как называется правовой принцип, согласно которому обвиняемый считается невиновным, пока его вина не доказана судом?",
      correctAnswer: "presumption of innocence",
      expectedConcept: "Constitutional human rights: Presumption of innocence",
      gapIdentifiedIfWrong: "Foundational Civil Rights & Legal Terminology",
      gapIdentifiedIfWrong_uz: "Aybsizlik prezumpsiyasi va fuqarolik huquqlari",
      gapIdentifiedIfWrong_ru: "Презумпция невиновности и права человека",
    },
  ],

  languages: [
    {
      id: "lang-diag-1",
      track_id: "languages",
      subject: "english",
      difficulty: "elementary",
      question: "Choose the correct verbs: 'She ______ to school every day, but yesterday she ______ by bus.'",
      question_uz: "To'g'ri fe'llarni tanlang: 'She ______ to school every day, but yesterday she ______ by bus.'",
      question_ru: "Выберите правильные формы: 'She ______ to school every day, but yesterday she ______ by bus.'",
      correctAnswer: "walks, went",
      expectedConcept: "Present Simple 3rd-person singular vs Past Simple irregular",
      gapIdentifiedIfWrong: "Present Simple vs Past Simple Irregular Verbs",
      gapIdentifiedIfWrong_uz: "Oddiy hozirgi va o'tgan zamon fe'llari (A2)",
      gapIdentifiedIfWrong_ru: "Времена Present Simple и Past Simple (A2)",
    },
    {
      id: "lang-diag-2",
      track_id: "languages",
      subject: "english",
      difficulty: "intermediate",
      question: "Convert to Passive Voice: 'The examiners have checked all papers.'",
      question_uz: "Majhul nisbatga (Passive Voice) aylantiring: 'The examiners have checked all papers.'",
      question_ru: "Преобразуйте в пассивный залог: 'The examiners have checked all papers.'",
      correctAnswer: "All papers have been checked",
      expectedConcept: "Present Perfect Passive (have/has been + V3)",
      gapIdentifiedIfWrong: "Present Perfect Passive Voice Construction",
      gapIdentifiedIfWrong_uz: "Majhul nisbat (Passive Voice) qurilmalari",
      gapIdentifiedIfWrong_ru: "Пассивный залог (Passive Voice)",
    },
    {
      id: "lang-diag-3",
      track_id: "languages",
      subject: "english",
      difficulty: "intermediate",
      question: "Which word signals Past Simple: 'already', 'so far', 'ago', or 'ever'?",
      question_uz: "Qaysi signal so'z har doim Past Simple talab qiladi: 'already', 'so far', 'ago', yoki 'ever'?",
      question_ru: "Какое слово всегда требует использования Past Simple: 'already', 'so far', 'ago', или 'ever'?",
      correctAnswer: "ago",
      expectedConcept: "Time markers of finished past time",
      gapIdentifiedIfWrong: "Tense Marker Words & Past Definite Time",
      gapIdentifiedIfWrong_uz: "Zamon ko'rsatkichlari va aniq o'tgan vaqt",
      gapIdentifiedIfWrong_ru: "Временные маркеры прошедшего времени",
    },
  ],
};

export const INITIAL_DIAGNOSTIC_QUESTIONS = TRACK_DIAGNOSTIC_QUESTIONS["it"];

export function getDiagnosticQuestionsForTrack(trackId: string): DiagnosticQuestion[] {
  return TRACK_DIAGNOSTIC_QUESTIONS[trackId] || TRACK_DIAGNOSTIC_QUESTIONS["it"];
}
