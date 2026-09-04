"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Code2,
  Github,
  GitBranch,
  Instagram,
  Linkedin,
  Mail,
  Music2,
  Network,
  Send,
  Terminal,
} from "lucide-react";

const roles = [
  "Website Developer",
  "Network Engineer",
  "Penetration Testing",
  "Full-Stack Developer",
  "Automation Engineer",
  "Robotic Engineer",
  "Electrical Engineer",
];

const skills = [
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

const description =
  "A passionate individual in various fields of Information Technology. Combining expertise across multiple IT disciplines, including Network Engineering, Full-Stack Development, Penetration Testing, Automation, Robotics, and Electrical Engineering.";

const descriptionWords = description.split(" ");

function useTypewriter(words, typingSpeed = 75, deletingSpeed = 35, pause = 1600) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));

          if (text === currentWord) {
            setTimeout(() => {
              setIsDeleting(true);
            }, pause);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));

          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return text;
}

const iconContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.22,
    },
  },
};

const topIconVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const socialContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 2.7,
      staggerChildren: 0.18,
    },
  },
};

const socialItemVariants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const buttonContainerVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 2.25,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const codeContainerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay: 1.7,
      duration: 1,
      ease: "easeOut",
    },
  },
};

function SocialButton({ href, label, children }) {
  return (
    <motion.a
      variants={socialItemVariants}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        group
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/[0.03]
        text-white/60
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-400/50
        hover:bg-violet-500/10
        hover:text-violet-300
      "
    >
      {children}
    </motion.a>
  );
}

