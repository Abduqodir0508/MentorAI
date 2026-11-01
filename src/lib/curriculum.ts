import { Track, Lesson } from "@/types";

export const TRACKS_DATA: Track[] = [
  {
    id: "math",
    title: "Lyceum Math Track",
    title_uz: "Litsey Matematika Kursi",
    title_ru: "Математика для лицея",
    description: "From 4th Grade foundations to competitive Inha Lyceum & Academic Lyceum entrance exam mastery.",
    icon: "Calculator",
    level: "Grade 4 to Grade 9+",
    color: "indigo",
    order_index: 1,
  },
  {
    id: "english",
    title: "Entrance Exam English",
    title_uz: "Kirish Imtihoni Ingliz Tili",
    title_ru: "Английский для вступительных",
    description: "Grammar drills, academic vocabulary, and reading comprehension tailored for competitive lyceum tests.",
    icon: "Languages",
    level: "A1 to B2 Exam Level",
    color: "emerald",
    order_index: 2,
  },
  {
    id: "it-basics",
    title: "IT & Web Foundations",
    title_uz: "IT va Veb Asoslari",
    title_ru: "Основы IT и веб-разработки",
    description: "Semantic HTML5, internet architecture, and computational logic for future technology students.",
    icon: "Code",
    level: "Beginner to Intermediate",
    color: "amber",
    order_index: 3,
  },
];

