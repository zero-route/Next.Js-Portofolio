"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
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

function NavigationItem({
  icon,
  label,
  target,
  mouseX,
}) {
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
    <button
      ref={ref}
      onClick={scrollToSection}
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
    </button>
  );
}

export default function Navigation() {
  const mouseX = useMotionValue(Infinity);

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
        className="
          mx-auto
          flex
          h-[76px]
          w-fit
          max-w-[calc(100vw-32px)]
          items-center
          justify-between
          gap-4
          rounded-3xl
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
        <div className="hidden items-center gap-4 sm:flex">
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
        </div>

        <div className="flex items-center justify-center">
          <RobotEyes />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.target}
              {...item}
              mouseX={mouseX}
            />
          ))}
        </div>
      </motion.nav>
    </header>
  );
}
