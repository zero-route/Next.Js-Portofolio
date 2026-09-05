"use client";

import { useState } from "react";
import Home from "@/components/section/Home";
import About from "@/components/section/About";
import Navigation from "@/components/layout/Navigation";
import IntroLoader from "@/components/intro/IntroLoader";

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading && (
        <IntroLoader
          onComplete={() => setLoading(false)}
        />
      )}

      <Navigation play={!loading} />

      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="beyond" />
      <section id="projects" />
      <section id="contact" />
    </main>
  );
}