export const LESSONS_DATA: Lesson[] = [
  // =================== MATH TRACK ===================
  {
    id: "math-01",
    track_id: "math",
    title: "Mastering Fractions & Common Denominators",
    title_uz: "Oddiy Kasrlar va Umumiy Maxraj Asoslari",
    title_ru: "Обыкновенные дроби и общий знаменатель",
    description: "Build an unbreakable foundation in fraction addition, subtraction, and least common multiples (LCM).",
    grade_level: "Grade 4-5 Basics",
    topic: "Fractions & Arithmetic",
    duration_minutes: 20,
    is_free_preview: true,
    xp_reward: 50,
    order_index: 1,
    content: {
      introduction: "Fractions are the #1 reason students struggle with 8th and 9th grade algebra! To conquer entrance exams, you must be able to find the common denominator and simplify fractions instantly.",
      introduction_uz: "Kasrlar — yuqori sinf algebrasida o'quvchilar qiynaladigan eng asosiy mavzu! Litsey imtihonlarida g'alaba qozonish uchun umumiy maxraj topish va qisqartirishni ko'zingizni yumib ham bajara olishingiz kerak.",
      introduction_ru: "Дроби — главная причина трудностей в старших классах! Чтобы сдать экзамен в лицей, нужно уверенно и быстро находить общий знаменатель и сокращать дроби.",
      conceptSummary: [
        "A fraction a/b represents 'a' parts of a whole divided into 'b' equal slices.",
        "To add or subtract fractions with different denominators, always find the Least Common Multiple (LCM) of the denominators.",
        "Multiply the numerator and denominator by the same factor so you do not change the value of the fraction.",
        "Always reduce the final result to its simplest form by dividing out common factors."
      ],
      formulaOrRules: [
        {
          label: "Addition Rule",
          formula: "a/b + c/d = (a·d + b·c) / (b·d)",
          explanation: "Multiply each fraction by the missing factor to achieve the common denominator b·d."
        },
        {
          label: "Multiplication Rule",
          formula: "(a/b) · (c/d) = (a·c) / (b·d)",
          explanation: "Directly multiply numerators together and denominators together."
        }
      ],
      stepByStepExamples: [
        {
          title: "Example 1: 3/4 + 2/5",
          steps: [
            "Step 1: Find the LCM of 4 and 5. Since gcd(4,5) = 1, LCM = 4 × 5 = 20.",
            "Step 2: Convert 3/4 -> (3 × 5) / (4 × 5) = 15/20.",
            "Step 3: Convert 2/5 -> (2 × 4) / (5 × 4) = 8/20.",
            "Step 4: Add the numerators: 15/20 + 8/20 = 23/20 = 1 3/20."
          ],
          solution: "23/20 (or 1 3/20)"
        }
      ],
      keyTakeaway: "Never add denominators directly! Only add or subtract numerators once denominators are identical."
    },
    practice_problems: [
      {
        id: "mp-1",
        question: "What is the value of 5/6 - 1/4 in simplest terms?",
        question_uz: "5/6 - 1/4 ning qisqarmaydigan qiymatini toping:",
        question_ru: "Чему равно 5/6 - 1/4 в несократимом виде?",
        options: ["4/2", "7/12", "1/3", "11/12"],
        correctAnswerIndex: 1,
        explanation: "The LCM of 6 and 4 is 12. 5/6 = 10/12, and 1/4 = 3/12. 10/12 - 3/12 = 7/12.",
        hint: "The smallest number divisible by both 6 and 4 is 12.",
        xp: 25
      },
      {
        id: "mp-2",
        question: "Calculate: (2/3) ÷ (4/9)",
        question_uz: "Hisoblang: (2/3) ÷ (4/9)",
        question_ru: "Вычислите: (2/3) ÷ (4/9)",
        options: ["8/27", "3/2", "2/3", "6/12"],
        correctAnswerIndex: 1,
        explanation: "Dividing by a fraction is multiplying by its reciprocal: (2/3) × (9/4) = 18/12 = 3/2 (1.5).",
        hint: "Flip the second fraction and multiply.",
        xp: 25
      }
    ]
  },
  {
    id: "math-02",
    track_id: "math",
    title: "Linear Equations & Word Problem Modeling",
    title_uz: "Chiziqli Tenglamalar va Matnli Masalalar",
    title_ru: "Линейные уравнения и текстовые задачи",
    description: "Translate real-world entrance exam problems into algebraic equations and solve them rapidly.",
    grade_level: "Grade 6-7 Foundations",
    topic: "Linear Algebra",
    duration_minutes: 25,
    is_free_preview: false,
    xp_reward: 60,
    order_index: 2,
    content: {
      introduction: "Competitive lyceum entrance exams love word problems involving speed, motion, work rates, and mixtures. The secret is defining variables cleanly.",
      conceptSummary: [
        "Let the unknown quantity be x.",
        "Group all terms containing x on the left side of the equation and numerical constants on the right.",
        "When moving a term across the '=' sign, change its sign (+ becomes -, and - becomes +).",
        "Check your solution by substituting x back into the original problem statement."
      ],
      formulaOrRules: [
        {
          label: "Motion Formula",
          formula: "Distance (S) = Speed (v) × Time (t)",
          explanation: "Essential for speed and train problems."
        }
      ],
      stepByStepExamples: [
        {
          title: "Solve: 4(x - 3) + 7 = 2x + 15",
          steps: [
            "Step 1: Expand brackets -> 4x - 12 + 7 = 2x + 15",
            "Step 2: Simplify constants on left -> 4x - 5 = 2x + 15",
            "Step 3: Move 2x to left and -5 to right -> 4x - 2x = 15 + 5",
            "Step 4: 2x = 20 -> x = 10"
          ],
          solution: "x = 10"
        }
      ],
      keyTakeaway: "Always check your solution by plugging it back into the initial equation to prevent careless arithmetic mistakes."
    },
    practice_problems: [
      {
        id: "mp-3",
        question: "A father is 3 times older than his son. In 12 years, he will be twice as old as his son. How old is the son now?",
        question_uz: "Ota o'g'lidan 3 barobar katta. 12 yildan keyin u o'g'lidan 2 barobar katta bo'ladi. O'g'il hozir necha yoshda?",
        question_ru: "Отец в 3 раза старше сына. Через 12 лет он будет старше сына в 2 раза. Сколько лет сыну сейчас?",
        options: ["10", "12", "14", "16"],
        correctAnswerIndex: 1,
        explanation: "Let son's age be x. Father is 3x. In 12 years: (3x + 12) = 2(x + 12). 3x + 12 = 2x + 24 => x = 12.",
        hint: "Set up the equation using (Father + 12) = 2 × (Son + 12).",
        xp: 30
      }
    ]
  },
  {
    id: "math-03",
    track_id: "math",
    title: "Quadratic Equations & Vieta's Formulas",
    title_uz: "Kvadrat Tenglamalar va Viyet Teoremasi",
    title_ru: "Квадратные уравнения и теорема Виета",
    description: "Solve quadratic equations using factoring, the discriminant formula, and fast shortcut tricks.",
    grade_level: "Grade 8-9 Lyceum Level",
    topic: "Quadratic Equations",
    duration_minutes: 30,
    is_free_preview: false,
    xp_reward: 75,
    order_index: 3,
    content: {
      introduction: "Inha Lyceum entrance exams frequently feature quadratic equations where using Vieta's formulas saves you 2-3 minutes per question compared to standard quadratic formula calculations.",
      conceptSummary: [
        "Standard form: ax² + bx + c = 0 (where a ≠ 0).",
        "Discriminant D = b² - 4ac. If D > 0 (2 real roots), D = 0 (1 double root), D < 0 (no real roots).",
        "Vieta's Formulas for x² + px + q = 0: x₁ + x₂ = -p, and x₁ · x₂ = q.",
        "Sum of squares identity: x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂."
      ],
      formulaOrRules: [
        {
          label: "Quadratic Roots",
          formula: "x = (-b ± √D) / (2a)",
          explanation: "Standard formula for finding roots."
        },
        {
          label: "Sum of Squares via Vieta",
          formula: "x₁² + x₂² = (-b/a)² - 2(c/a)",
          explanation: "Essential lyceum test shortcut without computing roots."
        }
      ],
      stepByStepExamples: [
        {
          title: "If x₁ and x₂ are roots of x² - 7x + 10 = 0, find x₁² + x₂².",
          steps: [
            "Step 1: By Vieta, x₁ + x₂ = 7, and x₁ · x₂ = 10.",
            "Step 2: Use the identity: x₁² + x₂² = (x₁ + x₂)² - 2(x₁ · x₂).",
            "Step 3: Calculate: 7² - 2(10) = 49 - 20 = 29."
          ],
          solution: "29"
        }
      ],
      keyTakeaway: "Don't calculate the square root of the discriminant if you only need the sum, product, or sum of squares of the roots!"
    },
    practice_problems: [
      {
        id: "mp-4",
        question: "Find the sum of roots for the equation 2x² - 10x + 3 = 0.",
        question_uz: "2x² - 10x + 3 = 0 tenglama ildizlari yig'indisini toping:",
        question_ru: "Найдите сумму корней уравнения 2x² - 10x + 3 = 0.",
        options: ["-5", "5", "1.5", "-10"],
        correctAnswerIndex: 1,
        explanation: "By Vieta's formula, x₁ + x₂ = -b/a = -(-10)/2 = 5.",
        hint: "The sum of roots is -b/a.",
        xp: 35
      }
    ]
  },
  {
    id: "math-04",
    track_id: "math",
    title: "Plane Geometry: Triangles & Inha Lyceum Exam Problems",
    title_uz: "Planimetriya: Uchburchaklar va Litsey Masalalari",
    title_ru: "Геометрия: Треугольники и задачи вступительных экзаменов",
    description: "Pythagorean theorem, special 30-60-90 & 45-45-90 triangles, and area calculation formulas.",
    grade_level: "Grade 8-9 Lyceum Level",
    topic: "Geometry",
    duration_minutes: 30,
    is_free_preview: false,
    xp_reward: 80,
    order_index: 4,
    content: {
      introduction: "Around 30% of competitive math entrance tests consist of geometry. Mastering triangle properties gives you an immediate competitive edge.",
      conceptSummary: [
        "In any right triangle with legs a, b and hypotenuse c: a² + b² = c².",
        "Recognize Pythagorean triples: (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17) and their multiples.",
        "Area of a triangle: S = 1/2 · base · height = 1/2 · a · b · sin(γ).",
        "Heron's formula: S = √(p(p-a)(p-b)(p-c)) where p = (a+b+c)/2."
      ],
      formulaOrRules: [
        {
          label: "Pythagorean Theorem",
          formula: "c = √(a² + b²)",
          explanation: "Applies exclusively to right-angled triangles."
        }
      ],
      stepByStepExamples: [
        {
          title: "Find the altitude h to the hypotenuse in a right triangle with legs 6 and 8.",
          steps: [
            "Step 1: Find hypotenuse c = √(6² + 8²) = 10.",
            "Step 2: Area S = (6 × 8) / 2 = 24.",
            "Step 3: Area is also S = (c × h) / 2 => 24 = (10 × h) / 2 => 10h = 48 => h = 4.8."
          ],
          solution: "h = 4.8"
        }
      ],
      keyTakeaway: "Equating two different formulas for the same area is one of the most powerful geometry tricks in entrance exams."
    },
    practice_problems: [
      {
        id: "mp-5",
        question: "What is the area of an equilateral triangle with side length 6 cm?",
        question_uz: "Tomoni 6 sm bo'lgan muntazam (teng tomonli) uchburchakning yuzini toping:",
        question_ru: "Чему равна площадь равностороннего треугольника со стороной 6 см?",
        options: ["9√3 cm²", "18 cm²", "12√3 cm²", "36 cm²"],
        correctAnswerIndex: 0,
        explanation: "Formula for area of equilateral triangle is S = (a²√3)/4. With a = 6: S = (36√3)/4 = 9√3 cm².",
        hint: "Use S = (a²√3)/4.",
        xp: 40
      }
    ]
  },

  // =================== ENGLISH TRACK ===================
  {
    id: "eng-01",
    track_id: "english",
    title: "Mastering Tenses: Past Simple vs. Present Perfect",
    title_uz: "Zamonlar: Past Simple va Present Perfect Farqi",
    title_ru: "Времена: Past Simple против Present Perfect",
    description: "The most tested grammatical trap on entrance exams: choosing between finished past time and present relevance.",
    grade_level: "A2 - B1 Exam Prep",
    topic: "Grammar Mastery",
    duration_minutes: 20,
    is_free_preview: true,
    xp_reward: 50,
    order_index: 1,
    content: {
      introduction: "Almost every lyceum test in Tashkent and Uzbekistan includes questions testing the difference between 'I saw' and 'I have seen'. Let's master the trigger words and logic.",
      conceptSummary: [
        "Past Simple: used for completed actions at a definite, finished time in the past (yesterday, in 2021, two days ago, when I was 10).",
        "Present Perfect: used for life experience, recent actions with present results, or uncompleted time periods (already, yet, ever, never, recently, so far).",
        "Trigger words: 'yesterday', 'ago', 'last' ALWAYS require Past Simple."
      ],
      formulaOrRules: [
        {
          label: "Present Perfect Formula",
          formula: "Subject + have/has + V3 (Past Participle)",
          explanation: "Example: He has already finished the entrance test."
        }
      ],
      stepByStepExamples: [
        {
          title: "Compare these two sentences:",
          steps: [
            "1. 'I lost my keys.' (Past action, maybe I already found them).",
            "2. 'I have lost my keys.' (Result in present: I still cannot open the door right now!).",
            "3. 'I lost my keys yesterday.' ('Yesterday' specifies a finished time period -> Past Simple mandatory)."
          ],
          solution: "Rule: Specific past time tag = Past Simple."
        }
      ],
      keyTakeaway: "If you see 'ago', 'in 2018', 'yesterday', or 'last week', immediately eliminate have/has + V3!"
    },
    practice_problems: [
      {
        id: "ep-1",
        question: "Choose the correct option: 'She ______ three academic articles so far this week.'",
        question_uz: "To'g'ri javobni tanlang: 'She ______ three academic articles so far this week.'",
        question_ru: "Выберите правильный вариант: 'She ______ three academic articles so far this week.'",
        options: ["read", "has read", "had read", "is reading"],
        correctAnswerIndex: 1,
        explanation: "'So far this week' indicates an incomplete time period up to the present, requiring Present Perfect ('has read').",
        hint: "'So far' is a classic Present Perfect time marker.",
        xp: 25
      },
      {
        id: "ep-2",
        question: "'When ______ you ______ to Samarkand?' — 'Two months ago.'",
        question_uz: "Bo'sh joylarni to'ldiring: 'When ______ you ______ to Samarkand?' — 'Two months ago.'",
        question_ru: "Вставьте пропущенные слова: 'When ______ you ______ to Samarkand?' — 'Two months ago.'",
        options: ["did / go", "have / gone", "were / going", "had / gone"],
        correctAnswerIndex: 0,
        explanation: "Questions starting with 'When' ask for a specific point in time, so they use Past Simple ('did you go').",
        hint: "'When' questions about past events use Past Simple.",
        xp: 25
      }
    ]
  },
  {
    id: "eng-02",
    track_id: "english",
    title: "Conditionals & Hypothesis (Types 1, 2, and 3)",
    title_uz: "Shart Mayli: 1, 2 va 3-turlar",
    title_ru: "Условные предложения (1, 2 и 3 типы)",
    description: "Crack the condition rules: real future possibilities vs. imaginary unreal situations.",
    grade_level: "B1 - B2 Exam Prep",
    topic: "Grammar & Structure",
    duration_minutes: 25,
    is_free_preview: false,
    xp_reward: 65,
    order_index: 2,
    content: {
      introduction: "Conditionals appear in sentence completion and error identification sections of lyceum exams. Learn the strict matching formulas to never get confused.",
      conceptSummary: [
        "First Conditional (Real Future): If + Present Simple, will + verb.",
        "Second Conditional (Unreal Present/Dream): If + Past Simple, would + verb.",
        "Third Conditional (Unreal Past Regret): If + Past Perfect (had + V3), would have + V3.",
        "Notice: 'will' or 'would' is never used directly inside the 'if' clause."
      ],
      formulaOrRules: [
        {
          label: "First Conditional",
          formula: "If + S + V1 (s/es), S + will + V1",
          explanation: "If I study diligently, I will enter Inha Lyceum."
        },
        {
          label: "Second Conditional",
          formula: "If + S + V2/were, S + would + V1",
          explanation: "If I had a supercomputer, I would simulate neural networks."
        }
      ],
      stepByStepExamples: [
        {
          title: "Exam Problem: 'If we ______ earlier, we wouldn't have missed the entrance lecture.'",
          steps: [
            "Step 1: Check the main clause: 'wouldn't have missed' (would have + V3).",
            "Step 2: This is a Third Conditional (unreal past).",
            "Step 3: The if-clause must be in Past Perfect (had + V3) -> 'had left'."
          ],
          solution: "had left"
        }
      ],
      keyTakeaway: "Match the pairs: (Present, Will) / (Past Simple, Would) / (Past Perfect, Would Have)."
    },
    practice_problems: [
      {
        id: "ep-3",
        question: "If she ______ harder for the math section, she would easily pass the entrance threshold.",
        question_uz: "To'g'ri fe'l shaklini tanlang: 'If she ______ harder for the math section, she would easily pass the entrance threshold.'",
        question_ru: "Выберите правильную форму: 'If she ______ harder for the math section, she would easily pass the entrance threshold.'",
        options: ["studies", "studied", "had studied", "will study"],
        correctAnswerIndex: 1,
        explanation: "The main clause has 'would pass' (Second Conditional), so the if-clause requires Past Simple ('studied').",
        hint: "Look at the main clause: 'would pass'.",
        xp: 30
      }
    ]
  },
  {
    id: "eng-03",
    track_id: "english",
    title: "Entrance Exam Reading Comprehension Tactics",
    title_uz: "Matnni Tushunish va Skimming/Scanning Usullari",
    title_ru: "Техника быстрого чтения и разбора экзаменационных текстов",
    description: "Strategies to solve reading passages in under 8 minutes without re-reading five times.",
    grade_level: "B1 - B2 Exam Level",
    topic: "Reading & Vocabulary",
    duration_minutes: 25,
    is_free_preview: false,
    xp_reward: 70,
    order_index: 3,
    content: {
      introduction: "Time is the biggest enemy during entrance exams. Successful students read the questions FIRST, then scan for keywords in the text.",
      conceptSummary: [
        "Skimming: Read the title, first sentence of every paragraph, and final sentence to extract the core topic in 45 seconds.",
        "Scanning: Search for numbers, proper nouns, and capitalized terms mentioned in the questions.",
        "Beware of 'Distractors': Options that copy exact words from the text but reverse the meaning.",
        "Main Idea vs Detail: 'What is the author's primary purpose?' requires looking at the whole passage, not just one sentence."
      ],
      formulaOrRules: [
        {
          label: "3-Step Reading Strategy",
          formula: "Read Questions -> Locate Paragraph Keywords -> Eliminate 2 Wrong Answers -> Confirm",
          explanation: "Saves up to 4 minutes per reading passage."
        }
      ],
      stepByStepExamples: [
        {
          title: "Handling vocabulary-in-context questions:",
          steps: [
            "1. Read the sentence with the target word.",
            "2. Substitute the 4 options into the sentence.",
            "3. Choose the option that preserves the logical tone of the sentence."
          ],
          solution: "Context determines meaning over isolated dictionary definition."
        }
      ],
      keyTakeaway: "Never read every single word slowly. Search strategically for what the question asks."
    },
    practice_problems: [
      {
        id: "ep-4",
        question: "When taking a timed entrance reading test, what should you do first?",
        question_uz: "Vaqt chegaralangan o'qish imtihonida birinchi nima qilish kerak?",
        question_ru: "Что следует сделать в первую очередь при сдаче экзаменационного текста на время?",
        options: [
          "Translate the entire text word by word",
          "Read the comprehension questions first to know what to scan for",
          "Immediately guess answers without looking at the text",
          "Memorize every adjective in the text"
        ],
        correctAnswerIndex: 1,
        explanation: "Reading questions first primes your brain with target keywords to scan for quickly in the passage.",
        hint: "Prime your focus with what will be tested.",
        xp: 35
      }
    ]
  },

  // =================== IT BASICS TRACK ===================
  {
    id: "it-01",
    track_id: "it-basics",
    title: "How the Web Works: Clients, Servers & URLs",
    title_uz: "Internet Qanday Ishlaydi: Mijoz, Server va URL",
    title_ru: "Как работает веб: Клиент, Сервер и протоколы",
    description: "Understand the foundational architecture of the modern internet and HTTP requests.",
    grade_level: "Foundation / IT Lyceum",
    topic: "Web Foundations",
    duration_minutes: 20,
    is_free_preview: true,
    xp_reward: 50,
    order_index: 1,
    content: {
      introduction: "Before writing any code, every top IT student must understand what actually happens when you type 'google.com' or 'inha.uz' into a web browser.",
      conceptSummary: [
        "Client: Your device (laptop, phone) running a web browser (Chrome, Safari).",
        "Server: A powerful computer located in a data center waiting to answer requests 24/7.",
        "DNS (Domain Name System): The phonebook of the internet that converts domain names (mentorai.uz) into IP addresses (e.g. 192.168.1.1).",
        "HTTP / HTTPS: HyperText Transfer Protocol (Secure), the standard communication protocol for web data exchange."
      ],
      formulaOrRules: [
        {
          label: "Request-Response Cycle",
          formula: "Client (Browser) -> Request -> Server -> Response (HTML/CSS/JS) -> Browser Renders",
          explanation: "The core loop of the World Wide Web."
        }
      ],
      stepByStepExamples: [
        {
          title: "The 4 Steps of loading a web page:",
          steps: [
            "1. Browser looks up IP address in DNS.",
            "2. Browser sends an HTTP GET request to that IP.",
            "3. Server processes request and responds with status 200 OK + HTML file.",
            "4. Browser parses HTML, fetches linked CSS & JS, and renders the screen."
          ],
          solution: "Seamless in 150-300 milliseconds."
        }
      ],
      keyTakeaway: "The web is simply structured messages passed back and forth between clients and servers."
    },
    practice_problems: [
      {
        id: "itp-1",
        question: "What is the primary role of DNS on the internet?",
        question_uz: "Internetda DNS ning asosiy vazifasi nima?",
        question_ru: "Какова главная роль DNS в интернете?",
        options: [
          "To translate human-friendly domain names into machine IP addresses",
          "To format web pages with colorful CSS styles",
          "To store student passwords securely in a database",
          "To measure computer processor clock speed"
        ],
        correctAnswerIndex: 0,
        explanation: "DNS translates human-readable names like 'mentorai.uz' into numerical IP addresses like '192.0.2.1'.",
        hint: "Think of it like contacts in your smartphone phonebook.",
        xp: 25
      }
    ]
  },
  {
    id: "it-02",
    track_id: "it-basics",
    title: "Semantic HTML5: Building the Skeleton of a Web Page",
    title_uz: "Semantik HTML5: Veb Sahifa Skeletini Quryapmiz",
    title_ru: "Семантический HTML5: Создаем скелет веб-страницы",
    description: "Learn tags, attributes, and semantic layout structure (<header>, <main>, <article>, <footer>).",
    grade_level: "Beginner - IT Lyceum",
    topic: "HTML5 Foundations",
    duration_minutes: 25,
    is_free_preview: false,
    xp_reward: 60,
    order_index: 2,
    content: {
      introduction: "HTML is the skeleton of every website on Earth. Modern standards require Semantic HTML — tags that convey meaning to search engines and screen readers.",
      conceptSummary: [
        "HTML stands for HyperText Markup Language.",
        "Elements consist of opening tag <tag>, content, and closing tag </tag>.",
        "Semantic tags: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.",
        "Attributes provide additional information: e.g. <a href='https://mentorai.uz' target='_blank'>."
      ],
      formulaOrRules: [
        {
          label: "Basic HTML5 Structure",
          formula: "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
          explanation: "The minimum boilerplate every HTML document requires."
        }
      ],
      stepByStepExamples: [
        {
          title: "Building a semantic article:",
          steps: [
            "<article>",
            "  <h2>My First Lyceum Project</h2>",
            "  <p>Here is an introduction to robotics...</p>",
            "</article>"
          ],
          solution: "Clean, accessible semantic layout."
        }
      ],
      keyTakeaway: "Use semantic elements instead of wrapping everything in generic <div> tags!"
    },
    practice_problems: [
      {
        id: "itp-2",
        question: "Which HTML5 element should be used for the primary navigation links of a website?",
        question_uz: "Veb-saytning asosiy navigatsiya havolalari uchun qaysi HTML5 elementi ishlatiladi?",
        question_ru: "Какой HTML5 элемент следует использовать для основных ссылок навигации сайта?",
        options: ["<navigate>", "<nav>", "<links>", "<menu-bar>"],
        correctAnswerIndex: 1,
        explanation: "The <nav> element is specifically designed for major navigation blocks.",
        hint: "It's short for navigation.",
        xp: 30
      }
    ]
  },
  {
    id: "it-03",
    track_id: "it-basics",
    title: "HTML Forms, Inputs & User Interaction",
    title_uz: "HTML Formalar va Foydalanuvchi Kiritmalari",
    title_ru: "HTML Формы, поля ввода и взаимодействие",
    description: "Capture user input: text fields, passwords, checkboxes, radio buttons, and form validation.",
    grade_level: "Intermediate - IT Lyceum",
    topic: "Forms & Controls",
    duration_minutes: 25,
    is_free_preview: false,
    xp_reward: 65,
    order_index: 3,
    content: {
      introduction: "Forms are how users register, login, submit exam answers, and interact with web applications. Mastering form elements is essential for web engineering tests.",
      conceptSummary: [
        "The <form> element wraps all interactive input fields.",
        "Input types: text, email, password, number, radio, checkbox, submit.",
        "The 'placeholder' attribute shows a helpful hint inside the empty field.",
        "The 'required' attribute prevents form submission if left blank."
      ],
      formulaOrRules: [
        {
          label: "Input syntax",
          formula: "<input type='email' placeholder='name@mail.com' required />",
          explanation: "Self-closing tag with attributes."
        }
      ],
      stepByStepExamples: [
        {
          title: "Simple login form layout:",
          steps: [
            "<form action='/login' method='POST'>",
            "  <label for='user-email'>Email</label>",
            "  <input id='user-email' type='email' required />",
            "  <button type='submit'>Sign In</button>",
            "</form>"
          ],
          solution: "Standard accessible form."
        }
      ],
      keyTakeaway: "Always connect <label for='id'> with <input id='id'> for accessibility and clickability."
    },
    practice_problems: [
      {
        id: "itp-3",
        question: "Which input type hides the characters typed by a student (e.g. replacing them with bullets or asterisks)?",
        question_uz: "Qaysi input turi kiritilgan belgilarni yashirib (nuqta yoki yulduzcha qilib) ko'rsatadi?",
        question_ru: "Какой тип input скрывает введенные символы (заменяя их точками или звездочками)?",
        options: ["type='secret'", "type='hidden'", "type='password'", "type='protected'"],
        correctAnswerIndex: 2,
        explanation: "type='password' masks the user input characters on the screen.",
        hint: "Used for sensitive authentication credentials.",
        xp: 30
      }
    ]
  }
];

export function getTrack(trackId: string): Track | undefined {
  return TRACKS_DATA.find((t) => t.id === trackId);
}

export function getLessonsByTrack(trackId: string): Lesson[] {
  return LESSONS_DATA.filter((l) => l.track_id === trackId).sort((a, b) => a.order_index - b.order_index);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return LESSONS_DATA.find((l) => l.id === lessonId);
}
