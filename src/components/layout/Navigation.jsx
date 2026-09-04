"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Home as HomeIcon,
  User,
  Sparkles,
  FolderGit2,
  Mail,
} from "lucide-react";
import RobotEyes from "./RobotEyes";

const springConfig = {
  mass: 0.15,
  stiffness: 180,
  damping: 14,
};

function NavigationItem({ icon, label, target, mouseX, index, contentVariants, contentVisible }) {
  const ref = useRef(null);

  const distance = 120;
  const baseSize = 40;
  const magnification = 52;

  const mouseDistance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) {
      return Infinity;
    }

    return value - (rect.left + rect.width / 2);
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );

  const size = useSpring(targetSize, springConfig);

  const scrollToSection = () => {
    const section = document.getElementById(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={scrollToSection}
      variants={contentVariants}
      custom={index}
      initial="hidden"
      animate={contentVisible ? "visible" : "hidden"}
      className="group relative flex h-[62px] w-[50px] items-center justify-start flex-col border-0 bg-transparent p-0 outline-none"
      aria-label={label}
    >
      <div className="flex h-[52px] w-full items-center justify-center">
        <motion.div
          style={{
            width: size,
            height: size,
          }}
          className="
            flex
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            text-white/70
            shadow-[0_4px_20px_rgba(0,0,0,0.2)]
            backdrop-blur-xl
            transition-colors
            duration-300
            group-hover:border-white/20
            group-hover:bg-white/[0.08]
            group-hover:text-white
          "
        >
          {icon}
        </motion.div>
      </div>

      <span
        className="
          absolute
          bottom-0
          text-[9px]
          font-medium
          tracking-wide
          text-white/45
          transition-colors
          duration-300
          group-hover:text-white/90
          sm:text-[10px]
        "
      >
        {label}
      </span>
    </motion.button>
  );
}

export default function Navigation({ play = true, entranceDelay = 300 }) {
  const mouseX = useMotionValue(Infinity);
  const [expanded, setExpanded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!play) {
      return;
    }

    const timer = setTimeout(() => {
      setExpanded(true);
    }, entranceDelay);

    return () => clearTimeout(timer);
  }, [play, entranceDelay]);

  const navigationItems = [
    {
      label: "Home",
      target: "home",
      icon: <HomeIcon size={18} strokeWidth={1.7} />,
    },
    {
      label: "About",
      target: "about",
      icon: <User size={18} strokeWidth={1.7} />,
    },
    {
      label: "Beyond",
      target: "beyond",
      icon: <Sparkles size={18} strokeWidth={1.7} />,
    },
    {
      label: "Projects",
      target: "projects",
      icon: <FolderGit2 size={18} strokeWidth={1.7} />,
    },
    {
      label: "Contact",
      target: "contact",
      icon: <Mail size={18} strokeWidth={1.7} />,
    },
  ];

  const shapeVariants = {
    collapsed: {
      scaleX: 0.12,
      borderRadius: "9999px",
      filter: "blur(0px)",
    },
    expanded: {
      scaleX: 1,
      borderRadius: ["9999px", "9999px", "24px"],
      filter: ["blur(0px)", "blur(18px)", "blur(0px)"],
      transition: {
        duration: 2.1,
        ease: [0.19, 1, 0.22, 1],
        times: [0, 0.45, 1],
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
    },
    visible: (index = 0) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.3 + index * 0.11,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <header
      className="
        fixed
        left-0
        top-0
        z-40
        w-full
        px-3
        pt-3
        sm:px-6
        sm:pt-5
      "
    >
      <motion.nav
        onMouseMove={(event) => {
          mouseX.set(event.clientX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        variants={shapeVariants}
        onAnimationComplete={() => {
          if (expanded) {
            setContentVisible(true);
          }
        }}
        style={{ transformOrigin: "50% 50%" }}
        className="
          relative
          mx-auto
          flex
          h-[76px]
          w-fit
          max-w-[calc(100vw-32px)]
          items-center
          justify-center
          border
          border-white/[0.08]
          bg-[#0a0a0a]/75
          px-4
          py-2
          shadow-lg
          backdrop-blur-2xl
          sm:w-full
          sm:max-w-5xl
          sm:px-6
        "
      >
        <motion.div
          variants={contentVariants}
          custom={0}
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
          className="hidden items-center gap-4 sm:absolute sm:left-6 sm:flex"
        >
          <span
            className="
              select-none
              text-sm
              font-semibold
              tracking-[0.25em]
              text-white/85
            "
          >
            DIMAS
          </span>
          <div className="flex items-center gap-2"></div>
        </motion.div>

        <motion.div
          variants={contentVariants}
          custom={1}
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
          className="flex items-center justify-center"
        >
          <RobotEyes />
        </motion.div>

        <div className="flex items-center justify-center gap-2 sm:absolute sm:right-6 sm:gap-4">
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.target}
              {...item}
              mouseX={mouseX}
              index={index + 2}
              contentVariants={contentVariants}
              contentVisible={contentVisible}
            />
          ))}
        </div>
      </motion.nav>
    </header>
  );
}