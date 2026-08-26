"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pengganti pola `.reveal` + IntersectionObserver di script.js lama.
 * Pasang ref ke elemen, dan `isVisible` akan jadi true begitu elemen
 * masuk viewport (sekali saja, lalu observer di-unobserve).
 */
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
