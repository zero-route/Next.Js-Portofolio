"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Network,
  Brain,
  ArrowUpRight,
  Mail,
} from "lucide-react";

import {
  SiGithub,
  SiGitlab,
  SiLinkedin,
  SiTelegram,
  SiInstagram,
  SiTiktok,
} from "react-icons/si";

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
  "Next.js",
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

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [mode, setMode] = useState("typing");

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;

    if (mode === "typing") {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setMode("waiting");
        }, 1400);
      }
    }

    if (mode === "waiting") {
      timeout = setTimeout(() => {
        setMode("deleting");
      }, 400);
    }

    if (mode === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setMode("changing");

        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setMode("typing");
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    mode,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
  ]);

  return text;
}

const icons = [
  {
    icon: Code2,
  },
  {
    icon: Network,
  },
  {
    icon: Brain,
  },
];

const socialLinks = [
  {
    icon: SiGithub,
    href: "https://github.com/zero-route",
    label: "GitHub",
  },
  {
    icon: SiGitlab,
    href: "#",
    label: "GitLab",
  },
  {
    icon: SiLinkedin,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: SiTelegram,
    href: "#",
    label: "Telegram",
  },
  {
    icon: SiInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: SiTiktok,
    href: "#",
    label: "TikTok",
  },
];

const iconContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const topIconVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const socialContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 1.7,
      staggerChildren: 0.13,
    },
  },
};

const socialVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const paragraphText =
  "A passionate individual in various fields of Information Technology. Combining expertise across multiple IT disciplines, including Network Engineering, Full-Stack Development, Penetration Testing, Automation, Robotics, and Electrical Engineering.";

export default function HomeSection() {
  const role = useTypewriter(roleList, 75, 40);
  const skill = useTypewriter(skillsList, 75, 40);

  const paragraphWords = paragraphText.split(" ");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] px-5 pb-24 pt-28 text-white sm:px-8 lg:px-12 lg:pt-32">
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-700/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:gap-16">
          <div className="max-w-2xl">
            <motion.div
              variants={iconContainerVariants}
              initial="hidden"
              animate="show"
              className="mb-10 flex items-center gap-3"
            >
              {icons.map(({ icon: Icon }, index) => (
                <motion.div
                  key={index}
                  variants={topIconVariants}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                >
                  <Icon size={24} strokeWidth={1.7} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mb-8 overflow-hidden">
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
                  delay: 0.45,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl"
              >
                SYSTEM
              </motion.h1>

              <motion.h1
                initial={{
                  opacity: 0,
                  x: 70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.62,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-3 bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-5xl font-black leading-[0.9] tracking-[-0.06em] text-transparent sm:text-7xl lg:text-8xl"
              >
                ENGINEER
              </motion.h1>
            </div>

            <motion.p
              initial="hidden"
              animate="show"
              className="max-w-2xl text-base leading-8 text-white/55 sm:text-lg"
            >
              {paragraphWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.9 + index * 0.025,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mr-[0.32em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.25,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(124,58,237,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)]"
              >
                View Projects

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.035] px-6 py-4 text-sm font-semibold text-white/80 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                Let's Talk

                <Mail size={18} />
              </a>
            </motion.div>

            <motion.div
              variants={socialContainerVariants}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    variants={socialVariants}
                    href={item.href}
                    target={
                      item.href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      item.href.startsWith("http")
                        ? "noreferrer"
                        : undefined
                    }
                    aria-label={item.label}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-white/55 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-300"
                  >
                    <Icon size={19} />
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
              delay: 1.15,
              duration: 0.9,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08080c]/90 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/90" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
                </div>

                <span className="font-mono text-xs text-white/25">
                  portfolio.js
                </span>
              </div>

              <div className="overflow-x-auto p-6 font-mono text-sm leading-7 sm:p-8 sm:text-base">
                <div className="whitespace-nowrap text-purple-300">
                  const{" "}
                  <span className="text-blue-200">developer</span>{" "}
                  <span className="text-white/60">= {"{"}</span>
                </div>

                <div className="pl-4 text-white/60">
                  Nama
                  <span className="text-white/25"> : </span>
                  <span className="text-emerald-300">
                    "Dimas Aksa Oktapian"
                  </span>
                  <span className="text-white/30">,</span>
                </div>

                <div className="pl-4 text-white/60">
                  Role
                  <span className="text-white/25"> : </span>
                  <span className="text-emerald-300">
                    "
                    {role}
                    <span className="ml-[1px] inline-block h-4 w-[2px] animate-pulse bg-purple-300 align-middle" />
                    "
                  </span>
                  <span className="text-white/30">,</span>
                </div>

                <div className="pl-4 text-white/60">
                  Skills
                  <span className="text-white/25"> : </span>
                  <span className="text-emerald-300">
                    "
                    {skill}
                    <span className="ml-[1px] inline-block h-4 w-[2px] animate-pulse bg-purple-300 align-middle" />
                    "
                  </span>
                  <span className="text-white/30">,</span>
                </div>

                <div className="pl-4 text-white/60">
                  Passion
                  <span className="text-white/25"> : </span>
                  <span className="text-emerald-300">
                    "DevSecOps Engineer"
                  </span>
                  <span className="text-white/30">,</span>
                </div>

                <div className="pl-4 text-white/60">
                  Status
                  <span className="text-white/25"> : </span>
                  <span className="text-emerald-300">
                    "Building........"
                  </span>
                </div>

                <div className="text-white/60">{"}"};</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}