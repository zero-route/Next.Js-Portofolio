"use client";

import { useEffect, useRef } from "react";


export default function AnimatedBackground({
  className = "",
  starCount = 220,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const stars = Array.from({ length: starCount }, () => createStar(width, height));

    function createStar(w, h) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.4 + 0.3,
        
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,

        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        baseAlpha: Math.random() * 0.5 + 0.4,

        tint: Math.random() > 0.75 ? "160, 200, 255" : "255, 255, 255",
      };
    }

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);


      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, "#0a1230");
      gradient.addColorStop(1, "#000005");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.phase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.phase) + 1) / 2; // 0 -> 1
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


        if (star.radius > 1.2) {
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
