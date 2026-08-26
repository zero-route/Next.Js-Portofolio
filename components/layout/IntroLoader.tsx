"use client";

import { useEffect, useState } from "react";

export default function IntroLoader({ onFinish }: { onFinish?: () => void }) {
  const [text, setText] = useState("");
  const targetText = "Zero Route";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    // 1. Ketik teks secara konsisten
    const typingInterval = setInterval(() => {
      if (index <= targetText.length) {
        setText(targetText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150); // Kecepatan ketik (150ms)

    // 2. Progress bar berjalan halus sampai 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50); // Kecepatan loading bar (50ms * 50 = ~2.5 detik)

    // Cleanup interval untuk mencegah glitching/duplikasi typing
    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030712] px-4 text-center overflow-hidden">
      <div className="flex flex-col items-center max-w-full">
        {/* Header Teks dengan Responsif & Centering Presisi */}
        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-wider text-white whitespace-nowrap mb-4">
          WELCOME TO MY <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">PORTOFOLIO</span> WEBSITE
        </h1>

        {/* Dynamic Typing Text */}
        <div className="flex items-center justify-center space-x-2 text-sm sm:text-base text-gray-300 font-mono my-2 min-h-[28px]">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{text}</span>
          <span className="animate-pulse text-cyan-400 font-bold">|</span>
        </div>

        {/* Smooth Progress Bar Container */}
        <div className="w-64 sm:w-80 h-1.5 bg-gray-800 rounded-full overflow-hidden mt-4 border border-gray-700/50">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-75 ease-out shadow-[0_0_10px_#22d3ee]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
