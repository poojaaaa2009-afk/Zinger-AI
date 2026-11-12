import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message, mood, lang } = await req.json();
    if (typeof message !== "string" || !message.trim() || message.length > 3000) {
      return NextResponse.json({ error: "Please provide a message up to 3,000 characters." }, { status: 400 });
    }

    // Server-side AI integration. Add OPENAI_API_KEY to .env.local.
    if (process.env.OPENAI_API_KEY) {
      const system = `You are Zinger AI, a helpful smart-reply generator. Create exactly 3 distinct concise replies in ${lang === "si" ? "natural conversational Sinhala or Singlish" : "English"}. Tone: ${mood}. Keep replies witty or confident as appropriate, but never hateful, threatening, discriminatory, or abusive. Return strict JSON: {"replies":[{"text":"...","tag":"THE OPENER"},{"text":"...","tag":"THE FOLLOW-UP"},{"text":"...","tag":"THE MIC DROP"}]}.`;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.85,
          response_format: { type: "json_object" },
          messages: [{ role: "system", content: system }, { role: "user", content: message }]
        })
      });
      if (!response.ok) return NextResponse.json({ error: "AI provider request failed." }, { status: 502 });
      const data = await response.json();
      const parsed = JSON.parse(data.choices?.[0]?.message?.content || "{}");
      if (!Array.isArray(parsed.replies) || parsed.replies.length < 3) {
        return NextResponse.json({ error: "AI returned an invalid response." }, { status: 502 });
      }
      return NextResponse.json({ replies: parsed.replies.slice(0, 3) });
    }

    // Safe demo fallback: the client displays sample replies. No secret keys are required to preview the UI.
    return NextResponse.json({ replies: [] });
  } catch {
    return NextResponse.json({ error: "Unable to generate a reply right now." }, { status: 500 });
  }
}