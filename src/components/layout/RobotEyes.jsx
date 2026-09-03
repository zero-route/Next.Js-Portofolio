"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RobotEyes() {
  const [mood, setMood] = useState("normal");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: -4 });

  const idleTimerRef = useRef(null);
  const blinkTimerRef = useRef(null);
  const tempMoodTimerRef = useRef(null);
  
  // Ref untuk mencatat status sleeping secara akurat & synchronous
  const isSleepingRef = useRef(false);

  // Mengatur status sleep/wake dengan aman
  const setSleepingState = useCallback((sleeping) => {
    isSleepingRef.current = sleeping;
    if (sleeping) {
      setMood("sleeping");
      setEyeOffset({ x: 0, y: -2 });
    } else {
      if (tempMoodTimerRef.current) clearTimeout(tempMoodTimerRef.current);
      setMood("normal");
    }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setSleepingState(true);
    }, 10000);
  }, [setSleepingState]);

  const handleUserPointer = useCallback((clientX, clientY, isClick = false) => {
    // Jika sedang tidur atau berinteraksi, bangunkan total
    if (isSleepingRef.current) {
      setSleepingState(false);
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const offsetX = ((clientX - windowWidth / 2) / (windowWidth / 2)) * 6;
    const offsetY = ((clientY - windowHeight / 2) / (windowHeight / 2)) * 6 - 3;

    setEyeOffset({ x: offsetX, y: offsetY });

    if (isClick) {
      if (tempMoodTimerRef.current) clearTimeout(tempMoodTimerRef.current);
      setMood("happy");
      tempMoodTimerRef.current = setTimeout(() => {
        if (!isSleepingRef.current) setMood("normal");
      }, 700);
    }

    resetIdleTimer();
  }, [resetIdleTimer, setSleepingState]);

  useEffect(() => {
    const onPointerMove = (e) => handleUserPointer(e.clientX, e.clientY, false);
    const onPointerDown = (e) => handleUserPointer(e.clientX, e.clientY, true);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleUserPointer(e.touches[0].clientX, e.touches[0].clientY, false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("touchmove", onTouchMove);

    resetIdleTimer();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (tempMoodTimerRef.current) clearTimeout(tempMoodTimerRef.current);
    };
  }, [handleUserPointer, resetIdleTimer]);

  // Loop ekspresi acak (Blink, Wink, The Rock, dan Happy/Senyum)
  useEffect(() => {
    const loopAnimations = () => {
      const nextInterval = Math.random() * 2500 + 2000;

      blinkTimerRef.current = setTimeout(() => {
        if (!isSleepingRef.current) {
          const rand = Math.random();
          let nextMood = "blink";

          if (rand > 0.75) nextMood = "wink";
          else if (rand > 0.5) nextMood = "happy"; // Animasi Seneng / Senyum
          else if (rand > 0.3) nextMood = "theRock";

          setMood(nextMood);

          if (tempMoodTimerRef.current) clearTimeout(tempMoodTimerRef.current);
          tempMoodTimerRef.current = setTimeout(() => {
            if (!isSleepingRef.current) {
              setMood("normal");
            }
          }, 500);
        }

        loopAnimations();
      }, nextInterval);
    };

    loopAnimations();

    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, []);

  const getLeftEyeVariants = () => {
    switch (mood) {
      case "sleeping":
      case "blink":
        return { scaleY: 0.1, scaleX: 1, y: 0, borderRadius: "4px" };
      case "wink":
        return { scaleY: 0.1, scaleX: 1, y: 0, borderRadius: "4px" };
      case "happy":
        // Mata melengkung ke atas (senyum gembira)
        return { scaleY: 0.7, scaleX: 1.15, y: -2, borderRadius: "12px 12px 2px 2px" };
      case "theRock":
        return { scaleY: 1.25, scaleX: 1.05, y: -5, borderRadius: "9px" };
      default:
        return { scaleY: 1, scaleX: 1, y: 0, borderRadius: "9px" };
    }
  };

  const getRightEyeVariants = () => {
    switch (mood) {
      case "sleeping":
      case "blink":
        return { scaleY: 0.1, scaleX: 1, y: 0, borderRadius: "4px" };
      case "wink":
        return { scaleY: 1, scaleX: 1, y: 0, borderRadius: "9px" };
      case "happy":
        // Mata melengkung ke atas (senyum gembira)
        return { scaleY: 0.7, scaleX: 1.15, y: -2, borderRadius: "12px 12px 2px 2px" };
      case "theRock":
        return { scaleY: 0.4, scaleX: 1, y: 2, borderRadius: "6px" };
      default:
        return { scaleY: 1, scaleX: 1, y: 0, borderRadius: "9px" };
    }
  };

  return (
    <div
      className="relative flex h-10 w-16 items-center justify-center cursor-pointer select-none"
      title="Robot Assistant"
    >
      <AnimatePresence>
        {mood === "sleeping" && (
          <motion.div
            key="zzz-text"
            initial={{ opacity: 0, y: 2, scale: 0.8 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.8 }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute -top-1 left-1 flex items-center gap-[2px] pointer-events-none"
          >
            <span className="text-[10px] font-extrabold text-white/90">z</span>
            <span className="text-[12px] font-extrabold text-white">Z</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          x: eyeOffset.x,
          y: eyeOffset.y,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
        }}
        className="flex items-center justify-center gap-[7px]"
      >
        <motion.div
          animate={getLeftEyeVariants()}
          transition={{
            type: "tween",
            duration: 0.12,
            ease: "easeOut",
          }}
          className="w-[18px] h-[22px] bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
        />

        <motion.div
          animate={getRightEyeVariants()}
          transition={{
            type: "tween",
            duration: 0.12,
            ease: "easeOut",
          }}
          className="w-[18px] h-[22px] bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </div>
  );
}
