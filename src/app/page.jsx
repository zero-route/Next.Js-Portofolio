"use client";

import { useState } from "react";

import IntroLoader from "@/components/intro/IntroLoader";
import Navigation from "@/components/layout/Navigation";
import HomeSection from "@/components/section/Home";
import About from "@/components/section/About";
import Beyond from "@/components/section/Beyond";
import PortofolioShowcase from "@/components/section/PortofolioShowcase";
import Contact from "@/components/section/Contact";

const renderComponent = (Component, name) => {
  if (!Component || typeof Component !== "function") {
    return (
      <div style={{ padding: "20px", color: "red", border: "1px dashed red" }}>
        Error: Export di file <b>{name}</b> belum benar / undefined.
      </div>
    );
  }
  return <Component />;
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading ? (
        IntroLoader && typeof IntroLoader === "function" ? (
          <IntroLoader onComplete={() => setLoading(false)} />
        ) : (
          <div style={{ padding: "20px", color: "red" }}>
            Error: Export di IntroLoader belum benar.
            <button onClick={() => setLoading(false)} style={{ marginLeft: "10px" }}>
              Buka Website
            </button>
          </div>
        )
      ) : (
        <>
          {renderComponent(Navigation, "Navigation")}

          <section id="home">
            {renderComponent(HomeSection, "Home")}
          </section>

          <section id="about">
            {renderComponent(About, "About")}
          </section>

          <section id="beyond">
            {renderComponent(Beyond, "Beyond")}
          </section>

          <section id="projects">
            {renderComponent(PortofolioShowcase, "PortofolioShowcase")}
          </section>

          <section id="contact">
            {renderComponent(Contact, "Contact")}
          </section>
        </>
      )}
    </main>
  );
}
