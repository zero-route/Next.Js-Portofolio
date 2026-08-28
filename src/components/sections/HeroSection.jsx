"use client";

import { useEffect, useState } from "react";

const PROJECT_URL = "/portfolio";
const CONTACT_EMAIL = "youremail@example.com";

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/yourusername" },
  { name: "GitLab", href: "https://gitlab.com/yourusername" },
  { name: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
  { name: "Telegram", href: "https://t.me/yourusername" },
  { name: "Instagram", href: "https://instagram.com/yourusername" },
  { name: "TikTok", href: "https://tiktok.com/@yourusername" },
];

const ICONS = {
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  ),
  GitLab: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 21.5 15.6 10.4H8.4L12 21.5Z" />
      <path d="M12 21.5 8.4 10.4H3.6L12 21.5Z" />
      <path d="M12 21.5 15.6 10.4H20.4L12 21.5Z" />
      <path d="M3.6 10.4 2.2 14.6c-.13.4.01.85.36 1.1l9.44 6.86-8.4-12.16Z" />
      <path d="M20.4 10.4 21.8 14.6c.13.4-.01.85-.36 1.1l-9.44 6.86 8.4-12.16Z" />
      <path d="m8.4 10.4-1.9-5.9c-.16-.5-.87-.5-1.03 0L3.6 10.4h4.8Z" />
      <path d="m15.6 10.4 1.9-5.9c.16-.5.87-.5 1.03 0l1.87 5.9h-4.8Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z" />
      <path d="M20.5 20.5v-6.6c0-3.15-1.68-4.62-3.92-4.62-1.81 0-2.62 1-3.07 1.7v-1.46h-3.38c.05 1 0 12 0 12h3.38v-6.7c0-.36.03-.72.13-.98.29-.72.95-1.47 2.06-1.47 1.45 0 2.03 1.1 2.03 2.72v6.43h3.77Z" />
    </svg>
  ),
  Telegram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M21.5 3.5 2.5 10.9c-.9.36-.9 1.65.01 1.99l4.6 1.62 1.78 5.7c.24.76 1.2.99 1.76.42l2.47-2.55 4.6 3.4c.75.55 1.83.15 2.03-.76l3.28-15.4c.22-1.03-.79-1.85-1.53-1.82Zm-4.1 3.9-8.9 8.1-.3 3.35-1.4-4.5 10.6-6.95Z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M14.5 2h2.9c.18 1.62 1.02 3.05 2.33 3.97a5.7 5.7 0 0 0 2.77 1.02v2.94a8.5 8.5 0 0 1-4.9-1.56v7.4a6.6 6.6 0 1 1-6.6-6.6c.24 0 .48.01.71.04v3.02a3.6 3.6 0 1 0 2.79 3.5V2Z" />
    </svg>
  ),
};

function computeWordGradients(phrase, words) {
  let cursor = 0;
  return words.map((word) => {
    const start = phrase.indexOf(word, cursor);
    const end = start + word.length;
    cursor = end;
    const wordChars = word.length;
    const bgSizePercent = (phrase.length / wordChars) * 100;
    const bgPositionPercent = -(start / wordChars) * 100;
    return { word, bgSizePercent, bgPositionPercent };
  });
}

export default function HeroSection() {
  const paragraph =
    "Specializing in software engineering, penetration testing, and network architecture. I build high-performance systems powered by clean code, fortified against cyber threats, and built on reliable infrastructure";

  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const LINE1_DELAY = 0;
  const LINE1_DURATION = 800;
  const LINE2_DELAY = 300;
  const LINE2_DURATION = 800;
  const IMAGE_DELAY = 500;
  const PARAGRAPH_START_DELAY = LINE2_DELAY + LINE2_DURATION + 200;
  const TYPE_SPEED_MS = 18;
  const CONTAINERS_DELAY = PARAGRAPH_START_DELAY + paragraph.length * TYPE_SPEED_MS + 300;
  const ICON_STEP_MS = 150;
  const ICONS_START_DELAY = CONTAINERS_DELAY + 500;

  useEffect(() => {
    let charIndex = 0;
    let intervalId;

    const startTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setTypedText(paragraph.slice(0, charIndex));
        if (charIndex >= paragraph.length) {
          clearInterval(intervalId);
          setTypingDone(true);
        }
      }, TYPE_SPEED_MS);
    }, PARAGRAPH_START_DELAY);

    return () => {
      clearTimeout(startTimeoutId);
      clearInterval(intervalId);
    };
  }, [paragraph, PARAGRAPH_START_DELAY]);

  const titleLine2Phrase = "Engineering Digital Experiences";
  const titleLine2Words = ["Engineering", "Digital", "Experiences"];
  const gradients = computeWordGradients(titleLine2Phrase, titleLine2Words);

  return (
    <section className="relative w-full min-h-screen flex items-center px-6 sm:px-12 py-24 text-white overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto items-center">
        <div>
          <h1 className="font-bold leading-tight text-3xl sm:text-5xl">
            <span
              className="hero-reveal hero-reveal--from-right block"
              style={{ animationDelay: `${LINE1_DELAY}ms`, animationDuration: `${LINE1_DURATION}ms` }}
            >
              Building, Securing, &amp;
            </span>
            <span
              className="hero-reveal hero-reveal--from-left block mt-1"
              style={{ animationDelay: `${LINE2_DELAY}ms`, animationDuration: `${LINE2_DURATION}ms` }}
            >
              {gradients.map((g) => (
                <span
                  key={g.word}
                  className="mr-2"
                  style={{
                    backgroundImage: "linear-gradient(to right, #1d4ed8, #ffffff)",
                    backgroundSize: `${g.bgSizePercent}% 100%`,
                    backgroundPositionX: `${g.bgPositionPercent}%`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {g.word}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-6 text-white/80 text-sm sm:text-base leading-relaxed min-h-[6.5rem]">
            {typedText}
            {!typingDone && <span className="typing-cursor" />}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={PROJECT_URL}
              className="hero-reveal hero-reveal--up inline-flex items-center gap-2 rounded-full bg-space-blue px-6 py-3 font-semibold text-white hover:brightness-110 transition"
              style={{ animationDelay: `${CONTAINERS_DELAY}ms` }}
            >
              View Projects
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hero-reveal hero-reveal--up inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              style={{ animationDelay: `${CONTAINERS_DELAY + 100}ms` }}
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {SOCIALS.map((social, i) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hero-reveal hero-reveal--up flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition"
                style={{ animationDelay: `${ICONS_START_DELAY + i * ICON_STEP_MS}ms` }}
              >
                {ICONS[social.name]}
              </a>
            ))}
          </div>
        </div>

        <div
          className="hero-reveal hero-reveal--scale relative"
          style={{ animationDelay: `${IMAGE_DELAY}ms` }}
        >
          <img
            src="/images/spotify-preview.png"
            alt="Daily Rotation"
            className="w-full rounded-2xl border border-white/10"
          />
        </div>
      </div>

      <style jsx>{`
        .hero-reveal {
          opacity: 0;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }
        .hero-reveal--from-right {
          animation-name: fromRight;
        }
        .hero-reveal--from-left {
          animation-name: fromLeft;
        }
        .hero-reveal--up {
          animation-name: fromBottom;
          animation-duration: 0.8s;
        }
        .hero-reveal--scale {
          animation-name: scaleIn;
          animation-duration: 0.8s;
        }
        @keyframes fromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fromBottom {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: white;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.9s steps(1) infinite;
        }
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
