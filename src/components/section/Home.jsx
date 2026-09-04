"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  Music2
} from "lucide-react";

const roleList = [
  "Website Developer",
  "Network Engineer",
  "Penetration Testing",
  "Full-Stack Developer",
  "Automation Engineer",
  "Robotic Engineer",
  "Electrical Engineer"
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
  "VS-Code"
];

/* =========================================
   TYPING TEXT
========================================= */

function useTyping(words, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1500) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);

        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 350);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime
  ]);

  return text;
}

/* =========================================
   ANIMATION VARIANTS
========================================= */

const socialContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2
    }
  }
};

const socialItem = {
  hidden: {
    opacity: 0,
    y: 18
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const buttonContainer = {
  hidden: {
    opacity: 0,
    y: 20
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/* =========================================
   COMPONENT
========================================= */

export default function Home() {
  const role = useTyping(
    roleList,
    85,
    42,
    1600
  );

  const skill = useTyping(
    skillsList,
    85,
    42,
    1500
  );

  const descriptionWords = [
    "A",
    "passionate",
    "individual",
    "in",
    "various",
    "fields",
    "of",
    "Information",
    "Technology.",
    "Combining",
    "expertise",
    "across",
    "multiple",
    "IT",
    "disciplines,",
    "including",
    "Network",
    "Engineering,",
    "Full-Stack",
    "Development,",
    "Penetration",
    "Testing,",
    "Automation,",
    "Robotics,",
    "and",
    "Electrical",
    "Engineering."
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/zero-route"
    },

    {
      name: "GitLab",
      icon: GitBranch,
      href: "#"
    },

    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#"
    },

    {
      name: "Telegram",
      icon: Send,
      href: "#"
    },

    {
      name: "Instagram",
      icon: Instagram,
      href: "#"
    },

    {
      name: "TikTok",
      icon: Music2,
      href: "#"
    }
  ];

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#050505]
        px-5
        pb-20
        pt-28
        text-white
        sm:px-8
        lg:px-10
        xl:px-16
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-[15%]
          top-[20%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-purple-700/[0.04]
          blur-[140px]
        "
      />

      {/* MAIN CONTAINER */}

      <div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1400px]
          flex-col
          gap-8
          lg:flex-row
          lg:items-center
          lg:gap-10
        "
      >
        {/* =====================================
            LEFT CONTENT
        ====================================== */}

        <div
          className="
            w-full
            lg:w-[52%]
            xl:w-[54%]
          "
        >
          {/* TOP ICONS */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.14
                }
              }
            }}
            className="mb-7 flex gap-3"
          >
            {[
              {
                icon: Code2
              },
              {
                icon: Network
              },
              {
                icon: BrainCircuit
              }
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 18
                    },

                    visible: {
                      opacity: 1,
                      y: 0,

                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }
                  }}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    shadow-[0_8px_30px_rgba(0,0,0,0.2)]
                    backdrop-blur-md
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.7}
                    className="text-white"
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* TITLE */}

          <div className="mb-7">
            <motion.h1
              initial={{
                opacity: 0,
                x: -50
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="
                text-[3.3rem]
                font-black
                leading-[0.88]
                tracking-[-0.06em]
                sm:text-[4.5rem]
                lg:text-[4.7rem]
                xl:text-[5.4rem]
              "
            >
              SYSTEM
            </motion.h1>

            <motion.h1
              initial={{
                opacity: 0,
                x: 50
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="
                mt-2
                text-[3.3rem]
                font-black
                leading-[0.88]
                tracking-[-0.06em]
                sm:text-[4.5rem]
                lg:text-[4.7rem]
                xl:text-[5.4rem]
                bg-gradient-to-r
                from-white
                via-[#d9c6ff]
                to-[#9c6bff]
                bg-clip-text
                text-transparent
              "
            >
              ENGINEER
            </motion.h1>
          </div>

          {/* DESCRIPTION */}

          <div
            className="
              mb-8
              max-w-[690px]
              text-[14px]
              leading-7
              text-white/60
              sm:text-[15px]
              lg:text-[15px]
              xl:text-[16px]
            "
          >
            {descriptionWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{
                  opacity: 0,
                  y: 12
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.55 + index * 0.025
                }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* BUTTONS */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonContainer}
            className="
              mb-7
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <a
              href="#projects"
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#6d28d9]
                via-[#8b5cf6]
                to-[#c4b5fd]
                px-5
                py-3
                text-[13px]
                font-semibold
                text-white
                shadow-[0_10px_30px_rgba(124,58,237,0.2)]
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-[0_15px_40px_rgba(124,58,237,0.3)]
              "
            >
              View Projects

              <ArrowUpRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>

            <a
              href="#contact"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.035]
                px-5
                py-3
                text-[13px]
                font-medium
                text-white/80
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/[0.07]
                hover:text-white
              "
            >
              Let's Talk

              <Mail size={15} />
            </a>
          </motion.div>

          {/* SOCIAL MEDIA */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={socialContainer}
            className="
              flex
              flex-wrap
              gap-2.5
            "
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  variants={socialItem}
                  whileHover={{
                    y: -3,
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-white/55
                    backdrop-blur-md
                    transition-colors
                    duration-300
                    hover:border-purple-400/30
                    hover:bg-purple-500/[0.08]
                    hover:text-white
                  "
                >
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                  />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* =====================================
            RIGHT PORTFOLIO.JS
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.9,
            delay: 0.5
          }}
          className="
            w-full
            lg:w-[48%]
            xl:w-[46%]
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[620px]
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#09090f]
              shadow-[0_25px_70px_rgba(0,0,0,0.3)]
              lg:max-w-none
            "
          >
            {/* WINDOW HEADER */}

            <div
              className="
                flex
                h-11
                items-center
                justify-between
                border-b
                border-white/[0.07]
                px-5
              "
            >
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />

                <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />

                <span className="h-2.5 w-2.5 rounded-full bg-[#4ecb9a]" />
              </div>

              <span
                className="
                  font-mono
                  text-[10px]
                  tracking-wide
                  text-white/30
                "
              >
                portfolio.js
              </span>
            </div>

            {/* CODE */}

            <div
              className="
                min-h-[205px]
                px-6
                py-6
                font-mono
                text-[12px]
                leading-6
                sm:text-[13px]
                lg:min-h-[230px]
                xl:text-[14px]
              "
            >
              <div className="text-purple-300">
                const{" "}

                <span className="text-blue-300">
                  developer
                </span>

                <span className="text-white/60">
                  {" "}={" "}
                  {"{"}
                </span>
              </div>

              <div className="pl-4 text-white/45">
                Nama
                <span className="text-white/30"> : </span>

                <span className="text-emerald-300">
                  "Dimas Aksa Oktapian"
                </span>
                ,
              </div>

              <div className="pl-4 text-white/45">
                Role
                <span className="text-white/30"> : </span>

                <span className="text-emerald-300">
                  "{role}"
                </span>

                <span className="ml-0.5 inline-block animate-pulse text-purple-300">
                  |
                </span>
                ,
              </div>

              <div className="pl-4 text-white/45">
                Skills
                <span className="text-white/30"> : </span>

                <span className="text-emerald-300">
                  "{skill}"
                </span>

                <span className="ml-0.5 inline-block animate-pulse text-purple-300">
                  |
                </span>
                ,
              </div>

              <div className="pl-4 text-white/45">
                Passion
                <span className="text-white/30"> : </span>

                <span className="text-emerald-300">
                  "DevSecOps Engineer"
                </span>
                ,
              </div>

              <div className="pl-4 text-white/45">
                Status
                <span className="text-white/30"> : </span>

                <span className="text-emerald-300">
                  "Building........"
                </span>
              </div>

              <div className="mt-1 text-white/60">
                {"}"};
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}