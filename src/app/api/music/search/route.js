import { NextResponse } from "next/server";

const API_KEYS = [
  process.env.YOUTUBE_API_KEY_1,
  process.env.YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3,
].filter(Boolean);

function isQuotaError(data) {
  const reason =
    data?.error?.errors?.[0]?.reason ||
    data?.error?.status ||
    "";

  return [
    "quotaExceeded",
    "dailyLimitExceeded",
    "rateLimitExceeded",
    "userRateLimitExceeded",
  ].includes(reason);
}

async function searchWithKey(apiKey, query) {
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    videoCategoryId: "10",
    maxResults: "12",
    safeSearch: "moderate",
    key: apiKey,
  });

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      quota: isQuotaError(data),
      error: data?.error?.message || "YouTube API error",
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query is required",
        },
        { status: 400 }
      );
    }

    if (!API_KEYS.length) {
      return NextResponse.json(
        {
          success: false,
          message: "YouTube API keys are not configured.",
        },
        { status: 500 }
      );
    }

    let lastError = null;

    // API rotation:
    // Key 1 -> Key 2 -> Key 3
    for (let index = 0; index < API_KEYS.length; index++) {
      const result = await searchWithKey(API_KEYS[index], query);

      if (result.ok) {
        const videos = result.data.items
          .filter((item) => item.id?.videoId)
          .map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet?.title || "Unknown Title",
            artist: item.snippet?.channelTitle || "Unknown Artist",
            thumbnail:
              item.snippet?.thumbnails?.high?.url ||
              item.snippet?.thumbnails?.medium?.url ||
              item.snippet?.thumbnails?.default?.url ||
              "",
          }));

        return NextResponse.json({
          success: true,
          results: videos,
          keyUsed: index + 1,
        });
      }

      lastError = result.error;

      // Kalau quota habis, langsung lanjut key berikutnya.
      if (result.quota) {
        continue;
      }

      // Error non-quota juga boleh fallback.
      continue;
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "All YouTube API keys are unavailable or have reached their quota.",
        error: lastError,
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Music search error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}