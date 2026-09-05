"use client";

import { Download, Github, Shield, Layers3, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const paragraph =
  "I build secure, scalable, and modern digital systems by combining software engineering, infrastructure, automation, networking, and security into one technical workflow.";

const focusItems = [
  {
    title: "Core Focus",
    description:
      "Security, infrastructure, automation, and reliable software systems.",
    icon: Shield,
    type: "shield",
  },
  {
    title: "Tech Stack",
    description:
      "Modern web technologies, backend systems, databases, networking, and development tools.",
    icon: Layers3,
    type: "stack",
  },
  {
    title: "Currently Building",
    description:
      "Projects that connect software, security, automation, robotics, and real-world systems.",
    icon: Rocket,
    type: "rocket",
  },
];

function useTypingText(text, speed = 22) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return visibleText;
}

export default function About() {
  const typedParagraph = useTypingText(paragraph, 18);

  const headingWords = ["Who", "I", "Am"];
  const nameWords = ["Dimas", "Aksa", "Oktapian"];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-visible bg-[#030305] px-5 py-28 text-white sm:px-7 sm:py-36 lg:px-10 lg:py-40 xl:px-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.04]" />

      <div className="relative z-10 mx-auto w-full max-w-[1550px]">
        <div className="about-layout">
          <div className="relative z-20 max-w-[720px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="mb-4 flex flex-wrap gap-x-2"
            >
              {headingWords.map((word, index) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 28,
                      filter: "blur(8px)",
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: {
                        delay: index * 0.14,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="font-mono text-sm font-medium tracking-[0.12em] text-purple-300/70 sm:text-base"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="mb-7 flex flex-wrap gap-x-4 gap-y-1"
            >
              {nameWords.map((word, index) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -45,
                      filter: "blur(8px)",
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: {
                        delay: index * 0.22,
                        duration: 0.85,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="font-mono text-[2.35rem] font-black tracking-[-0.07em] text-white sm:text-[3.5rem] lg:text-[4.15rem] xl:text-[4.65rem]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                filter: "blur(7px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[680px]"
            >
              <p className="font-mono text-[12px] leading-6 text-white/50 sm:text-[13px] sm:leading-7 lg:text-[14px]">
                {typedParagraph}
                <span className="ml-1 inline-block h-[14px] w-px animate-pulse bg-purple-300/80 align-middle" />
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/cv.pdf"
                download
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-purple-300/30 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#c4b5fd] px-5 py-3 font-mono text-[11px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(139,92,246,0.3)]"
              >
                <span className="about-button-shine absolute inset-0" />
                <Download
                  size={15}
                  strokeWidth={1.8}
                  className="relative transition-transform duration-300 group-hover:translate-y-0.5"
                />
                <span className="relative">Download CV</span>
              </a>

              <a
                href="https://github.com/zero-route"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.035] px-5 py-3 font-mono text-[11px] font-semibold text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/30 hover:bg-purple-500/[0.06] hover:text-white"
              >
                <Github
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:rotate-6"
                />
                GitHub Project
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: -45,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lanyard-layer"
          >
            <div className="h-full w-full" />
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-28">
          {focusItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 35,
                  filter: "blur(7px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="about-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl"
              >
                <div
                  className={`about-icon about-icon-${item.type} mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-white/60`}
                >
                  <Icon size={20} strokeWidth={1.6} />
                </div>

                <h3 className="font-mono text-sm font-semibold text-white/90">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[340px] font-mono text-[11px] leading-6 text-white/35">
                  {item.description}
                </p>

                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-500/[0.05] blur-3xl transition-all duration-500 group-hover:bg-purple-500/[0.1]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .about-layout {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          min-height: 650px;
          align-items: center;
        }

        .lanyard-layer {
          position: relative;
          width: 100%;
          height: 620px;
          margin-top: 20px;
          z-index: 20;
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

        .about-card {
          transition:
            transform 400ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 400ms ease,
            box-shadow 400ms ease,
            background-color 400ms ease;
        }

        .about-card:hover {
          transform: translateY(-4px);
          border-color: rgba(192, 132, 252, 0.22);
          background-color: rgba(255, 255, 255, 0.035);
          box-shadow: 0 18px 55px rgba(88, 28, 135, 0.1);
        }

        .about-icon {
          transition:
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1),
            color 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        .about-card:hover .about-icon {
          color: rgba(255, 255, 255, 0.9);
          border-color: rgba(192, 132, 252, 0.24);
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.12);
        }

        .about-card:hover .about-icon-shield {
          transform: rotate(3deg);
        }

        .about-card:hover .about-icon-stack {
          transform: scale(1.08);
        }

        .about-card:hover .about-icon-rocket {
          transform: translateY(-3px);
        }

        .about-icon-shield {
          animation: shieldBloom 1s ease-out 1.15s both;
        }

        .about-icon-stack {
          animation: stackPulse 900ms ease-out 1.35s both;
        }

        .about-icon-rocket {
          animation: rocketFloat 1.1s ease-out 1.55s both;
        }

        @keyframes shieldBloom {
          0% {
            opacity: 0;
            transform: scale(0.65);
            filter: blur(6px);
            box-shadow: 0 0 0 rgba(139, 92, 246, 0);
          }

          55% {
            opacity: 1;
            transform: scale(1.08);
            filter: blur(0);
            box-shadow: 0 0 28px rgba(139, 92, 246, 0.2);
          }

          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
            box-shadow: 0 0 0 rgba(139, 92, 246, 0);
          }
        }

        @keyframes stackPulse {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }

          45% {
            opacity: 1;
            transform: scale(1.15);
          }

          70% {
            transform: scale(0.96);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rocketFloat {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          45% {
            opacity: 1;
            transform: translateY(-5px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
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
          .about-layout {
            grid-template-columns: minmax(0, 1fr) minmax(420px, 0.82fr);
            gap: 35px;
          }

          .lanyard-layer {
            position: absolute;
            top: -160px;
            right: -30px;
            width: 58%;
            height: 760px;
            margin-top: 0;
          }
        }

        @media (min-width: 1200px) {
          .about-layout {
            grid-template-columns: minmax(0, 1fr) minmax(500px, 0.82fr);
            gap: 70px;
          }

          .lanyard-layer {
            top: -190px;
            right: -45px;
            width: 57%;
            height: 820px;
          }
        }

        @media (max-width: 899px) {
          .lanyard-layer {
            margin-top: -20px;
            height: 500px;
          }
        }
      `}</style>
    </section>
  );
}