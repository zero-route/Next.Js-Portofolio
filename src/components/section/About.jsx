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
        rootMargin: "500px 0px",
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="about-lanyard">
      {visible && (
        <Lanyard
          position={[0, 0, 30]}
          gravity={[0, -40, 0]}
          fov={20}
          transparent
          frontImage="/images/profile.png"
          backImage={null}
          imageFit="cover"
          lanyardImage="/images/lanyard.png"
  lanyardWidth={0.8}
/>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#030305] px-5 py-24 text-white sm:px-7 sm:py-32 lg:px-10 lg:py-40 xl:px-14"
    >
      <div className="about-background-glow" />

      <div className="relative z-10 mx-auto w-full max-w-[1550px]">
        <div className="about-main-grid">
          <div className="about-content">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="about-label">
                ABOUT
              </span>

              <h2 className="about-who">
                Who I Am
              </h2>
            </motion.div>

            <motion.h3
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="about-name"
            >
              Dimas Aksa Oktapian
            </motion.h3>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="about-paragraph"
            >
              {paragraph}
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.65,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/cv.pdf"
                download
                className="about-cv-button group relative flex items-center gap-2 overflow-hidden rounded-xl border border-purple-300/30 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#c4b5fd] px-5 py-3 font-mono text-[12px] font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.14)] transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="about-button-shine" />

                <Download
                  size={16}
                  strokeWidth={1.8}
                  className="relative"
                />

                <span className="relative">
                  Download CV
                </span>
              </a>

              <a
                href="https://github.com/zero-route"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-white/[0.11] bg-white/[0.025] px-5 py-3 font-mono text-[12px] font-semibold text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.045] hover:text-white"
              >
                <Github
                  size={16}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:rotate-[-5deg]"
                />

                <span>
                  GitHub Project
                </span>
              </a>
            </motion.div>
          </div>

          <LazyLanyard />
        </div>

        <div className="about-cards">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="about-card group"
              >
                <div className="about-card-icon">
                  <Icon
                    size={23}
                    strokeWidth={1.35}
                  />
                </div>

                <div>
                  <h4>
                    {card.title}
                  </h4>

                  <p>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .about-background-glow {
          position: absolute;
          left: 50%;
          top: 35%;
          width: 360px;
          height: 360px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          background: rgba(124, 58, 237, 0.025);
          filter: blur(90px);
          pointer-events: none;
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
          max-width: 720px;
        }

        .about-label {
          display: block;
          margin-bottom: 12px;
          font-family: monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(167, 139, 250, 0.72);
        }

        .about-who {
          margin: 0;
          font-family: monospace;
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.05em;
          color: rgba(255, 255, 255, 0.88);
        }

        .about-name {
          margin-top: 20px;
          font-family: monospace;
          font-size: clamp(3.2rem, 6.5vw, 5.8rem);
          font-weight: 800;
          line-height: 0.96;
          letter-spacing: -0.065em;
          color: #f4f4f5;
        }

        .about-paragraph {
          max-width: 690px;
          margin-top: 30px;
          font-family: monospace;
          font-size: 12px;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.46);
        }

        .about-lanyard {
          position: relative;
          z-index: 20;
          width: 100%;
          min-width: 0;
          min-height: 430px;
          pointer-events: auto;
        }

        .about-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 40px;
        }

        .about-card {
          position: relative;
          min-height: 195px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.018);
          transition:
            transform 280ms ease,
            border-color 280ms ease,
            background 280ms ease;
        }

        .about-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          background: rgba(167, 139, 250, 0.28);
          opacity: 0;
          transition: opacity 280ms ease;
        }

        .about-card:hover {
          transform: translateY(-3px);
          border-color: rgba(167, 139, 250, 0.2);
          background: rgba(255, 255, 255, 0.028);
        }

        .about-card:hover::before {
          opacity: 1;
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
            transform 280ms ease,
            color 280ms ease,
            border-color 280ms ease;
        }

        .about-card:hover .about-card-icon {
          transform: translateY(-2px);
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
          margin-top: 11px;
          font-family: monospace;
          font-size: 11px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.4);
        }

        .about-cv-button {
          isolation: isolate;
        }

        .about-button-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 35%,
            rgba(255, 255, 255, 0.18) 50%,
            transparent 65%
          );
          transform: translateX(-130%);
          animation: aboutButtonShine 5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes aboutButtonShine {
          0%,
          70%,
          100% {
            transform: translateX(-130%);
          }

          84% {
            transform: translateX(130%);
          }
        }

        @media (min-width: 900px) {
          .about-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(420px, 0.82fr);
            gap: 35px;
          }

          .about-lanyard {
            min-height: 500px;
            margin-top: -35px;
          }
        }

        @media (min-width: 1200px) {
          .about-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(500px, 0.82fr);
            gap: 60px;
          }

          .about-lanyard {
            min-height: 560px;
            margin-top: -60px;
          }
        }

        @media (max-width: 899px) {
          .about-lanyard {
            order: 2;
            min-height: 420px;
            margin-top: -10px;
          }

          .about-cards {
            margin-top: 20px;
          }
        }

        @media (max-width: 700px) {
          .about-name {
            font-size: clamp(2.8rem, 11vw, 4rem);
          }

          .about-paragraph {
            font-size: 11px;
            line-height: 1.85;
          }

          .about-cards {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .about-card {
            min-height: 165px;
            padding: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-button-shine {
            animation: none;
          }

          .about-card,
          .about-card-icon,
          .about-cv-button {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}