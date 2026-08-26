 import { NextRequest, NextResponse } from "next/server";
import { getRotatingKeys, tryWithKeyRotation } from "@/lib/apiKeyRotation";
import { ASTREA_SYSTEM_PROMPT } from "@/lib/systemPrompt";

export const runtime = "nodejs";

type GeminiHistoryItem = { role: "user" | "model"; parts: { text: string }[] };

export async function POST(req: NextRequest) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history?: GeminiHistoryItem[];
    };

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Pesan kosong." }, { status: 400 });
    }

    const keys = getRotatingKeys("GEMINI_API_KEY");

    const reply = await tryWithKeyRotation(keys, async (key) => {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: ASTREA_SYSTEM_PROMPT }] },
            contents: [...(history ?? []), { role: "user", parts: [{ text: message }] }],
          }),
        }
      );

      // Kena limit/quota -> lempar error supaya rotasi lanjut ke key berikutnya
      if (res.status === 429 || res.status === 403) {
        throw new Error(`Gemini key limit/forbidden (status ${res.status})`);
      }
      if (!res.ok) return null;

      const data = await res.json();
      const text: string | undefined =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      return text ?? null;
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { reply: "Maaf, terjadi kesalahan koneksi ke Astrea." },
      { status: 200 }
    );
  }
}
