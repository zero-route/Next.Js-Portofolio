"use client";

import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";

export default function IntroLoader({ duration = 100, onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const STEP_MS = 420;
  const topWords = ["Welcome", "To", "My"];

  const PHRASE_LENGTH = "Portofolio Website".length;
  const bottomWords = [
    { text: "Portofolio", start: 0, end: 10 },
    { text: "Website", start: 11, end: 18 },
  ];

  const LOADING_DELAY_MS = (topWords.length + bottomWords.length - 1) * STEP_MS + 300;

  useEffect(() => {
    let frameId;
    let startTimeoutId;

    startTimeoutId = setTimeout(() => {
      const startTime = performance.now();

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
    }, LOADING_DELAY_MS);

    return () => {
      clearTimeout(startTimeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [duration, onFinish, LOADING_DELAY_MS]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      <AnimatedBackground className="absolute inset-0" starCount={180} />

      <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-3 sm:gap-x-3 text-center px-6">
        <div className="flex w-full sm:w-auto flex-wrap items-center justify-center gap-x-3">
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

        <div className="shine-text flex w-full sm:w-auto flex-wrap items-center justify-center gap-x-4">
          {bottomWords.map((word, i) => {
            const wordChars = word.end - word.start;
            const bgSizePercent = (PHRASE_LENGTH / wordChars) * 100;
            const bgPositionPercent = -(word.start / wordChars) * 100;

            return (
              <span
                key={word.text}
                className="intro-word intro-word--up text-4xl sm:text-5xl font-bold tracking-tight"
                style={{
                  animationDelay: `${(topWords.length + i) * STEP_MS}ms`,
                  backgroundImage: "linear-gradient(to right, #1d4ed8, #ffffff)",
                  backgroundSize: `${bgSizePercent}% 100%`,
                  backgroundPositionX: `${bgPositionPercent}%`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {word.text}
              </span>
            );
          })}
        </div>
      </div>

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
