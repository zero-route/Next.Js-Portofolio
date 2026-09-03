"use client";

import { useEffect, useRef, useState } from "react";

export default function RobotEyes() {
  const [mood, setMood] = useState("normal");
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const idleTimerRef = useRef(null);
  const blinkTimerRef = useRef(null);

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
      }, 6000);
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
    const scheduleBlink = () => {
      const randomInterval = Math.random() * 4000 + 2000;

      blinkTimerRef.current = setTimeout(() => {
        if (mood === "normal") {
          setMood("blinking");
          setTimeout(() => {
            setMood("normal");
            scheduleBlink();
          }, 150);
        } else {
          scheduleBlink();
        }
      }, randomInterval);
    };

    scheduleBlink();

    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
    };
  }, [mood]);

  return (
    <div
      onClick={() => {
        setMood("happy");
        setTimeout(() => setMood("normal"), 1500);
      }}
      className="relative flex h-10 w-20 cursor-pointer items-center justify-center rounded-2xl border border-cyan-500/30 bg-black/80 px-2 shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(6,182,212,0.3)]"
      title="Cute AI Robot"
    >
      {mood === "sleeping" && (
        <div className="absolute -left-2 -top-3 flex items-center gap-[2px] animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60 text-[8px] font-bold text-cyan-300 flex items-center justify-center">z</span>
          <span className="h-2 w-2 rounded-full bg-cyan-400/80 text-[9px] font-bold text-cyan-300 flex items-center justify-center">Z</span>
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 text-[10px] font-bold text-cyan-200 flex items-center justify-center">Z</span>
        </div>
      )}

      <div className="relative flex items-center justify-between gap-2.5">
        <div
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          }}
          className="transition-transform duration-75 ease-out"
        >
          {mood === "blinking" || mood === "sleeping" ? (
            <div className="h-[2px] w-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          ) : mood === "happy" ? (
            <div className="h-3.5 w-3.5 rounded-t-full border-t-2 border-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          ) : (
            <div className="h-4 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          )}
        </div>

        <div
          style={{
            transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
          }}
          className="transition-transform duration-75 ease-out"
        >
          {mood === "blinking" || mood === "sleeping" ? (
            <div className="h-[2px] w-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          ) : mood === "happy" ? (
            <div className="h-3.5 w-3.5 rounded-t-full border-t-2 border-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          ) : (
            <div className="h-4 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          )}
        </div>
      </div>
    </div>
  );
}
