// src/app/page.jsx
"use client";

import { useState } from "react";
import IntroLoader from "@/components/intro/IntroLoader";
import AnimatedBackground from "@/components/reactbits/AnimatedBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PortofolioSection from "@/components/sections/PortofolioSection";
import ContactSection from "@/components/sections/ContactSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#030712] text-white">
      {/* Intro / Welcome Loading Screen */}
      {isLoading && (
        <IntroLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Background Bintang Kosmik */}
      <AnimatedBackground />

      {/* Konten Web Utama setelah Intro Selesai */}
      {!isLoading && (
        <div className="relative z-10 animate-fadeIn">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <PortofolioSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </main>
  );
}