export default function Home() {
  const roleText = useTypewriter(roles);
  const skillText = useTypewriter(skills, 55, 28, 1200);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
        px-6
        pb-20
        pt-32
        text-white
        sm:px-10
        lg:px-16
        lg:pt-40
      "
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-15%]
            top-[15%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-violet-600/[0.05]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            right-[-10%]
            top-[5%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-purple-500/[0.04]
            blur-[140px]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-7xl
          items-center
          gap-16
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-20
        "
      >
        <div className="flex flex-col items-start">
          <motion.div
            variants={iconContainerVariants}
            initial="hidden"
            animate="show"
            className="mb-10 flex items-center gap-4"
          >
            <motion.div
              variants={topIconVariants}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.025]
                text-white
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
              "
            >
              <Code2 size={23} strokeWidth={1.7} />
            </motion.div>

            <motion.div
              variants={topIconVariants}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.025]
                text-white
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
              "
            >
              <Network size={23} strokeWidth={1.7} />
            </motion.div>

            <motion.div
              variants={topIconVariants}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.025]
                text-white
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
              "
            >
              <Brain size={23} strokeWidth={1.7} />
            </motion.div>
          </motion.div>

          <div className="flex flex-col leading-[0.9]">
            <motion.h1
              initial={{
                opacity: 0,
                x: -80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                text-6xl
                font-black
                tracking-[-0.06em]
                text-white
                sm:text-7xl
                md:text-8xl
              "
            >
              SYSTEM
            </motion.h1>

            <motion.h1
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 1.05,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mt-3
                bg-gradient-to-r
                from-white
                via-violet-200
                to-violet-500
                bg-[length:200%_100%]
                bg-clip-text
                text-5xl
                font-black
                tracking-[-0.06em]
                text-transparent
                animate-[gradient-shine_4s_linear_infinite]
                sm:text-7xl
                md:text-8xl
              "
            >
              ENGINEER
            </motion.h1>
          </div>

          <motion.p
            initial="hidden"
            animate="show"
            className="
              mt-12
              max-w-2xl
              text-lg
              leading-[1.9]
              text-white/60
              sm:text-xl
            "
          >
            {descriptionWords.map((word, index) => (
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
                  delay: 1.45 + index * 0.035,
                  duration: 0.38,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            variants={buttonContainerVariants}
            initial="hidden"
            animate="show"
            className="
              mt-12
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="
                group
                relative
                flex
                items-center
                gap-3
                overflow-hidden
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                via-purple-500
                to-violet-400
                px-7
                py-4
                font-semibold
                text-white
                shadow-[0_10px_35px_rgba(124,58,237,0.22)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_15px_40px_rgba(124,58,237,0.35)]
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/25
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover:translate-x-full
                "
              />

              <span className="relative">View Projects</span>

              <ArrowUpRight
                size={19}
                className="
                  relative
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white/15
                bg-white/[0.04]
                px-7
                py-4
                font-semibold
                text-white/85
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-white/30
                hover:bg-white/[0.08]
              "
            >
              <span>Let's Talk</span>
              <Mail size={18} />
            </button>
          </motion.div>

          <motion.div
            variants={socialContainerVariants}
            initial="hidden"
            animate="show"
            className="
              mt-10
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <SocialButton
              href="https://github.com/zero-route"
              label="GitHub"
            >
              <Github size={20} strokeWidth={1.8} />
            </SocialButton>

            <SocialButton href="#" label="GitLab">
              <GitBranch size={20} strokeWidth={1.8} />
            </SocialButton>

            <SocialButton href="#" label="LinkedIn">
              <Linkedin size={20} strokeWidth={1.8} />
            </SocialButton>

            <SocialButton href="#" label="Telegram">
              <Send size={19} strokeWidth={1.8} />
            </SocialButton>

            <SocialButton href="#" label="Instagram">
              <Instagram size={20} strokeWidth={1.8} />
            </SocialButton>

            <SocialButton href="#" label="TikTok">
              <Music2 size={20} strokeWidth={1.8} />
            </SocialButton>
          </motion.div>
        </div>

        <motion.div
          variants={codeContainerVariants}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-violet-400/10
              bg-[#09090d]/80
              shadow-[0_25px_80px_rgba(0,0,0,0.4)]
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.06]
                px-5
                py-4
                sm:px-6
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/90" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/90" />
                <span className="h-3 w-3 rounded-full bg-green-400/90" />
              </div>

              <span className="font-mono text-sm text-white/30">
                portfolio.js
              </span>
            </div>

            <div
              className="
                overflow-x-auto
                px-5
                py-7
                font-mono
                text-sm
                leading-8
                sm:px-8
                sm:text-base
              "
            >
              <div className="text-violet-400">
                const{" "}
                <span className="text-blue-300">
                  developer
                </span>{" "}
                <span className="text-white/70">=</span>{" "}
                <span className="text-white/70">{"{"}</span>
              </div>

              <div className="pl-4 sm:pl-6">
                <span className="text-violet-300">Nama</span>
                <span className="text-white/50"> : </span>
                <span className="text-emerald-300">
                  "Dimas Aksa Oktapian"
                </span>
                <span className="text-white/50">,</span>
              </div>

              <div className="pl-4 sm:pl-6">
                <span className="text-violet-300">Role</span>
                <span className="text-white/50"> : </span>
                <span className="text-emerald-300">
                  "{roleText}
                  <span className="animate-pulse text-violet-300">|</span>"
                </span>
                <span className="text-white/50">,</span>
              </div>

              <div className="pl-4 sm:pl-6">
                <span className="text-violet-300">Skills</span>
                <span className="text-white/50"> : </span>
                <span className="text-cyan-300">
                  "{skillText}
                  <span className="animate-pulse text-violet-300">|</span>"
                </span>
                <span className="text-white/50">,</span>
              </div>

              <div className="pl-4 sm:pl-6">
                <span className="text-violet-300">Passion</span>
                <span className="text-white/50"> : </span>
                <span className="text-emerald-300">
                  "DevSecOps Engineer"
                </span>
                <span className="text-white/50">,</span>
              </div>

              <div className="pl-4 sm:pl-6">
                <span className="text-violet-300">Status</span>
                <span className="text-white/50"> : </span>
                <span className="text-emerald-300">
                  "Building........"
                </span>
              </div>

              <div className="text-white/70">{"};"}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradient-shine {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}