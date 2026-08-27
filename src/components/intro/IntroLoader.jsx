"use client";

import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";

/**
 * IntroLoader
 * - "Welcome To My" : fade-in + slide from top, words appear in order.
 * - "Portofolio Website" : fade-in + slide from bottom, continuing the
 *   SAME stagger sequence right after "My". Gradient blue -> white.
 * - On mobile: the two groups stack as two lines.
 *   On desktop (sm and up): both groups sit inline on one line.
 * - Loading bar (with "Loading" / percentage labels) fades in + slides
 *   up AFTER the title finishes, fill color is white.
 *
 * Props:
 *   duration   - ms for the loading bar to go 0 -> 100 (default 5000,
 *                slowed down from the previous 3200 per feedback)
 *   onFinish   - called once, when loading completes
 */
export default function IntroLoader({ duration = 5000, onFinish }) {
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

  // slowed down from 220ms -> 420ms per word, and animation itself is
  // longer (0.9s instead of 0.6s, set below in the <style> block)
  const STEP_MS = 420;
  const topWords = ["Welcome", "To", "My"];
  const bottomWords = ["Portofolio", "Website"];
  const LOADING_DELAY_MS = (topWords.length + bottomWords.length - 1) * STEP_MS + 700;

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
              className="intro-word intro-word--up text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-space-blue to-white bg-clip-text text-transparent"
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
          animation-duration: 0.9s;
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
