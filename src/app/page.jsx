import Home from "@/components/section/Home";
import About from "@/components/section/About";
import Navigation from "@/components/layout/Navigation";

export default function Page() {
  return (
    <main>
      <Navigation />

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