"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RobotEyes() {
  const [mood, setMood] = useState("normal");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: -4 });
  const idleTimerRef = useRef(null);
  const blinkTimerRef = useRef(null);

  const handleUserPointer = useCallback((clientX, clientY, isClick = false) => {
    setMood((prev) => (prev === "sleeping" ? "normal" : prev));

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const offsetX = ((clientX - windowWidth / 2) / (windowWidth / 2)) * 6;
    const offsetY = ((clientY - windowHeight / 2) / (windowHeight / 2)) * 6 - 3;

    setEyeOffset({ x: offsetX, y: offsetY });

    if (isClick) {
      setMood("happy");
      setTimeout(() => {
        setMood((m) => (m === "sleeping" ? "sleeping" : "normal"));
      }, 500);
    }

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setMood("sleeping");
      setEyeOffset({ x: 0, y: -2 });
    }, 5000);
  }, []);

  useEffect(() => {
    const onPointerMove = (e) => handleUserPointer(e.clientX, e.clientY, false);
    const onPointerDown = (e) => handleUserPointer(e.clientX, e.clientY, true);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleUserPointer(e.touches[0].clientX, e.touches[0].clientY, false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("touchmove", onTouchMove);

    idleTimerRef.current = setTimeout(() => {
      setMood("sleeping");
    }, 5000);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [handleUserPointer]);

  useEffect(() => {
    const loopAnimations = () => {
      const nextInterval = Math.random() * 2500 + 2000;

      blinkTimerRef.current = setTimeout(() => {
        setMood((currentMood) => {
          if (currentMood === "sleeping") return "sleeping";

          const rand = Math.random();
          let nextMood = "blink";
          if (rand > 0.8) nextMood = "wink";

          setTimeout(() => {
            setMood((m) => (m === "sleeping" ? "sleeping" : "normal"));
          }, 200);

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

  const getLeftEyeVariants = () => {
    switch (mood) {
      case "sleeping":
      case "blink":
        return { scaleY: 0.1, scaleX: 1, borderRadius: "4px" };
      case "wink":
        return { scaleY: 0.1, scaleX: 1, borderRadius: "4px" };
      case "happy":
        return { scaleY: 0.85, scaleX: 1.1, borderRadius: "12px 12px 4px 4px" };
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
        return { scaleY: 1, scaleX: 1, borderRadius: "9px" };
      case "happy":
        return { scaleY: 0.85, scaleX: 1.1, borderRadius: "12px 12px 4px 4px" };
      default:
        return { scaleY: 1, scaleX: 1, borderRadius: "9px" };
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
