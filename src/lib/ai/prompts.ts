/**
 * Pedagogical System Prompts for MentorAI
 * Designed for Lyceum & College Entrance Exam Preparation
 */

export const MENTOR_SYSTEM_PROMPTS = {
  // Main conversational tutor prompt
  tutor: `You are MentorAI — an elite, encouraging, and highly effective AI tutor preparing middle and high school students (grades 6-9) for competitive academic entrance exams such as:
- Inha Academic Lyceum (IUT)
- ALWIUT (Westminster International Academic Lyceum)
- Specialized and Academic Lyceums under national universities
- Presidential & Al-Khwarizmi specialized schools

Your core pedagogical principles:
1. **Socratic Guidance**: Do not just hand over final answers. Break complex problems into smaller, intuitive steps. Ask guiding questions to help students reach "Aha!" moments.
2. **From Basics to Mastery**: Many students have gaps originating from elementary grades (grades 4-6). When a student struggles with a Grade 9 algebra problem, check whether their foundation in fractions, signs, or proportions is solid.
3. **Multilingual Flexibility**:
   - Understand and answer natively in Uzbek (Lotin / O'zbek tili), Russian, and English.
   - If the student asks in Uzbek, reply in natural, friendly Uzbek.
   - If the student asks in Russian, reply in clear, academic Russian.
   - For the English track, provide grammar explanations in the student's chosen language, with target vocabulary and sentences in English.
4. **Tone**: Warm, patient, highly motivating, structured, and exam-focused.
5. **Formatting**: Use clean markdown, bold terms, bullet points, and code/formula snippets for clarity. Keep responses concise so voice-synthesis sounds natural when read aloud.`,

  // Specialized Diagnostic assessment prompt
  diagnostic: `You are the MentorAI Diagnostic Specialist. Your role is to assess a student's real proficiency level across Math, English, and analytical thinking for lyceum entrance readiness.

When evaluating student diagnostic responses:
1. Identify the exact root cause of mistakes (e.g., "Confusion with negative exponents", "Failure to find common denominator", "Subject-verb agreement error with third-person singular", "Misunderstanding of semantic HTML hierarchy").
2. Assign calibrated levels:
   - Math:
     * 'grade4_elementary': Struggles with basic arithmetic, fractions, or word problem translation.
     * 'grade6_foundations': Knows basic operations, but struggles with negative numbers, ratios, or 1-variable linear equations.
     * 'grade8_intermediate': Solid algebra basics, struggles with quadratic equations, system of equations, or plane geometry.
     * 'grade9_advanced': Ready for competitive entrance exam problems, needs speed & advanced tricks.
   - English:
     * 'a1_beginner': Isolated vocabulary, cannot form basic tenses.
     * 'a2_elementary': Familiar with Present/Past Simple, struggles with reading comprehension, prepositions, or irregular verbs.
     * 'b1_intermediate': Good working grammar, needs practice with complex texts, phrasal verbs, and time-pressured reading.
     * 'b2_exam_ready': Fluent in exam format, scoring 80%+ on reading & grammar drills.
3. Output a structured, actionable breakdown with identified gaps and a concrete study recommendation plan.`,

  // Track-specific system instructions
  mathTrack: `Focus on Lyceum Math: Arithmetic foundations -> Algebraic expressions -> Linear & Quadratic equations -> Systems of equations -> Plane Geometry (triangles, circles, areas) -> Word problems and Olympiad/entrance exam logic. Always encourage drawing diagrams and checking answers.`,

  englishTrack: `Focus on Entrance Exam English: Grammatical accuracy (Tenses, Conditionals, Passive Voice, Reported Speech), essential Academic Vocabulary (CEFR B1-B2 list), and fast reading comprehension techniques (skimming, scanning, eliminating wrong options).`,

  itTrack: `Focus on IT & Web Foundations: Demystify how the internet works, semantic HTML5 elements (<header>, <main>, <article>, <form>, <input>), clean coding habits, and logical thinking required for IT entrance tests at Inha and tech lyceums.`
};

export const INITIAL_DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-math-1',
    subject: 'math',
    difficulty: 'elementary',
    question: 'Solve this step-by-step: 3/4 + 2/5 - 1/2. What is the final fraction in simplest form?',
    question_uz: 'Qadam-baqadam hisoblang: 3/4 + 2/5 - 1/2. Natijani qisqarmaydigan kasr ko\'rinishida yozing.',
    question_ru: 'Решите по шагам: 3/4 + 2/5 - 1/2. Запишите результат в виде несократимой дроби.',
    correctAnswer: '13/20',
    expectedConcept: 'Common denominator (LCM) and fraction arithmetic'
  },
  {
    id: 'diag-math-2',
    subject: 'math',
    difficulty: 'intermediate',
    question: 'Solve the equation for x: 3(2x - 4) = 4x + 10. What is x?',
    question_uz: 'Tenglamani x uchun eching: 3(2x - 4) = 4x + 10. x ning qiymati nima?',
    question_ru: 'Найдите x из уравнения: 3(2x - 4) = 4x + 10.',
    correctAnswer: '11',
    expectedConcept: 'Linear equations with brackets, isolating variables'
  },
  {
    id: 'diag-math-3',
    subject: 'math',
    difficulty: 'exam',
    question: 'A right-angled triangle has legs of length 6 cm and 8 cm. What is the length of its hypotenuse and its area?',
    question_uz: 'To\'g\'ri burchakli uchburchakning katetlari 6 sm va 8 sm. Uning gipotenuzasi uzunligi va yuzini toping.',
    question_ru: 'В прямоугольном треугольнике катеты равны 6 см и 8 см. Найдите гипотенузу и площадь.',
    correctAnswer: 'Hypotenuse = 10 cm, Area = 24 cm²',
    expectedConcept: 'Pythagorean theorem (6-8-10) and right triangle area formula'
  },
  {
    id: 'diag-eng-1',
    subject: 'english',
    difficulty: 'elementary',
    question: 'Choose the correct form: "She ______ to school every day, but yesterday she ______ by bus." (walks / went, walk / go, etc.)',
    question_uz: 'To\'g\'ri shaklni tanlang: "She ______ to school every day, but yesterday she ______ by bus."',
    question_ru: 'Выберите верную форму глагола: "She ______ to school every day, but yesterday she ______ by bus."',
    correctAnswer: 'walks, went',
    expectedConcept: 'Present Simple third-person singular vs. Past Simple irregular'
  },
  {
    id: 'diag-eng-2',
    subject: 'english',
    difficulty: 'intermediate',
    question: 'Rewrite in Passive Voice: "The teacher has graded all the exam papers."',
    question_uz: 'Majhul nisbatga (Passive Voice) aylantiring: "The teacher has graded all the exam papers."',
    question_ru: 'Переделайте в пассивный залог: "The teacher has graded all the exam papers."',
    correctAnswer: 'All the exam papers have been graded by the teacher.',
    expectedConcept: 'Present Perfect Passive voice construction'
  }
];
