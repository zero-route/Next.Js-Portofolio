 // src/components/intro/IntroLoader.jsx
"use client";

import { useState, useEffect } from "react";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const duration = 2500; // Total waktu loading dalam ms
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(
        100,
        Math.floor((currentStep / steps) * 100)
      );
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800); // Durasi animasi fade-out
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white transition-opacity duration-800 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Bintang Interaktif */}
      <AnimatedBackground />

      {/* Konten Utama Intro */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Judul Utama */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
          Welcome To My
          <br />
          <span className="text-4xl sm:text-6xl md:text-7xl mt-2 inline-block">
            Portofolio Website
          </span>
        </h1>

        {/* Teks Loading & Persentase */}
        <div className="flex items-center space-x-3 text-lg sm:text-2xl font-mono text-gray-300 tracking-wider">
          <span className="animate-pulse font-semibold">Loading</span>
          <span className="text-blue-400 font-bold min-w-[60px] text-left">
            {progress}%
          </span>
        </div>

        {/* Progress Bar Custom */}
        <div className="w-64 sm:w-80 h-1.5 bg-gray-800/80 rounded-full mt-6 overflow-hidden border border-blue-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 transition-all duration-100 ease-out rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
