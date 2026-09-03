"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, User, Globe } from "lucide-react";

const icons = [Code2, User, Globe];
const lineTwo = ["PORTOFOLIO", "WEBSITE"];

const LOADING_DURATION = 2500;

const easeOut = [0.16, 1, 0.3, 1];

const iconContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const iconItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

const welcomeToVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.35,
      duration: 0.4,
      ease: easeOut,
    },
  },
};

const myVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.35,
      duration: 0.4,
      ease: easeOut,
    },
  },
};

const lineTwoContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const lineTwoItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};

export default function IntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const percentage = Math.min(
        Math.round((elapsed / LOADING_DURATION) * 100),
        100
      );

      setProgress(percentage);

      if (percentage >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 100);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] font-sans text-white"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.4,
        },
      }}
    >
      <motion.div
        variants={iconContainerVariants}
        initial="hidden"
        animate="show"
        className="mb-8 flex items-center gap-4"
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            variants={iconItemVariants}
            className="
              flex h-9 w-9 
              items-center justify-center 
              rounded-full 
              border border-white/15 
              text-white/80
            "
          >
            <Icon size={15} strokeWidth={1.75} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <motion.span
            variants={welcomeToVariants}
            initial="hidden"
            animate="show"
            className="
              text-xl 
              font-semibold 
              tracking-wide 
              sm:text-3xl
            "
          >
            WELCOME TO
          </motion.span>

          <motion.span
            variants={myVariants}
            initial="hidden"
            animate="show"
            className="
              text-xl 
              font-semibold 
              tracking-wide 
              sm:text-3xl
            "
          >
            MY
          </motion.span>
        </div>

        <motion.div
          variants={lineTwoContainerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {lineTwo.map((word, index) => (
            <motion.span
              key={word + index}
              variants={lineTwoItemVariants}
              className="
                text-xl 
                font-semibold 
                tracking-wide 
                sm:text-3xl
              "
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
        className="mt-8 w-[280px] sm:w-[380px]"
      >
<div className="mb-2 flex items-center justify-between text-xs tracking-wide text-white/60">
  <span>Loading.....</span>
  <span>{progress}%</span>
</div>
        <div
          className="
            h-2 
            w-full 
            overflow-hidden 
            rounded-full 
            border border-white/10 
            bg-white/10
          "
        >
          <motion.div
            className="
              h-full 
              rounded-full 
              bg-white
            "
            initial={{
              width: "0%",
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              ease: "linear",
              duration: 0.05,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}