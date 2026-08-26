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
    <>
      <IntroLoader onDone={() => setIntroDone(true)} />

      <div
        className={`transition-opacity duration-700 ${
          introDone ? "visible opacity-100" : "invisible opacity-0"
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

      <ChatbotWidget open={chatOpen} onClose={() => setChatOpen(false)} />
      <MusicPlayerWidget open={musicOpen} onOpen={() => setMusicOpen(true)} onClose={() => setMusicOpen(false)} />
      <TriviaWidget open={triviaOpen} onClose={() => setTriviaOpen(false)} />
    </>
  );
}
