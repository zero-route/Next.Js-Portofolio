"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useOnceTypingEffect } from "@/hooks/useTypingEffect";

const ABOUT_TEXT =
  "passionate ndividual in various fields of Information Technology. I combine skills from various IT branches to build reliable systems and clean digital experiences — from network infrastructure to full-stack development.";

export default function About() {
  const header = useRevealOnScroll<HTMLDivElement>();
  const photo = useRevealOnScroll<HTMLDivElement>();
  const greet = useRevealOnScroll<HTMLParagraphElement>();
  const name = useRevealOnScroll<HTMLHeadingElement>();
  const desc = useRevealOnScroll<HTMLParagraphElement>(0.3);
  const stat1 = useRevealOnScroll<HTMLDivElement>();
  const stat2 = useRevealOnScroll<HTMLDivElement>();
  const stat3 = useRevealOnScroll<HTMLDivElement>();

  const { display: typedDesc, done } = useOnceTypingEffect(ABOUT_TEXT, {
    speed: 15,
    startDelay: 200,
    start: desc.isVisible,
  });

  const [repoCount, setRepoCount] = useState<string>("0");

  useEffect(() => {
    fetch("https://api.github.com/users/zero-route")
      .then((res) => res.json())
      .then((data) => setRepoCount(String(data.public_repos ?? "-")))
      .catch(() => setRepoCount("-"));
  }, []);

  return (
    <section id="about" className="px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div
          ref={header.ref}
          className={`mb-12 text-center transition-all duration-700 ${
            header.isVisible ? "scale-100 opacity-100" : "scale-[0.6] opacity-0"
          }`}
        >
          <h2 className="mb-2 font-display text-[28px] text-white">About Me</h2>
          <p className="text-[13px] text-text-secondary">Transforming ideas into digital experiences</p>
        </div>

        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
          <div
            ref={photo.ref}
            className={`transition-all duration-500 ${
              photo.isVisible ? "scale-100 opacity-100" : "scale-[0.6] opacity-0"
            }`}
          >
            <Image
              src="/asset/profile.jpg"
              alt="Dimas Aksa Oktapian"
              width={180}
              height={180}
              className="h-[180px] w-[180px] rounded-full border-2 border-border-active object-cover shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            />
          </div>

          <div className="text-center md:max-w-[520px] md:text-left">
            <p
              ref={greet.ref}
              className={`mb-1.5 font-mono text-[13px] text-accent-cyan-light transition-all duration-700 ${
                greet.isVisible ? "translate-x-0 opacity-100" : "-translate-x-[60px] opacity-0"
              }`}
            >
              Hello, I&apos;m
            </p>
            <h3
              ref={name.ref}
              className={`mb-4 font-display text-xl text-white transition-all delay-150 duration-700 ${
                name.isVisible ? "translate-x-0 opacity-100" : "translate-x-[60px] opacity-0"
              }`}
            >
              Dimas Aksa Oktapian
            </h3>
            <p
              ref={desc.ref}
              className="mx-auto mb-6 max-w-[480px] text-[13px] leading-relaxed text-text-secondary md:mx-0"
            >
              {typedDesc}
              {!done && desc.isVisible && (
                <span className="ml-0.5 animate-blink-cursor text-accent-cyan-light">|</span>
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href="/asset/CV-DIMAS.pdf"
                download="CV-Dimas-Aksa-Oktapian.pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-accent px-4.5 py-2.5 font-mono text-xs text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]"
              >
                Download CV <Icon name="download" />
              </a>
              <a
                href="https://github.com/zero-route/Dims"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-border-active bg-black/40 px-4.5 py-2.5 font-mono text-xs text-white"
              >
                Main Project <Icon name="github" fromSkillSet />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard reveal={stat1} icon="code" number="12" label="Total Projects" desc="Innovative web solutions crafted" />
          <StatCard reveal={stat2} icon="coffee" number="∞" label="Coffee" desc="Professional skills validated" />
          <StatCard reveal={stat3} icon="github" number={repoCount} label="Public Repository" desc="GitHub contributions" />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  reveal,
  icon,
  number,
  label,
  desc,
}: {
  reveal: ReturnType<typeof useRevealOnScroll<HTMLDivElement>>;
  icon: string;
  number: string;
  label: string;
  desc: string;
}) {
  return (
    <div
      ref={reveal.ref}
      className={`rounded-[10px] border border-accent-cyan-light/15 bg-bg-secondary/60 p-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-accent-cyan-light hover:shadow-[0_0_12px_rgba(56,189,248,0.3)] ${
        reveal.isVisible ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0"
      }`}
    >
      <Icon name={icon} className="mx-auto mb-2.5 text-lg text-accent-cyan-light" />
      <h3 className="mb-1 font-display text-[26px] text-white">{number}</h3>
      <p className="mb-1 text-[13px] text-white">{label}</p>
      <span className="text-[11px] text-text-muted">{desc}</span>
    </div>
  );
}
