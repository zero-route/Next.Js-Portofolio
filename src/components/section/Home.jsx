"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Network,
  BrainCircuit,
  ArrowUpRight,
  Mail,
  Github,
  GitBranch,
  Linkedin,
  Send,
  Instagram,
  Music2,
} from "lucide-react";
import { motion } from "framer-motion";

const roleList = [
  "Website Developer",
  "Network Engineer",
  "Penetration Testing",
  "Full-Stack Developer",
  "Automation Engineer",
  "Robotic Engineer",
  "Electrical Engineer",
];

const skillsList = [
  "HTML5",
  "CSS3",
  "Tailwind-CSS",
  "JavaScript",
  "TypeScript",
  "Next.Js",
  "Vue",
  "Node.js",
  "PHP",
  "Laravel",
  "Ruby",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "GitLab",
  "GitHub",
  "Python",
  "C++",
  "C",
  "Java",
  "VS-Code",
];

function useTypewriter(words, typingSpeed = 100, deletingSpeed = 55, pause = 1600) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;

    if (!deleting && text !== currentWord) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (!deleting && text === currentWord) {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deletingSpeed);
    } else if (deleting && text.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 350);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return text;
}

export default function Home() {
  const role = useTypewriter(roleList, 110, 60, 1800);
  const skill = useTypewriter(skillsList, 95, 55, 1500);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/zero-route",
      label: "GitHub",
    },
    {
      icon: GitBranch,
      href: "https://gitlab.com/",
      label: "GitLab",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
    },
    {
      icon: Send,
      href: "https://t.me/",
      label: "Telegram",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    {
      icon: Music2,
      href: "https://www.tiktok.com/",
      label: "TikTok",
    },
  ];

  const introIcons = [Code2, Network, BrainCircuit];

  const paragraph =
    "A passionate individual in various fields of Information Technology. Combining expertise across multiple IT disciplines, including Network Engineering, Full-Stack Development, Penetration Testing, Automation, Robotics, and Electrical Engineering.";

  const words = paragraph.split(" ");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030305] px-5 pb-24 pt-8 text-white sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)] xl:gap-14">
          <div className="min-w-0">
            <motion.div
              initial="hidden"
              animate="visible"
              className="mb-6 flex gap-3"
            >
              {introIcons.map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.28,
                    ease: "easeOut",
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] shadow-[0_0_30px_rgba(139,92,246,0.04)] sm:h-12 sm:w-12"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mb-7 leading-none sm:mb-8">
              <motion.h1
                initial={{
                  opacity: 0,
                  x: -70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1.05,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-mono text-[3.2rem] font-black tracking-[-0.08em] text-[#f2f2f4] sm:text-[4.5rem] lg:text-[4.8rem] xl:text-[5.5rem]"
              >
                SYSTEM
              </motion.h1>

              <motion.h2
                initial={{
                  opacity: 0,
                  x: 70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1.05,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative mt-1 inline-block bg-gradient-to-r from-white via-[#e8ddff] to-[#9f70ff] bg-[length:200%_100%] bg-clip-text font-mono text-[3.2rem] font-black tracking-[-0.08em] text-transparent animate-[shine_4s_linear_infinite] sm:text-[4.5rem] lg:text-[4.8rem] xl:text-[5.5rem]"
              >
                ENGINEER
              </motion.h2>
            </div>

            <motion.p
              initial="hidden"
              animate="visible"
              className="max-w-[760px] font-mono text-[13px] leading-7 text-white/55 sm:text-[14px] sm:leading-8 lg:text-[15px]"
            >
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 16,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.85 + index * 0.045,
                    ease: "easeOut",
                  }}
                  className="mr-1.5 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.85,
                delay: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap gap-3 sm:mt-9"
            >
              <a
                href="#projects"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-purple-300/30 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#e9e2ff] px-5 py-3 font-mono text-sm font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.2)] transition-transform duration-300 hover:scale-[1.03] sm:px-6"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">View Projects</span>
                <ArrowUpRight
                  size={17}
                  className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.035] px-5 py-3 font-mono text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] sm:px-6"
              >
                Let&apos;s Talk
                <Mail size={16} />
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="mt-7 flex flex-wrap gap-3"
            >
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 24,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 1.85 + index * 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/[0.08] hover:text-white sm:h-11 sm:w-11"
                  >
                    <Icon size={17} strokeWidth={1.7} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 2.1,
              ease: "easeOut",
            }}
            className="mx-auto w-full max-w-[530px] lg:mx-0"
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090911] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <div className="flex h-11 items-center justify-between border-b border-white/[0.07] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#6ee7b7]" />
                </div>

                <span className="font-mono text-[10px] text-white/30">
                  portfolio.js
                </span>
              </div>

              <div className="min-h-[235px] p-5 font-mono text-[12px] leading-6 sm:p-7 sm:text-[13px]">
                <div className="text-[#c4b5fd]">
                  const <span className="text-[#93c5fd]">developer</span>{" "}
                  <span className="text-white/60">= {"{"}</span>
                </div>

                <div className="pl-4 text-white/60">
                  <div>
                    Nama{" "}
                    <span className="text-white/40">:</span>{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;Dimas Aksa Oktapian&quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Role{" "}
                    <span className="text-white/40">:</span>{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;{role}
                      <span className="ml-[1px] inline-block h-[13px] w-[1px] animate-pulse bg-[#d8b4fe] align-middle" />
                      &quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Skills{" "}
                    <span className="text-white/40">:</span>{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;{skill}
                      <span className="ml-[1px] inline-block h-[13px] w-[1px] animate-pulse bg-[#d8b4fe] align-middle" />
                      &quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Passion{" "}
                    <span className="text-white/40">:</span>{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;DevSecOps Engineer&quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Status{" "}
                    <span className="text-white/40">:</span>{" "}
                    <span className="text-[#a7f3d0]">
                      &quot;Building........&quot;
                    </span>
                  </div>
                </div>

                <div className="text-white/60">{"};"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </section>
  );
}