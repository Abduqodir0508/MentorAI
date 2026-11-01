import { NextRequest, NextResponse } from "next/server";
import { calculateStudyPlan } from "@/lib/utils";
import { getDiagnosticQuestionsForTrack } from "@/lib/ai/prompts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      answers = {},
      trackId = "it",
      targetLyceum = "inha",
      targetDirection = "it",
      availableMonths = 5,
      targetWeeklyHours = 14,
      language = "uz",
    } = body;

    const questions = getDiagnosticQuestionsForTrack(trackId);
    let totalScore = 0;
    const maxScore = questions.length * 33.34;
    const identifiedGaps: string[] = [];
    const identifiedGapsUz: string[] = [];
    const identifiedGapsRu: string[] = [];

    questions.forEach((q) => {
      const studentAns = String(answers[q.id] || "").trim().toLowerCase().replace(/\s+/g, "");
      const expectedAns = String(q.correctAnswer).trim().toLowerCase().replace(/\s+/g, "");

      let isCorrect = false;
      if (studentAns === expectedAns) {
        isCorrect = true;
      } else if (expectedAns.includes("/") && studentAns.includes("/")) {
        isCorrect = studentAns === expectedAns;
      } else if (expectedAns.includes("1370") && studentAns.includes("1370")) {
        isCorrect = true;
      } else if (expectedAns.includes("nav") && studentAns.includes("nav")) {
        isCorrect = true;
      } else if (expectedAns.includes("mitochondria") && (studentAns.includes("mitoxondriya") || studentAns.includes("митохондр") || studentAns.includes("mitochondr"))) {
        isCorrect = true;
      } else if (expectedAns.includes("oliy") && (studentAns.includes("oliy") || studentAns.includes("majlis") || studentAns.includes("мажлис"))) {
        isCorrect = true;
      } else if (expectedAns.includes("innocence") && (studentAns.includes("aybsizlik") || studentAns.includes("невиновност") || studentAns.includes("prezump"))) {
        isCorrect = true;
      } else if (expectedAns.includes("walks") && studentAns.includes("walks") && studentAns.includes("went")) {
        isCorrect = true;
      } else if (expectedAns.includes("al2o3") && (studentAns.includes("al2o3") || studentAns.includes("al₂o₃"))) {
        isCorrect = true;
      }

      if (isCorrect) {
        totalScore += 33.34;
      } else {
        identifiedGaps.push(q.gapIdentifiedIfWrong);
        identifiedGapsUz.push(q.gapIdentifiedIfWrong_uz);
        identifiedGapsRu.push(q.gapIdentifiedIfWrong_ru);
      }
    });

    const scaledScore = Math.min(100, Math.round(totalScore));

    // Calibrated Level
    let overallLevel = "Foundation Level (Grade 4-6)";
    if (scaledScore >= 80) overallLevel = "Competitive Exam Advanced (Grade 9+)";
    else if (scaledScore >= 50) overallLevel = "Intermediate Lyceum Level (Grade 7-8)";

    // Study plan calculation
    const plan = calculateStudyPlan(Number(availableMonths), Number(targetWeeklyHours));

    const recommendations = {
      recommendedDailyHours: plan.recommendedDailyHours,
      recommendedWeeklyHours: plan.recommendedWeeklyHours,
      intensity: plan.intensity,
      focusAreas: identifiedGaps.length > 0 ? identifiedGaps : ["Exam Speed Training & Mock Drills"],
      focusAreasUz: identifiedGapsUz.length > 0 ? identifiedGapsUz : ["Imtihon tezligini oshirish va mock testlar"],
      focusAreasRu: identifiedGapsRu.length > 0 ? identifiedGapsRu : ["Повышение скорости решения экзаменационных тестов"],
      studyPlanSummary: plan.advice.uz,
      adviceUz: plan.advice.uz,
      adviceRu: plan.advice.ru,
      adviceEn: plan.advice.en,
    };

    const assessmentResult = {
      userId,
      track_id: trackId,
      track_score: scaledScore,
      math_score: scaledScore,
      english_score: scaledScore,
      overall_level: overallLevel,
      identified_gaps: identifiedGaps,
      identified_gaps_uz: identifiedGapsUz,
      identified_gaps_ru: identifiedGapsRu,
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
