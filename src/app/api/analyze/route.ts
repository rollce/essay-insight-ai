import { analyzeEssay } from "@/lib/analyze";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const text = payload?.text?.trim();

  if (!text || text.length < 80) {
    return NextResponse.json(
      { error: "Please provide at least 80 characters for a meaningful analysis." },
      { status: 400 },
    );
  }

  return NextResponse.json({ result: analyzeEssay(text) });
}
