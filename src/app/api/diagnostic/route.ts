import { NextRequest, NextResponse } from "next/server";
import { calculateStudyPlan } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      answers = {},
      targetLyceum = "inha",
      targetDirection = "it_math",
      availableMonths = 5,
      targetWeeklyHours = 14,
    } = body;

    // Evaluate Math answers
    let mathScore = 0;
    const identifiedGaps: string[] = [];

    // Math Q1 (fractions 3/4 + 2/5 - 1/2 = 13/20)
    const m1 = String(answers["diag-math-1"] || "").trim().replace(/\s+/g, "");
    if (m1 === "13/20" || m1 === "0.65") {
      mathScore += 35;
    } else {
      identifiedGaps.push("Fractions & Common Denominator (Grade 4-5)");
    }

    // Math Q2 (linear equation 3(2x-4) = 4x+10 -> 6x-12 = 4x+10 -> 2x = 22 -> x = 11)
    const m2 = String(answers["diag-math-2"] || "").trim();
    if (m2 === "11" || m2.toLowerCase() === "x=11") {
      mathScore += 35;
    } else {
      identifiedGaps.push("Linear Equation Modeling & Bracket Expansion (Grade 6-7)");
    }

    // Math Q3 (Pythagorean 6, 8 -> 10, Area 24)
    const m3 = String(answers["diag-math-3"] || "").toLowerCase();
    if (m3.includes("10") && (m3.includes("24") || m3.includes("hypotenuse"))) {
      mathScore += 30;
    } else {
      identifiedGaps.push("Right Triangle Geometry & Area Calculation (Grade 8-9)");
    }

    // Evaluate English answers
    let englishScore = 0;

    // English Q1 (walks, went)
    const e1 = String(answers["diag-eng-1"] || "").toLowerCase();
    if (e1.includes("walks") && e1.includes("went")) {
      englishScore += 50;
    } else {
      identifiedGaps.push("Present Simple vs. Past Simple Irregular Verbs (A2)");
    }

    // English Q2 (Passive voice: All the exam papers have been graded...)
    const e2 = String(answers["diag-eng-2"] || "").toLowerCase();
    if (e2.includes("have been graded") || e2.includes("all the exam papers have been graded")) {
      englishScore += 50;
    } else {
      identifiedGaps.push("Present Perfect Passive Voice Construction (B1)");
    }

    // Level assignments
    let mathLevel = "grade4_elementary";
    if (mathScore >= 80) mathLevel = "grade9_advanced";
    else if (mathScore >= 60) mathLevel = "grade8_intermediate";
    else if (mathScore >= 30) mathLevel = "grade6_foundations";

    let englishLevel = "a1_beginner";
    if (englishScore >= 90) englishLevel = "b2_exam_ready";
    else if (englishScore >= 50) englishLevel = "b1_intermediate";
    else if (englishScore >= 25) englishLevel = "a2_elementary";

    // Smart recommendation logic
    const plan = calculateStudyPlan(Number(availableMonths), Number(targetWeeklyHours));

    const recommendations = {
      recommendedDailyHours: plan.recommendedDailyHours,
      recommendedWeeklyHours: plan.recommendedWeeklyHours,
      intensity: plan.intensity,
      focusAreas: identifiedGaps.length > 0 ? identifiedGaps : ["Exam Speed Training", "Advanced Olympiad Practice"],
      studyPlanSummary: plan.advice.uz,
      adviceRu: plan.advice.ru,
      adviceEn: plan.advice.en,
    };

    const assessmentResult = {
      userId,
      math_score: mathScore,
      english_score: englishScore,
      math_level: mathLevel,
      english_level: englishLevel,
      identified_gaps: identifiedGaps,
      recommendations,
      targetLyceum,
      targetDirection,
      availableMonths,
      completed_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      assessment: assessmentResult,
    });
  } catch (error: any) {
    console.error("Diagnostic API error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate diagnostic assessment", details: error.message },
      { status: 500 }
    );
  }
}
