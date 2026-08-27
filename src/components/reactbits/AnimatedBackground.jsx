"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedBackground
 * Deep-space nebula: soft drifting navy-blue cloud blobs blended into
 * black, plus twinkling + drifting stars on top.
 *
 * Note: earlier version used ctx.filter = "blur(...)" recomputed every
 * frame, which is very expensive on mobile GPUs and made the whole
 * canvas appear frozen. This version bakes the softness into the
 * radial gradient stops instead, so it animates smoothly every frame.
 */
export default function AnimatedBackground({
  className = "",
  starCount = 180,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // --- Nebula clouds: large soft blobs that drift + pulse ---
    const NEBULA_COLORS = [
      "30, 41, 90",   // deep navy
      "23, 30, 70",   // near-black navy
      "40, 55, 120",  // slightly brighter navy accent
    ];
    const clouds = Array.from({ length: 7 }, () => createCloud(width, height));

    function createCloud(w, h) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * (Math.max(w, h) * 0.35) + Math.max(w, h) * 0.22,
        vx: (Math.random() - 0.5) * 0.35, // visible drift
        vy: (Math.random() - 0.5) * 0.35,
        color: NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)],
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.006 + 0.002,
        baseAlpha: Math.random() * 0.3 + 0.3,
      };
    }

    // --- Stars ---
    const stars = Array.from({ length: starCount }, () => createStar(width, height));

    function createStar(w, h) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.25, // visible drift
        vy: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        baseAlpha: Math.random() * 0.5 + 0.35,
        tint: Math.random() > 0.8 ? "160, 190, 255" : "255, 255, 255",
      };
    }

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // nebula clouds — softness baked into gradient stops, no per-frame blur
      for (const cloud of clouds) {
        cloud.phase += cloud.pulseSpeed;
        const pulse = (Math.sin(cloud.phase) + 1) / 2;
        const alpha = cloud.baseAlpha * (0.6 + pulse * 0.4);

        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;

        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        gradient.addColorStop(0, `rgba(${cloud.color}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${cloud.color}, ${alpha * 0.6})`);
        gradient.addColorStop(0.75, `rgba(${cloud.color}, ${alpha * 0.2})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // stars twinkling + drifting on top
      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.phase) + 1) / 2;
        const alpha = star.baseAlpha * (0.4 + twinkle * 0.6);

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.tint}, ${alpha})`;
        ctx.fill();

        if (star.radius > 1.1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.tint}, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", background: "#000" }}
    />
  );
}
