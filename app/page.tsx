"use client";

import { useState } from "react";
import IntroLoader from "@/components/layout/IntroLoader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectTimeline from "@/components/sections/ProjectTimeline";
import Expertise from "@/components/sections/Expertise";
import Contact from "@/components/sections/Contact";
import ChatbotWidget from "@/components/widgets/ChatbotWidget";
import MusicPlayerWidget from "@/components/widgets/MusicPlayerWidget";
import TriviaWidget from "@/components/widgets/TriviaWidget";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [triviaOpen, setTriviaOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* 1. Tampilkan IntroLoader jika durasi loading belum selesai */}
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}

      {/* 2. Konten Utama Portfolio */}
      <div
        className={`transition-opacity duration-700 ${
          introDone ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <Navbar />
        <Hero
          ready={introDone}
          onOpenChatbot={() => setChatOpen(true)}
          onOpenMusic={() => setMusicOpen(true)}
          onOpenTrivia={() => setTriviaOpen(true)}
        />
        <About />
        <ProjectTimeline />
        <Expertise />
        <Contact />
        <Footer />
      </div>

      {/* 3. Floating Widgets */}
      <ChatbotWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <MusicPlayerWidget open={musicOpen} onOpen={() => setMusicOpen(true)} onClose={() => setMusicOpen(false)} />
      <TriviaWidget open={triviaOpen} onClose={() => setTriviaOpen(false)} />
    </main>
  );
}
