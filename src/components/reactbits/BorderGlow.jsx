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
  edgeSensitivity = 0,
  glowColor = "0 0 100", // Putih terang
  backgroundColor = "transparent",
  borderRadius = 16,
  glowRadius = 30,
  glowIntensity = 1.2,
  coneSpread = 25,
  animated = false,
}) => {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

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

  const handleUpdate = useCallback((clientX, clientY) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const edge = getEdgeProximity(card, x, y);
    const angle = getCursorAngle(card, x, y);

    card.classList.add("glow-active");
    card.style.setProperty("--edge-proximity", `${Math.max(edge * 100, 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  const handlePointerMove = useCallback((e) => {
    handleUpdate(e.clientX, e.clientY);
  }, [handleUpdate]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      handleUpdate(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleUpdate]);

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("glow-active");
    card.style.setProperty("--edge-proximity", "0");
  }, []);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerUp={handleLeave}
      onPointerLeave={handleLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
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
