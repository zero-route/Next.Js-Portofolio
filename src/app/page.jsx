"use client";

import IntroLoader from "@/app/components/intro/IntroLoader";
import Navigation from "@/app/components/layout/Navigation";
import HomeSection from "@/app/components/section/Home";
import About from "@/app/components/section/About";
import Beyond from "@/app/components/section/Beyond";
import PortofolioShowcase from "@/app/components/section/PortofolioShowcase";
import Contact from "@/app/components/section/Contact";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading ? (
        <IntroLoader onComplete={() => setLoading(false)} />
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}