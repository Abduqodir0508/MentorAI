import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Uzbek Som (UZS)
 * e.g. 150000 -> "150 000 UZS" or "150 000 so'm"
 */
export function formatUZS(amount: number, suffix: string = "UZS"): string {
  if (isNaN(amount)) return `0 ${suffix}`;
  const formatted = new Intl.NumberFormat("ru-RU").format(amount);
  return `${formatted} ${suffix}`;
}

/**
 * Format date in localized human-readable form
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Smart recommendation calculation:
 * If prep time is < 6 months, recommend intensive schedule (2-3.5 hours/day)
 * If prep time is >= 6 months, recommend balanced schedule (1.5-2 hours/day)
 */
export function calculateStudyPlan(availableMonths: number, weeklyHours: number = 14) {
  const isIntensive = availableMonths < 6;
  const recommendedDaily = isIntensive 
    ? (availableMonths <= 3 ? 3.5 : 2.5) 
    : 1.5;
  
  const recommendedWeekly = Math.round(recommendedDaily * 6); // 6 study days, 1 review day

  const intensity: 'crash_course' | 'intensive' | 'standard' = 
    availableMonths <= 3 ? 'crash_course' : availableMonths < 6 ? 'intensive' : 'standard';

  const adviceUz = isIntensive
    ? `Imtihongacha kam vaqt qolgan (${availableMonths} oy)! Kuniga kamida ${recommendedDaily} soat ajratish va zaif mavzularga (kasrlar, tenglamalar, imtihon matnlari) chuqur urg'u berish tavsiya etiladi.`
    : `Sizda yetarlicha vaqt bor (${availableMonths} oy). Kuniga ${recommendedDaily} soat barqaror o'qish orqali 4-sinf asoslaridan to litsey darajasigacha to'liq o'zlashtira olasiz.`;

  const adviceRu = isIntensive
    ? `До экзамена осталось мало времени (${availableMonths} мес.)! Рекомендуется выделять минимум ${recommendedDaily} часа в день и сделать упор на ликвидацию пробелов.`
    : `У вас достаточно времени (${availableMonths} мес.). Занимаясь по ${recommendedDaily} часа в день, вы спокойно пройдете весь путь от базы до лицея.`;

  const adviceEn = isIntensive
    ? `High-intensity study recommended: with only ${availableMonths} months remaining, allocate ${recommendedDaily} hours daily with focus on high-yield exam topics.`
    : `Balanced pacing recommended: with ${availableMonths} months available, allocate ${recommendedDaily} hours daily to build mastery from foundations up.`;

  return {
    isIntensive,
    recommendedDailyHours: recommendedDaily,
    recommendedWeeklyHours: recommendedWeekly,
    intensity,
    advice: {
      uz: adviceUz,
      ru: adviceRu,
      en: adviceEn,
    },
  };
}

export function getLyceumLabel(key: string | null | undefined): string {
  switch (key) {
    case "inha":
      return "Inha Academic Lyceum (IUT)";
    case "academic_lyceum":
      return "State Academic Lyceums";
    case "wiut":
      return "Westminster Lyceum (ALWIUT)";
    case "presidential":
      return "Presidential Schools & Lyceums";
    case "al-khwarizmi":
      return "Al-Khwarizmi Specialized School";
    default:
      return key || "Competitive Lyceum";
  }
}

export function getDirectionLabel(key: string | null | undefined): string {
  switch (key) {
    case "it":
    case "it_math":
      return "IT & Computer Science (Inha / Al-Khwarizmi)";
    case "exact-sciences":
    case "exact_sciences":
      return "Exact Sciences & Economics (ALWIUT / Math-Physics)";
    case "medicine":
      return "Medicine & Natural Sciences (Biology & Chemistry)";
    case "law":
      return "Law & Humanities (History & State/Law)";
    case "languages":
      return "Foreign Languages & Philology (CEFR B1/B2)";
    case "economics":
      return "Economics & Social Sciences";
    case "social_sciences":
      return "Social Sciences & Languages";
    default:
      return key || "General Lyceum Track";
  }
}

