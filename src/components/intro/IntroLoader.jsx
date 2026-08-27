"use client";

import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";

/**
 * IntroLoader
 * - "Welcome To My" : fade-in + slide from top, words appear in order.
 * - "Portofolio Website" : fade-in + slide from bottom, continuing the
 *   SAME stagger sequence right after "My". The two words share ONE
 *   continuous blue -> white gradient, with a soft glowing "shine" behind
 *   it (like a neon halo), pulsing gently.
 *
 *   NOTE: an earlier version faked the shine with a duplicated text layer
 *   (::after + content: attr(data-text)) sitting on top. That duplicate
 *   rendered fully visible from frame 1, so it looked like a second block
 *   of text stamped over the real one, and masked the fade/slide/stagger
 *   entrance entirely. This version uses a glow (drop-shadow filter) on
 *   the SAME element instead of a separate overlay, so it animates in
 *   together with the text rather than covering it.
 * - On mobile: the two groups stack as two lines.
 *   On desktop (sm and up): both groups sit inline on one line.
 * - Loading bar fades/slides in after the title, fill color white.
 *
 * Props:
 *   duration   - ms for the loading bar to go 0 -> 100 (default 6500)
 *   onFinish   - called once, when loading completes
 */
export default function IntroLoader({ duration = 6500, onFinish }) {
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

        {/* One shared gradient across "Portofolio Website" + glow behind it.
            No duplicate text layer this time — the glow is a filter on
            this same element, so it fades/slides in with the real words. */}
        <div className="shine-text relative inline-flex flex-wrap items-center justify-center gap-x-4 text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-space-blue to-white bg-clip-text text-transparent">
          {bottomWords.map((word, i) => (
            <span
              key={word}
              className="intro-word intro-word--up"
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

        /* Soft glowing halo behind "Portofolio Website", pulsing gently.
           This is a filter on the text itself, so it fades/slides in
           together with the words instead of covering them. */
        .shine-text {
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.55))
            drop-shadow(0 0 26px rgba(147, 197, 253, 0.35));
          animation: shinePulse 2.6s ease-in-out infinite;
          animation-delay: ${(topWords.length + bottomWords.length - 1) * STEP_MS}ms;
        }
        @keyframes shinePulse {
          0%,
          100% {
            filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.5))
              drop-shadow(0 0 24px rgba(147, 197, 253, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(96, 165, 250, 0.75))
              drop-shadow(0 0 36px rgba(147, 197, 253, 0.5));
          }
        }
      `}</style>
    </div>
  );
}
