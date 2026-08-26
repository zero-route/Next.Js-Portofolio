import { NextRequest, NextResponse } from "next/server";
import { getRotatingKeys, tryWithKeyRotation } from "@/lib/apiKeyRotation";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.json({ items: [] }, { status: 400 });
  }

  const keys = getRotatingKeys("YOUTUBE_API_KEY");

  try {
    const items = await tryWithKeyRotation(keys, async (key) => {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("type", "video");
      url.searchParams.set("videoCategoryId", "10"); // kategori Musik
      url.searchParams.set("maxResults", "12");
      url.searchParams.set("q", q);
      url.searchParams.set("key", key);

      const res = await fetch(url.toString());

      if (res.status === 403 || res.status === 429) {
        // kemungkinan quota harian key ini habis -> coba key berikutnya
        throw new Error(`YouTube key quota habis (status ${res.status})`);
      }
      if (!res.ok) return null;

      const data = await res.json();
      return data.items ?? null;
    });

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Music search API error:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
