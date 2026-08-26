"use client";

import { useEffect, useState } from "react";

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hide, setHide] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const text = " Zero Route";
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setTyped(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const barTimer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setHide(true);
        if (onDone) onDone();
      }, 700);
      return () => clearTimeout(hideTimer);
    }, 2800);

    return () => clearTimeout(barTimer);
  }, [onDone]);

  if (hide) return null;

  return (
    <header
      className={`fixed inset-0 z-[9999] flex h-screen w-full overflow-hidden flex-col items-center justify-center bg-[#030712] text-center transition-all duration-700 ease-in-out ${
        fadeOut ? "-translate-y-4 opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="main-text px-4 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="font-display text-[20px] sm:text-[24px] md:text-[26px] text-white tracking-wide leading-snug flex flex-col md:flex-row items-center justify-center md:gap-2">
          <span className="whitespace-nowrap">
            <span className="inline-block loader-slide-down [animation-delay:0.2s]">WELCOME</span>{" "}
            <span className="inline-block loader-slide-down [animation-delay:0.4s]">TO</span>{" "}
            <span className="inline-block loader-slide-down [animation-delay:0.6s]">MY</span>
          </span>

          <span className="whitespace-nowrap">
            <span className="inline-block loader-slide-up [animation-delay:0.8s] bg-gradient-text bg-clip-text text-transparent [filter:drop-shadow(0_0_20px_#38bdf8)]">
              PORTOFOLIO
            </span>{" "}
            <span className="inline-block loader-slide-up [animation-delay:1s] bg-gradient-text bg-clip-text text-transparent [filter:drop-shadow(0_0_20px_#38bdf8)]">
              WEBSITE
            </span>
          </span>
        </h1>

        <p className="mx-auto my-4 flex max-w-[200px] loader-slide-up [animation-delay:1.1s] items-center justify-center rounded-md px-3 py-1.5 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-2 whitespace-nowrap border-r-2 border-accent-cyan-light pr-1 font-sans text-white min-h-[20px]">
            {typed}
          </span>
        </p>

        <div className="mx-auto mt-2.5 h-1 w-3/5 max-w-[250px] overflow-hidden rounded-full border border-accent-cyan-light/20 bg-bg-card/80">
          <div className="h-full w-full origin-left bg-gradient-text [animation:loading-slide_2.8s_ease-in-out_forwards]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </header>
  );
}
