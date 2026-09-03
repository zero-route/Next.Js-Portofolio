"use client";

import { useEffect, useRef, useState } from "react";

export default function RobotEyes() {
  const [mood, setMood] = useState("normal");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: -5 });
  const idleTimerRef = useRef(null);
  const actionTimerRef = useRef(null);

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (mood === "sleeping") setMood("normal");

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const offsetX = ((clientX - windowWidth / 2) / (windowWidth / 2)) * 6;
      const offsetY = ((clientY - windowHeight / 2) / (windowHeight / 2)) * 6;

      setEyeOffset({ x: offsetX, y: offsetY });

      idleTimerRef.current = setTimeout(() => {
        setMood("sleeping");
        setEyeOffset({ x: 0, y: 0 });
      }, 5000);
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [mood]);

  useEffect(() => {
    const moodsList = ["blink", "wink", "confused", "happy", "lookAround"];

    const triggerRandomAction = () => {
      const randomInterval = Math.random() * 3000 + 2000;

      actionTimerRef.current = setTimeout(() => {
        if (mood !== "sleeping") {
          const selectedMood = moodsList[Math.floor(Math.random() * moodsList.length)];
          setMood(selectedMood);

          if (selectedMood === "lookAround") {
            setEyeOffset({ x: Math.random() > 0.5 ? 5 : -5, y: -3 });
          }

          setTimeout(() => {
            setMood("normal");
            setEyeOffset({ x: 0, y: -5 });
            triggerRandomAction();
          }, 1200);
        } else {
          triggerRandomAction();
        }
      }, randomInterval);
    };

    triggerRandomAction();

    return () => {
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    };
  }, [mood]);

  return (
    <div
      onClick={() => {
        setMood("happy");
        setTimeout(() => {
          setMood("normal");
          setEyeOffset({ x: 0, y: -5 });
        }, 1500);
      }}
      className="relative flex h-10 items-center justify-center cursor-pointer select-none px-2"
      title="Cute AI Robot"
    >
      {mood === "sleeping" && (
        <div className="absolute -left-3 -top-2 flex items-center gap-[2px] animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60 text-[8px] font-bold text-white flex items-center justify-center">z</span>
          <span className="h-2 w-2 rounded-full bg-white/80 text-[9px] font-bold text-white flex items-center justify-center">Z</span>
          <span className="h-2.5 w-2.5 rounded-full bg-white text-[10px] font-bold text-white flex items-center justify-center">Z</span>
        </div>
      )}

      <div className="relative flex items-center justify-between gap-3">
        <div
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          }}
          className="transition-all duration-150 ease-out flex items-center justify-center"
        >
          {mood === "blink" || mood === "sleeping" ? (
            <div className="h-[3px] w-5 rounded-full bg-white" />
          ) : mood === "happy" ? (
            <div className="h-3 w-5 rounded-t-full border-t-2 border-x-2 border-white" />
          ) : mood === "confused" ? (
            <div className="h-2 w-5 rounded-[6px] bg-white" />
          ) : (
            <div className="h-5 w-5 rounded-[10px] bg-white" />
          )}
        </div>

        <div
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          }}
          className="transition-all duration-150 ease-out flex items-center justify-center"
        >
          {mood === "blink" || mood === "wink" || mood === "sleeping" ? (
            <div className="h-[3px] w-5 rounded-full bg-white" />
          ) : mood === "happy" ? (
            <div className="h-3 w-5 rounded-t-full border-t-2 border-x-2 border-white" />
          ) : mood === "confused" ? (
            <div className="h-5 w-5 rounded-[10px] bg-white" />
          ) : (
            <div className="h-5 w-5 rounded-[10px] bg-white" />
          )}
        </div>
      </div>
    </div>
  );
}
