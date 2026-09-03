"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RobotEyes() {
  const [mood, setMood] = useState("normal");
  const [isSleeping, setIsSleeping] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: -4 });

  const idleTimerRef = useRef(null);
  const blinkTimerRef = useRef(null);
  const actionTimerRef = useRef(null);

  const wakeUp = useCallback(() => {
    setIsSleeping(false);
    setMood("normal");

    if (actionTimerRef.current) {
      clearTimeout(actionTimerRef.current);
      actionTimerRef.current = null;
    }

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      setIsSleeping(true);
      setMood("sleeping");
      setEyeOffset({ x: 0, y: -2 });
    }, 10000);
  }, []);

  const handleUserPointer = useCallback(
    (clientX, clientY, isClick = false) => {
      wakeUp();

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const offsetX =
        ((clientX - windowWidth / 2) / (windowWidth / 2)) * 8;

      const offsetY =
        ((clientY - windowHeight / 2) / (windowHeight / 2)) * 8 - 3;

      setEyeOffset({
        x: offsetX,
        y: offsetY,
      });

      if (isClick) {
        if (actionTimerRef.current) {
          clearTimeout(actionTimerRef.current);
        }

        setMood("happy");

        actionTimerRef.current = setTimeout(() => {
          setMood("normal");
        }, 1200);
      }
    },
    [wakeUp]
  );

  useEffect(() => {
    const onPointerMove = (e) => {
      handleUserPointer(e.clientX, e.clientY);
    };

    const onPointerDown = (e) => {
      handleUserPointer(e.clientX, e.clientY, true);
    };

    const onTouchMove = (e) => {
      if (e.touches[0]) {
        handleUserPointer(
          e.touches[0].clientX,
          e.touches[0].clientY
        );
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("touchmove", onTouchMove);

    idleTimerRef.current = setTimeout(() => {
      setIsSleeping(true);
      setMood("sleeping");
      setEyeOffset({ x: 0, y: -2 });
    }, 10000);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }

      if (actionTimerRef.current) {
        clearTimeout(actionTimerRef.current);
      }
    };
  }, [handleUserPointer]);

  useEffect(() => {
    const loopAnimations = () => {
      const nextInterval = Math.random() * 3000 + 2500;

      blinkTimerRef.current = setTimeout(() => {
        if (!isSleeping) {
          const rand = Math.random();

          let nextMood = "blink";
          let duration = 700;

          if (rand > 0.8) {
            nextMood = "wink";
            duration = 1000;
          } else if (rand > 0.55) {
            nextMood = "happy";
            duration = 1300;
          } else if (rand > 0.3) {
            nextMood = "theRock";
            duration = 1300;
          }

          setMood(nextMood);

          if (actionTimerRef.current) {
            clearTimeout(actionTimerRef.current);
          }

          actionTimerRef.current = setTimeout(() => {
            setMood("normal");
          }, duration);
        }

        loopAnimations();
      }, nextInterval);
    };

    loopAnimations();

    return () => {
      if (blinkTimerRef.current) {
        clearTimeout(blinkTimerRef.current);
      }
    };
  }, [isSleeping]);

  const currentMood = isSleeping ? "sleeping" : mood;

  const getLeftEyeVariants = () => {
    switch (currentMood) {
      case "sleeping":
      case "blink":
        return {
          scaleY: 0.1,
          scaleX: 1,
          y: 0,
          borderRadius: "4px",
        };

      case "wink":
        return {
          scaleY: 0.1,
          scaleX: 1,
          y: 0,
          borderRadius: "4px",
        };

      case "happy":
        return {
          scaleY: 0.65,
          scaleX: 1.15,
          y: -2,
          borderRadius: "12px 12px 2px 2px",
        };

      case "theRock":
        return {
          scaleY: 1.3,
          scaleX: 1.05,
          y: -5,
          borderRadius: "9px",
        };

      default:
        return {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          borderRadius: "9px",
        };
    }
  };

  const getRightEyeVariants = () => {
    switch (currentMood) {
      case "sleeping":
      case "blink":
        return {
          scaleY: 0.1,
          scaleX: 1,
          y: 0,
          borderRadius: "4px",
        };

      case "wink":
        return {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          borderRadius: "9px",
        };

      case "happy":
        return {
          scaleY: 0.65,
          scaleX: 1.15,
          y: -2,
          borderRadius: "12px 12px 2px 2px",
        };

      case "theRock":
        return {
          scaleY: 0.4,
          scaleX: 1,
          y: 2,
          borderRadius: "6px",
        };

      default:
        return {
          scaleY: 1,
          scaleX: 1,
          y: 0,
          borderRadius: "9px",
        };
    }
  };

  return (
    <div
      className="relative flex h-10 w-16 items-center justify-center cursor-pointer select-none"
      title="Robot Assistant"
    >
      <AnimatePresence>
        {isSleeping && (
          <div className="absolute -top-3 left-1 pointer-events-none">
            <motion.span
              initial={{
                opacity: 0,
                x: 0,
                y: 5,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, 2, 4, 6],
                y: [5, 0, -5, -10],
                scale: [0.5, 0.8, 1, 0.9],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.15, 0.65, 1],
              }}
              className="absolute text-[10px] font-extrabold text-white"
            >
              z
            </motion.span>

            <motion.span
              initial={{
                opacity: 0,
                x: 8,
                y: 5,
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 0, 1, 1, 0],
                x: [8, 8, 10, 13, 16],
                y: [5, 5, -2, -8, -14],
                scale: [0.5, 0.5, 0.8, 1, 0.9],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                times: [0, 0.25, 0.4, 0.75, 1],
              }}
              className="absolute text-[14px] font-extrabold text-white"
            >
              Z
            </motion.span>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          x: eyeOffset.x,
          y: eyeOffset.y,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 35,
          mass: 0.3,
        }}
        className="flex items-center justify-center gap-[7px]"
      >
        <motion.div
          animate={getLeftEyeVariants()}
          transition={{
            type: "tween",
            duration: 0.18,
            ease: "easeOut",
          }}
          className="w-[18px] h-[22px] bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
        />

        <motion.div
          animate={getRightEyeVariants()}
          transition={{
            type: "tween",
            duration: 0.18,
            ease: "easeOut",
          }}
          className="w-[18px] h-[22px] bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </div>
  );
}