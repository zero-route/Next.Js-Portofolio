"use client";

import { useRef, useCallback, useEffect } from "react";
import "./BorderGlow.css";

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 0, s: 0, l: 100 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const BorderGlow = ({
  children,
  className = "",
  glowColor = "0 0 100",
  backgroundColor = "transparent",
  borderRadius = 16,
  glowRadius = 30,
  glowIntensity = 1.2,
  coneSpread = 25,
}) => {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const resetGlow = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("glow-active");
    card.style.setProperty("--edge-proximity", "0");
  }, []);

  const handleUpdate = useCallback((clientX, clientY) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Pastikan posisi berada di dalam / sekitar batas kartu
    if (x < -20 || y < -20 || x > rect.width + 20 || y > rect.height + 20) {
      resetGlow();
      return;
    }

    const angle = getCursorAngle(card, x, y);
    card.classList.add("glow-active");
    card.style.setProperty("--cursor-angle", `${angle.toFixed(2)}deg`);
    card.style.setProperty("--edge-proximity", "100");
  }, [getCursorAngle, resetGlow]);

  const handlePointerMove = useCallback((e) => {
    handleUpdate(e.clientX, e.clientY);
  }, [handleUpdate]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      handleUpdate(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleUpdate]);

  // Pasang listener global untuk memastikan saat sentuhan/klik dilepas, glow pasti mati
  useEffect(() => {
    const handleGlobalEnd = () => resetGlow();
    window.addEventListener("pointerup", handleGlobalEnd);
    window.addEventListener("touchend", handleGlobalEnd);
    window.addEventListener("touchcancel", handleGlobalEnd);

    return () => {
      window.removeEventListener("pointerup", handleGlobalEnd);
      window.removeEventListener("touchend", handleGlobalEnd);
      window.removeEventListener("touchcancel", handleGlobalEnd);
    };
  }, [resetGlow]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetGlow}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetGlow}
      onTouchCancel={resetGlow}
      className={`border-glow-card ${className}`}
      style={{
        "--card-bg": backgroundColor,
        "--border-radius": `${borderRadius}px`,
        "--glow-padding": `${glowRadius}px`,
        "--cone-spread": `${coneSpread}deg`,
        ...glowVars,
      }}
    >
      <div className="border-glow-border" />
      <div className="border-glow-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
};

export default BorderGlow;
