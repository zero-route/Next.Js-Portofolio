"use client";

import { useEffect, useState } from "react";

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hide, setHide] = useState(false);
  const [typed, setTyped] = useState("");

  // Fix Typing Effect: Menggunakan slice() agar teks terpotong rapi tanpa duplikasi huruf
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

  // Timer 3 detik untuk animasi fade out
  useEffect(() => {
    const barTimer = setTimeout(() => {
      setFadeOut(true);
      const hideTimer = setTimeout(() => {
        setHide(true);
        if (onDone) onDone();
      }, 800);
      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => clearTimeout(barTimer);
  }, [onDone]);

  if (hide) return null;

  return (
    <header
      className={`fixed inset-0 z-[9999] flex h-screen w-full max-w-full overflow-hidden flex-col items-center justify-center bg-[#030712] text-center transition-all duration-700 ease-in-out ${
        fadeOut ? "-translate-y-5 opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="main-text px-4 w-full max-w-lg mx-auto flex flex-col items-center justify-center">
        {/* Fix Layout Melenceng: Ditambahkan tracking, max-w, dan responsive text size */}
        <h1 className="font-display text-[18px] sm:text-[24px] md:text-[28px] text-white tracking-normal leading-snug">
          <span className="inline-block animate-slide-down [animation-delay:0.2s] opacity-0">WELCOME</span>{" "}
          <span className="inline-block animate-slide-down [animation-delay:0.6s] opacity-0">TO</span>{" "}
          <span className="inline-block animate-slide-down [animation-delay:1s] opacity-0">MY</span>{" "}
          <span className="inline-block animate-slide-up [animation-delay:1.2s] bg-gradient-text bg-clip-text text-transparent opacity-0 [filter:drop-shadow(0_0_20px_#38bdf8)]">
            PORTOFOLIO
          </span>{" "}
          <span className="inline-block animate-slide-up [animation-delay:1.6s] bg-gradient-text bg-clip-text text-transparent opacity-0 [filter:drop-shadow(0_0_20px_#38bdf8)]">
            WEBSITE
          </span>
        </h1>

        <p className="mx-auto my-4 flex max-w-[200px] animate-slide-up items-center justify-center rounded-md px-3 py-1.5 text-xs text-text-secondary">
          <span className="inline-flex items-center gap-2 whitespace-nowrap border-r-2 border-accent-cyan-light pr-1 font-sans text-white min-h-[20px]">
            {typed}
          </span>
        </p>

        <div className="mx-auto mt-2.5 h-1 w-3/5 max-w-[250px] overflow-hidden rounded-full border border-accent-cyan-light/20 bg-bg-card/80">
          <div className="h-full w-full origin-left bg-gradient-text [animation:loading-slide_3s_ease-in-out_forwards]" />
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
