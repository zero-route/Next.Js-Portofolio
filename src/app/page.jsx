"use client";

import { useState } from "react";

import IntroLoader from "@/components/intro/IntroLoader";
import Navigation from "@/components/layout/Navigation";
import HomeSection from "@/components/section/Home";
import About from "@/components/section/About";
import Beyond from "@/components/section/Beyond";
import PortofolioShowcase from "@/components/section/PortofolioShowcase";
import Contact from "@/components/section/Contact";

export default function Page() {
  const [loading, setLoading] = useState(true);

  const handleIntroComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return (
      <main>
        <IntroLoader onComplete={handleIntroComplete} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navigation />

      <section id="home">
        <HomeSection />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="beyond">
        <Beyond />
      </section>

      <section id="projects">
        <PortofolioShowcase />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}