"use client";

import { useEffect, useRef, useState } from "react";

export function useYouTubePlayer(containerId: string) {
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  // callback terbaru disimpan di ref supaya player tidak perlu dibuat ulang
  const onStateChangeRef = useRef<(event: any) => void>(() => {});

  useEffect(() => {
    let cancelled = false;

    function createPlayer() {
      if (cancelled) return;
      playerRef.current = new window.YT.Player(containerId, {
        height: "0",
        width: "0",
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (event: any) => onStateChangeRef.current(event),
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        createPlayer();
      };
      if (!document.getElementById("youtube-iframe-api-script")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { playerRef, isReady, onStateChangeRef };
}
