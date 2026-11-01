import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const role = searchParams.get("role") || "student";
    const email = searchParams.get("email") || "";

    const adminEmails = (process.env.ADMIN_EMAILS || "creator@mentorai.uz,admin@mentorai.uz")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    const isAdmin = role === "admin" || (email && adminEmails.includes(email.toLowerCase()));

    if (isAdmin) {
      return NextResponse.json({
        hasAccess: true,
        isAdmin: true,
        subscription: {
          id: "admin-bypass-sub",
          status: "active",
          plan_name: "Super Admin Lifetime Pass (Free Access)",
          amount_uzs: 0,
          current_period_end: new Date(Date.now() + 100 * 365 * 24 * 3600 * 1000).toISOString(),
          payment_method: "admin_override",
        },
      });
    }

    // Standard student pricing logic
    return NextResponse.json({
      hasAccess: false,
      isAdmin: false,
      subscription: {
        id: "student-mock-sub",
        status: "inactive",
        plan_name: "Lyceum Entrance Prep Pass",
        amount_uzs: 150000,
        currency: "UZS",
        billingInterval: "month",
        features: [
          "Complete Math Track (Grade 4 to Inha Exam)",
          "Entrance Exam English & Reading Tactics",
          "IT & Web Foundations Course",
          "Unlimited 24/7 Voice & Chat AI Tutor",
          "Personalized Adaptive Diagnostic Roadmap",
          "Official Lyceum Mock Exam Drills",
        ],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, paymentMethod = "simulated", amount = 150000, durationMonths = 1 } = body;

    const transactionId = `txn_${paymentMethod}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const expiresAt = new Date(Date.now() + durationMonths * 30 * 24 * 3600 * 1000).toISOString();

    // Simulated webhook / checkout processing
    return NextResponse.json({
      success: true,
      message: "Subscription activated successfully!",
      subscription: {
        id: `sub_${Date.now()}`,
        user_id: userId || "current_user",
        status: "active",
        plan_name: "Lyceum Prep Pass (Monthly)",
        amount_uzs: amount,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        current_period_start: new Date().toISOString(),
        current_period_end: expiresAt,
      },
      paymentDetails: {
        provider: paymentMethod,
        receiptUrl: `https://payme.uz/receipt/${transactionId}`,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Payment processing failed", details: error.message }, { status: 500 });
  }
}

