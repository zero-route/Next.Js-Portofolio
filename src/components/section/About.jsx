"use client";

import dynamic from "next/dynamic";
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
    type: "bloom",
  },
  {
    title: "Tech Stack",
    description:
      "Working across modern web technologies, backend systems, databases, networking, and development tooling.",
    icon: Layers3,
    type: "pulse",
  },
  {
    title: "Currently Building",
    description:
      "Exploring new ideas around automation, AI, cybersecurity, robotics, and full-stack engineering.",
    icon: Rocket,
    type: "float",
  },
];

function TypingText({ text }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.35,
      }}
      className="about-paragraph"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.015,
            delay: 0.8 + index * 0.012,
            ease: "linear",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#030305] px-5 py-24 text-white sm:px-7 sm:py-32 lg:px-10 lg:py-40 xl:px-14"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/[0.035] blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1550px]">
        <div className="about-main-grid">
          <div className="about-content">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
              }}
              className="overflow-hidden"
            >
              <motion.h2
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 45,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="font-mono text-sm font-medium uppercase tracking-[0.28em] text-purple-300/75 sm:text-base"
              >
                {["Who", "I", "Am"].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mr-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </motion.div>

            <motion.h3
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
              }}
              className="about-name"
            >
              {["Dimas", "Aksa", "Oktapian"].map((word, index) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -45,
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.85,
                        delay: 0.25 + index * 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h3>

            <TypingText text={paragraph} />

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.85,
                delay: 2.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/cv.pdf"
                download
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-purple-300/30 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#c4b5fd] px-5 py-3 font-mono text-[12px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.18)] transition-all duration-300 hover:scale-[1.025] hover:shadow-[0_0_35px_rgba(139,92,246,0.3)]"
              >
                <span className="about-button-shine absolute inset-0" />

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
                className="group flex items-center gap-2 rounded-xl border border-white/[0.13] bg-white/[0.035] px-5 py-3 font-mono text-[12px] font-semibold text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.08)]"
              >
                <Github
                  size={16}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:rotate-[-6deg]"
                />

                <span>GitHub Project</span>
              </a>
            </motion.div>
          </div>

          <div className="about-lanyard">
            <Lanyard
              position={[0, 0, 30]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent
              frontImage={null}
              backImage={null}
              imageFit="cover"
              lanyardImage="/images/lanyard.png"
              lanyardWidth={1}
            />
          </div>
        </div>

        <div className="about-cards">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="about-card group"
              >
                <motion.div
                  initial={
                    card.type === "bloom"
                      ? {
                          opacity: 0,
                          scale: 0.6,
                          filter: "blur(8px)",
                        }
                      : card.type === "pulse"
                        ? {
                            opacity: 0,
                            scale: 0.6,
                          }
                        : {
                            opacity: 0,
                            y: 12,
                          }
                  }
                  whileInView={
                    card.type === "bloom"
                      ? {
                          opacity: [0, 1, 1, 0.8, 1],
                          scale: [0.6, 1.08, 1, 1.04, 1],
                          filter: [
                            "blur(8px)",
                            "blur(0px)",
                            "blur(0px)",
                            "blur(0px)",
                            "blur(0px)",
                          ],
                        }
                      : card.type === "pulse"
                        ? {
                            opacity: 1,
                            scale: [0.6, 1.15, 1, 1.04, 1],
                          }
                        : {
                            opacity: 1,
                            y: [12, -5, 0],
                          }
                  }
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: 1.05,
                    delay: 0.25 + index * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`about-card-icon about-icon-${card.type}`}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.35}
                  />
                </motion.div>

                <div className="relative z-10">
                  <h4 className="font-mono text-sm font-semibold text-white/90">
                    {card.title}
                  </h4>

                  <p className="mt-3 font-mono text-[11px] leading-6 text-white/45 sm:text-xs sm:leading-6">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .about-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          gap: 10px;
        }

        .about-content {
          position: relative;
          z-index: 10;
          max-width: 720px;
        }

        .about-name {
          margin-top: 18px;
          font-family: monospace;
          font-size: clamp(2.6rem, 6vw, 5rem);
          font-weight: 900;
          line-height: 0.98;
          letter-spacing: -0.075em;
          color: #f4f4f5;
        }

        .about-paragraph {
          max-width: 690px;
          margin-top: 30px;
          font-family: monospace;
          font-size: 12px;
          line-height: 2;
          color: rgba(255, 255, 255, 0.48);
        }

        .about-paragraph span {
          white-space: pre-wrap;
        }

        .about-lanyard {
          position: relative;
          z-index: 20;
          min-width: 0;
          pointer-events: auto;
        }

        .about-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 30px;
        }

        .about-card {
          position: relative;
          min-height: 205px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 18px;
          padding: 26px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.018)
            ),
            rgba(8, 8, 13, 0.72);
          box-shadow:
            0 20px 55px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(18px);
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease,
            background 350ms ease;
        }

        .about-card::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(167, 139, 250, 0.32),
            transparent
          );
          opacity: 0;
          transition: opacity 350ms ease;
        }

        .about-card:hover {
          transform: translateY(-4px);
          border-color: rgba(167, 139, 250, 0.25);
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.055),
              rgba(139, 92, 246, 0.025)
            ),
            rgba(8, 8, 13, 0.82);
          box-shadow:
            0 24px 65px rgba(0, 0, 0, 0.3),
            0 0 35px rgba(139, 92, 246, 0.07);
        }

        .about-card:hover::before {
          opacity: 1;
        }

        .about-card-icon {
          position: relative;
          z-index: 10;
          display: flex;
          width: 46px;
          height: 46px;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 13px;
          color: rgba(255, 255, 255, 0.75);
          background: rgba(255, 255, 255, 0.025);
          box-shadow: 0 0 0 rgba(139, 92, 246, 0);
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            color 350ms ease,
            box-shadow 350ms ease;
        }

        .about-card:hover .about-card-icon {
          border-color: rgba(167, 139, 250, 0.28);
          color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.1);
        }

        .about-card:hover .about-icon-bloom {
          transform: scale(1.04);
        }

        .about-card:hover .about-icon-pulse {
          transform: scale(1.06);
        }

        .about-card:hover .about-icon-float {
          transform: translateY(-3px);
        }

        .about-button-shine {
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(255, 255, 255, 0.22) 48%,
            transparent 70%
          );
          transform: translateX(-120%);
          animation: aboutButtonShine 4.5s ease-in-out infinite;
        }

        @keyframes aboutButtonShine {
          0%,
          65%,
          100% {
            transform: translateX(-120%);
          }

          82% {
            transform: translateX(120%);
          }
        }

        @media (min-width: 900px) {
          .about-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(420px, 0.82fr);
            gap: 40px;
          }

          .about-lanyard {
            margin-top: -40px;
          }
        }

        @media (min-width: 1200px) {
          .about-main-grid {
            grid-template-columns: minmax(0, 1fr) minmax(500px, 0.82fr);
            gap: 65px;
          }

          .about-lanyard {
            margin-top: -70px;
          }
        }

        @media (max-width: 899px) {
          .about-lanyard {
            order: 2;
            margin-top: -25px;
          }

          .about-cards {
            margin-top: 10px;
          }
        }

        @media (max-width: 700px) {
          .about-cards {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .about-card {
            min-height: 180px;
          }

          .about-paragraph {
            font-size: 11px;
            line-height: 1.9;
          }
        }
      `}</style>
    </section>
  );
}