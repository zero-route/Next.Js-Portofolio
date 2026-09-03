"use client";

import { motion } from "framer-motion";
import { Code2, User, Globe } from "lucide-react";

const icons = [Code2, User, Globe];
const lineOne = ["WELCOME", "TO", "MY"];
const lineTwo = ["PORTOFOLIO", "WEBSITE"];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function IntroLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#0a0a0a] font-sans text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex items-center gap-6"
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80"
          >
            <Icon size={18} strokeWidth={1.75} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        transition={{ delayChildren: 0.45 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {lineOne.map((word, index) => (
            <motion.span
              key={word + index}
              variants={itemVariants}
              className="text-2xl font-semibold tracking-wide sm:text-3xl"
            >
              {word}
            </motion.span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {lineTwo.map((word, index) => (
            <motion.span
              key={word + index}
              variants={itemVariants}
              className="text-2xl font-semibold tracking-wide sm:text-3xl"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
