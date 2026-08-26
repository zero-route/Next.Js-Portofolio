"use client";

import { useEffect, useState } from "react";

/**
 * Efek mengetik loop bolak-balik antar beberapa teks.
 * Pengganti createTypingEffect() di script.js lama.
 */
export function useLoopTypingEffect(
  textList: string[],
  options?: { startDelay?: number; withQuotes?: boolean; start?: boolean }
) {
  const { startDelay = 0, withQuotes = true, start = true } = options || {};
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!start || textList.length === 0) return;

    let textIndex = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const raw = textList[textIndex];
      const currentText = withQuotes ? `"${raw}"` : raw;

      charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
      setDisplay(currentText.substring(0, charIdx));

      let speed = isDeleting ? 50 : 90;

      if (!isDeleting && charIdx === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textList.length;
        speed = 400;
      }

      timeoutId = setTimeout(tick, speed);
    }

    const startId = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return display;
}

/**
 * Efek mengetik satu kali dari satu string panjang.
 * Pengganti typeOnce() untuk about-desc.
 */
export function useOnceTypingEffect(
  text: string,
  options?: { speed?: number; startDelay?: number; start?: boolean }
) {
  const { speed = 15, startDelay = 0, start = false } = options || {};
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function step() {
      if (i < text.length) {
        i++;
        setDisplay(text.slice(0, i));
        timeoutId = setTimeout(step, speed);
      } else {
        setDone(true);
      }
    }

    const startId = setTimeout(step, startDelay);
    return () => {
      clearTimeout(startId);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return { display, done };
}
