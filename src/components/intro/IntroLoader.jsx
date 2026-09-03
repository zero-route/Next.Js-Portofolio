"use client";

import { motion } from "framer-motion";
import { Code2, User, Globe } from "lucide-react";

const icons = [Code2, User, Globe];
const lineTwo = ["PORTOFOLIO", "WEBSITE"];

const ICON_DURATION = 0.7;
const ICON_STAGGER = 0.2;
const ICONS_END = (icons.length - 1) * ICON_STAGGER + ICON_DURATION;

const LINE_ONE_DELAY = ICONS_END + 0.3;
const LINE_ONE_DURATION = 0.9;
const LINE_ONE_END = LINE_ONE_DELAY + LINE_ONE_DURATION;

const LINE_TWO_DELAY = LINE_ONE_END + 0.2;
const LINE_TWO_STAGGER = 0.25;
const LINE_TWO_DURATION = 0.8;

const easeOut = [0.16, 1, 0.3, 1];

const iconContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: ICON_STAGGER,
    },
  },
};

const iconItemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: ICON_DURATION, ease: easeOut },
  },
};

const welcomeToVariants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { delay: LINE_ONE_DELAY, duration: LINE_ONE_DURATION, ease: easeOut },
  },
};

const myVariants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { delay: LINE_ONE_DELAY, duration: LINE_ONE_DURATION, ease: easeOut },
  },
};

const lineTwoContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: LINE_TWO_DELAY,
      staggerChildren: LINE_TWO_STAGGER,
    },
  },
};

const lineTwoItemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: LINE_TWO_DURATION, ease: easeOut },
  },
};

export default function IntroLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#0a0a0a] font-sans text-white">
      <motion.div
        variants={iconContainerVariants}
        initial="hidden"
        animate="show"
        className="flex items-center gap-6"
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            variants={iconItemVariants}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80"
          >
            <Icon size={18} strokeWidth={1.75} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.span
            variants={welcomeToVariants}
            initial="hidden"
            animate="show"
            className="text-2xl font-semibold tracking-wide sm:text-3xl"
          >
            WELCOME TO
          </motion.span>
          <motion.span
            variants={myVariants}
            initial="hidden"
            animate="show"
            className="text-2xl font-semibold tracking-wide sm:text-3xl"
          >
            MY
          </motion.span>
        </div>
        <motion.div
          variants={lineTwoContainerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {lineTwo.map((word, index) => (
            <motion.span
              key={word + index}
              variants={lineTwoItemVariants}
              className="text-2xl font-semibold tracking-wide sm:text-3xl"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
