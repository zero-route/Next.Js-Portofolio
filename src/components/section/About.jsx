"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Github,
  Shield,
  Layers3,
  Rocket,
} from "lucide-react";

const Lanyard = dynamic(
  () => import("@/components/reactbits/lanyard/Lanyard"),
  {
    ssr: false,
  }
);

const paragraph =
  "I’m an individual who enjoys building, securing, and exploring technology from different perspectives. My interests span software development, networking, cybersecurity, automation, robotics, and electrical engineering. I enjoy turning ideas into functional systems while continuously learning how things work beneath the surface.";

const cards = [
  {
    title: "Core Focus",
    description:
      "Building reliable, secure, and scalable systems with a strong focus on engineering fundamentals.",
    icon: Shield,
  },
  {
    title: "Tech Stack",
    description:
      "Working across modern web technologies, backend systems, databases, networking, and development tooling.",
    icon: Layers3,
  },
  {
    title: "Currently Building",
    description:
      "Exploring new ideas around automation, AI, cybersecurity, robotics, and full-stack engineering.",
    icon: Rocket,
  },
];

function LazyLanyard() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "800px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(() => setLoaded(true), 60);

    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <div ref={containerRef} className="about-lanyard">
      {visible && (
        <div className={`about-lanyard-inner ${loaded ? "about-lanyard-loaded" : ""}`}>
          <Lanyard
            position={[0, 1.2, 13]}
            gravity={[0, -40, 0]}
            fov={28}
            transparent
            frontImage="/images/profile.png"
            backImage={null}
            imageFit="cover"
            lanyardImage="/images/lanyard.png"
            lanyardWidth={0.9}
          />
        </div>
      )}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about-section ${visible ? "about-visible" : ""}`}
    >
      <div className="about-container">
        <div className="about-eyebrow">
          <span className="about-label">ABOUT</span>
        </div>

        <div className="about-main-grid">
          <div className="about-content">
            <div className="about-heading">
              <h2 className="about-who">
                Who I Am
              </h2>
            </div>

            <h3 className="about-name">
              Dimas Aksa Oktapian
            </h3>

            <motion.p
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={
                visible
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              transition={{
                duration: 1.25,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="about-paragraph"
            >
              {paragraph}
            </motion.p>

            <div className="about-buttons">
              <a
                href="/cv.pdf"
                download
                className="about-cv-button"
              >
                <Download
                  size={16}
                  strokeWidth={1.8}
                />

                <span>
                  Download CV
                </span>
              </a>

              <a
                href="https://github.com/zero-route"
                target="_blank"
                rel="noopener noreferrer"
                className="about-github-button"
              >
                <Github
                  size={16}
                  strokeWidth={1.7}
                />

                <span>
                  GitHub Project
                </span>
              </a>
            </div>
          </div>

          <LazyLanyard />
        </div>

        <div className="about-cards">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="about-card"
                style={{
                  "--card-delay": `${0.75 + index * 0.14}s`,
                }}
              >
                <div className="about-card-icon">
                  <Icon
                    size={23}
                    strokeWidth={1.35}
                  />
                </div>

                <div>
                  <h4>{card.title}</h4>

                  <p>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .about-section {
          position: relative;
          overflow: hidden;
          background: #030305;
          padding: 96px 20px;
          color: white;
          contain: layout paint;
        }

        .about-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1550px;
          margin: 0 auto;
        }

        .about-eyebrow {
          width: 100%;
          text-align: center;
          margin-bottom: 28px;
          opacity: 0;
          transform: translate3d(0, 14px, 0);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-visible .about-eyebrow {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .about-label {
          display: inline-block;
          font-family: monospace;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(167, 139, 250, 0.88);
        }

        .about-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          gap: 0;
        }

        .about-content {
          position: relative;
          z-index: 10;
          max-width: 760px;
        }

        .about-heading {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-visible .about-heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .about-who {
          margin: 0 0 6px;
          font-family: monospace;
          font-size: clamp(1.9rem, 3.4vw, 3rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.88);
        }

        .about-name {
          margin: 0;
          font-family: monospace;
          font-size: clamp(2.8rem, 5.2vw, 4.6rem);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #f4f4f5;
          opacity: 0;
          transform: translate3d(-22px, 0, 0);
          transition:
            opacity 0.9s ease 0.12s,
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.12s;
        }

        .about-visible .about-name {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .about-paragraph {
          max-width: 700px;
          margin: 32px 0 0;
          font-family: monospace;
          font-size: 12px;
          line-height: 1.95;
          color: rgba(255, 255, 255, 0.48);
          will-change: transform, opacity;
        }

        .about-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition:
            opacity 0.8s ease 0.7s,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s;
        }

        .about-visible .about-buttons {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .about-cv-button,
        .about-github-button {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          padding: 12px 20px;
          font-family: monospace;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background 220ms ease,
            color 220ms ease,
            box-shadow 220ms ease;
        }

        .about-cv-button {
          border: 1px solid rgba(196, 181, 253, 0.3);
          background: linear-gradient(
            110deg,
            #6d28d9,
            #8b5cf6,
            #a78bfa
          );
          color: white;
          box-shadow:
            0 0 20px rgba(124, 58, 237, 0.14);
        }

        .about-github-button {
          border: 1px solid rgba(255, 255, 255, 0.11);
          background: rgba(255, 255, 255, 0.025);
          color: rgba(255, 255, 255, 0.7);
        }

        .about-cv-button:hover,
        .about-github-button:hover {
          transform: translate3d(0, -2px, 0);
        }

        .about-cv-button:hover {
          box-shadow:
            0 0 28px rgba(139, 92, 246, 0.22);
        }

        .about-github-button:hover {
          border-color: rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.045);
          color: white;
        }

        .about-lanyard {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 340px;
          aspect-ratio: 3 / 4;
          height: auto;
          min-height: 0;
          margin: 0 auto;
          pointer-events: auto;
        }

        .about-lanyard-inner {
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: scale(0.96);
          transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-lanyard-loaded {
          opacity: 1;
          transform: scale(1);
        }

        .about-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 36px;
        }

        .about-card {
          position: relative;
          min-height: 190px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.018);
          opacity: 0;
          transform: translate3d(0, 24px, 0);
          animation: aboutCardReveal 0.8s
            cubic-bezier(0.22, 1, 0.36, 1)
            var(--card-delay)
            forwards;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background 220ms ease;
        }

        .about-visible .about-card {
          animation-play-state: running;
        }

        .about-card:hover {
          transform: translate3d(0, -3px, 0);
          border-color: rgba(167, 139, 250, 0.2);
          background: rgba(255, 255, 255, 0.028);
        }

        .about-card-icon {
          display: flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.02);
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            color 220ms ease;
        }

        .about-card:hover .about-card-icon {
          transform: translate3d(0, -2px, 0);
          border-color: rgba(167, 139, 250, 0.22);
          color: rgba(255, 255, 255, 0.92);
        }

        .about-card h4 {
          margin: 0;
          font-family: monospace;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.88);
        }

        .about-card p {
          margin: 11px 0 0;
          font-family: monospace;
          font-size: 11px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.4);
        }

        @keyframes aboutCardReveal {
          from {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (min-width: 900px) {
          .about-section {
            padding: 128px 40px;
          }

          .about-main-grid {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(500px, 0.95fr);
            gap: 35px;
          }

          .about-lanyard {
            max-width: 360px;
            aspect-ratio: 3 / 4.4;
            margin: 0 0 0 auto;
            margin-top: -30px;
          }
        }

        @media (min-width: 1200px) {
          .about-section {
            padding: 160px 56px;
          }

          .about-main-grid {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(580px, 0.95fr);
            gap: 60px;
          }

          .about-lanyard {
            max-width: 400px;
            aspect-ratio: 3 / 4.4;
            margin: 0 0 0 auto;
            margin-top: -40px;
          }
        }

        @media (max-width: 899px) {
          .about-lanyard {
            order: 2;
            max-width: 340px;
            aspect-ratio: 3 / 4;
            margin: 0 auto;
          }

          .about-cards {
            margin-top: 28px;
          }
        }

        @media (max-width: 700px) {
          .about-section {
            padding: 88px 20px;
          }

          .about-eyebrow {
            margin-bottom: 20px;
          }

          .about-label {
            font-size: 15px;
            letter-spacing: 0.34em;
          }

          .about-who {
            font-size: clamp(1.6rem, 6.5vw, 2.1rem);
          }

          .about-name {
            margin-top: 8px;
            font-size: clamp(2.3rem, 8.5vw, 3.2rem);
          }

          .about-paragraph {
            margin-top: 38px;
            font-size: 11px;
            line-height: 1.85;
          }

          .about-buttons {
            margin-top: 28px;
          }

          .about-cv-button,
          .about-github-button {
            padding: 11px 17px;
            font-size: 11px;
          }

          .about-lanyard {
            max-width: 260px;
            aspect-ratio: 3 / 4;
            margin: -5px auto 0;
          }

          .about-cards {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 24px;
          }

          .about-card {
            min-height: 165px;
            padding: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-heading,
          .about-name,
          .about-buttons,
          .about-card,
          .about-eyebrow,
          .about-lanyard-inner {
            animation: none;
            transition: none;
            transform: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
