"use client";

import { useState } from "react";
import IntroLoader from "@/components/intro/IntroLoader";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroLoader onFinish={() => setIntroDone(true)} />}
      <HeroSection startAnimations={introDone} />
      <AboutSection />
    </>
  );
}
