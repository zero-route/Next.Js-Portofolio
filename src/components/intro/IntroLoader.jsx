"use client";

import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";

export default function IntroLoader({ duration = 3200, onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = performance.now();

    let frameId;
    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onFinish?.();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [duration, onFinish]);

  if (!visible) return null;

  const STEP_MS = 220;
  const topWords = ["Welcome", "To", "My"];
  const bottomWords = ["Portofolio", "Website"];
  // loading section waits for the last title word to finish animating
  const LOADING_DELAY_MS = (topWords.length + bottomWords.length - 1) * STEP_MS + 500;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <AnimatedBackground className="absolute inset-0" starCount={180} />

      {/* Title: stacked on mobile, inline on desktop */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-1 sm:gap-x-3 text-center px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3">
          {topWords.map((word, i) => (
            <span
              key={word}
              className="intro-word intro-word--down text-3xl sm:text-5xl font-semibold tracking-tight text-white"
              style={{ animationDelay: `${i * STEP_MS}ms` }}
            >
              {word}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4">
          {bottomWords.map((word, i) => (
            <span
              key={word}
              className="intro-word intro-word--up text-4xl sm:text-5xl font-bold tracking-tight text-space-blue"
              style={{ animationDelay: `${(topWords.length + i) * STEP_MS}ms` }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Loading bar: fades in + slides up after the title finishes */}
      <div
        className="intro-word intro-word--up relative z-10 mt-14 w-[78%] max-w-md"
        style={{ animationDelay: `${LOADING_DELAY_MS}ms`, display: "block" }}
      >
        <div className="mb-2 flex items-center justify-between text-xs sm:text-sm font-medium tracking-wide text-white/80">
          <span>Loading</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        .intro-word {
          display: inline-block;
          opacity: 0;
          animation-duration: 0.6s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }
        .intro-word--down {
          animation-name: fadeSlideDown;
        }
        .intro-word--up {
          animation-name: fadeSlideUp;
        }
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
