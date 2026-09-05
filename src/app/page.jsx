import Home from "@/components/section/Home";
import About from "@/components/section/About";

export default function Page() {
  return (
    <main>
      <section id="home">
        <Home />
      </section>

      <About />

      <section id="beyond" />
      <section id="projects" />
      <section id="contact" />
    </main>
  );
}