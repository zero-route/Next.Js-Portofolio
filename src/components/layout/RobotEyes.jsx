"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RobotEyes() {
  // Moods: 'normal' | 'blink' | 'wink' | 'happy' | 'sleeping'
  const [mood, setMood] = useState("normal");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: -4 }); // Default melirik sedikit ke atas
  const idleTimerRef = useRef(null);
  const blinkTimerRef = useRef(null);

  // 1. Reset Idle Timer & Handle Mouse/Touch Move
  useEffect(() => {
    const handleUserActivity = (clientX, clientY) => {
      // Jika sedang tidur lalu ada gerakan, bangunkan robot secara mulus
      setMood((prev) => (prev === "sleeping" ? "normal" : prev));

      // Hitung posisi lirikan mata relatif terhadap tengah layar
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const offsetX = ((clientX - windowWidth / 2) / (windowWidth / 2)) * 5;
      const offsetY = ((clientY - windowHeight / 2) / (windowHeight / 2)) * 5 - 3; // Tambahkan offset ke atas (-3)

      setEyeOffset({ x: offsetX, y: offsetY });

      // Reset timer idle 5 detik
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setMood("sleeping");
        setEyeOffset({ x: 0, y: -2 }); // Mata tetap diam rata saat tidur
      }, 5000);
    };

    const onMouseMove = (e) => handleUserActivity(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleUserActivity(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("scroll", () => handleUserActivity(window.innerWidth / 2, window.innerHeight / 2));

    // Inisialisasi idle timer pertama kali
    idleTimerRef.current = setTimeout(() => {
      setMood("sleeping");
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // 2. Random Blink & Expression Loop (Saat Tidak Tidur)
  useEffect(() => {
    const loopAnimations = () => {
      const nextInterval = Math.random() * 3000 + 2500;

      blinkTimerRef.current = setTimeout(() => {
        setMood((currentMood) => {
          if (currentMood === "sleeping") return "sleeping";

          // Acak animasi: kedip biasa, kedip genit (wink), atau senang
          const rand = Math.random();
          let nextMood = "blink";
          if (rand > 0.75) nextMood = "wink";
          else if (rand > 0.6) nextMood = "happy";

          // Kembalikan ke normal secara otomatis dalam 300ms
          setTimeout(() => {
            setMood((m) => (m === "sleeping" ? "sleeping" : "normal"));
          }, 300);

          return nextMood;
        });

        loopAnimations();
      }, nextInterval);
    };

    loopAnimations();

    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  // Konfigurasi varian animasi untuk mata kiri & kanan
  const getLeftEyeVariants = () => {
    switch (mood) {
      case "sleeping":
      case "blink":
        return { scaleY: 0.1, scaleX: 1, borderRadius: "4px" };
      case "wink":
        return { scaleY: 0.1, scaleX: 1, borderRadius: "4px" };
      case "happy":
        return { scaleY: 0.8, scaleX: 1.1, borderRadius: "12px 12px 4px 4px" };
      default:
        return { scaleY: 1, scaleX: 1, borderRadius: "9px" };
    }
  };

  const getRightEyeVariants = () => {
    switch (mood) {
      case "sleeping":
      case "blink":
        return { scaleY: 0.1, scaleX: 1, borderRadius: "4px" };
      case "wink":
        return { scaleY: 1, scaleX: 1, borderRadius: "9px" }; // Tetap terbuka saat wink
      case "happy":
        return { scaleY: 0.8, scaleX: 1.1, borderRadius: "12px 12px 4px 4px" };
      default:
        return { scaleY: 1, scaleX: 1, borderRadius: "9px" };
    }
  };

  return (
    <div
      onClick={() => {
        setMood("happy");
        setTimeout(() => setMood("normal"), 800);
      }}
      className="relative flex h-10 w-16 items-center justify-center cursor-pointer select-none"
      title="Robot Assistant"
    >
      {/* Animasi Zzz saat tidur */}
      <AnimatePresence>
        {mood === "sleeping" && (
          <motion.div
            initial={{ opacity: 0, y: 2, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.8 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -top-1 left-1 flex items-center gap-[2px] pointer-events-none"
          >
            <span className="text-[10px] font-extrabold text-white/90">z</span>
            <span className="text-[12px] font-extrabold text-white">Z</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kontainer Utama Mata Robot */}
      <motion.div
        animate={{
          x: eyeOffset.x,
          y: eyeOffset.y,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        className="flex items-center justify-center gap-[7px]"
      >
        {/* Mata Kiri */}
        <motion.div
          animate={getLeftEyeVariants()}
          transition={{
            type: "tween",
            duration: 0.18,
            ease: "easeInOut",
          }}
          className="w-[18px] h-[22px] bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
        />

        {/* Mata Kanan */}
        <motion.div
          animate={getRightEyeVariants()}
          transition={{
            type: "tween",
            duration: 0.18,
            ease: "easeInOut",
          }}
          className="w-[18px] h-[22px] bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </div>
  );
}
