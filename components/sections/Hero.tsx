"use client";

import { Icon } from "@/components/ui/Icon";
import { rolesList, skillsTyping, socials } from "@/lib/data";
import { useLoopTypingEffect } from "@/hooks/useTypingEffect";

export default function Hero({
  ready,
  onOpenChatbot,
  onOpenMusic,
  onOpenTrivia,
}: {
  ready: boolean;
  onOpenChatbot: () => void;
  onOpenMusic: () => void;
  onOpenTrivia: () => void;
}) {
  // Pemicu typing effect begitu loader selesai
  const roleCode = useLoopTypingEffect(rolesList, { startDelay: 100, start: ready });
  const skillCode = useLoopTypingEffect(skillsTyping, { startDelay: 300, start: ready });
  const roleLine = useLoopTypingEffect(rolesList, { startDelay: 100, withQuotes: false, start: ready });

  return (
    <section id="home" className="px-5 pb-16 pt-24 sm:pt-28">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="w-full text-left md:max-w-[520px]">
          {/* Status Badge */}
          <span
            className={`mb-3 inline-flex items-center gap-2 rounded-full border border-accent-cyan-light/30 bg-black/50 px-3.5 py-1.5 font-mono text-[11px] text-accent-cyan-light transition-all duration-500 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            Available for projects
          </span>

          {/* Floating Action Buttons */}
          <div
            className={`mb-4 flex flex-row items-center gap-2.5 transition-all duration-500 delay-75 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <FloatingBtn label="Open AI chatbot" onClick={onOpenChatbot}>
              <Icon name="robot" className="text-base" />
            </FloatingBtn>
            <FloatingBtn label="Open music player" onClick={onOpenMusic}>
              <Icon name="music" className="text-base" />
            </FloatingBtn>
            <FloatingBtn label="Open trivia quiz" onClick={onOpenTrivia}>
              <Icon name="brain" className="text-base" />
            </FloatingBtn>
          </div>

          {/* Header Title: SYSTEM ENGINEER */}
          <h1 className="mb-3 font-display text-[32px] leading-snug text-white md:text-[44px]">
            <span
              className={`block transition-all duration-500 delay-100 ${
                ready ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              SYSTEM
            </span>
            <span
              className={`block bg-gradient-text bg-clip-text text-transparent transition-all duration-500 delay-150 ${
                ready ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              ENGINEER
            </span>
          </h1>

          {/* Typing Subtitle */}
          <p className="mb-4 min-h-[20px] font-mono text-sm text-accent-cyan-light">
            {roleLine}
            <span className="ml-0.5 animate-blink-cursor text-accent-cyan-light">|</span>
          </p>

          {/* Description Text */}
          <p
            className={`mb-6 max-w-[480px] text-[13px] leading-relaxed text-text-secondary transition-all duration-500 delay-200 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            A passionate individual in various fields (Information Technology), I combine skills from
            various IT branches, such as [Network Engineer, Full Stack Dev, Penetration Testing,
            Automation Engineer, Robotic Engineer, and Electrical Engineer].
          </p>

          {/* CTA Buttons */}
          <div
            className={`mb-6 flex flex-wrap gap-3 transition-all duration-500 delay-300 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-accent px-4.5 py-2.5 font-mono text-xs text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,102,255,0.6)]"
            >
              View Projects ↗
            </a>
            <a
              href="mailto:iostream911@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-border-active bg-black/40 px-4.5 py-2.5 font-mono text-xs text-white transition-all hover:bg-accent-cyan-light/10"
            >
              Let&apos;s Talk ✉
            </a>
          </div>

          {/* Social Icons */}
          <div
            className={`flex gap-3 transition-all duration-500 delay-500 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                aria-label={s.name}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-all hover:border-accent-cyan-light hover:text-accent-cyan-light hover:scale-110"
              >
                <Icon name={s.icon} className="text-base" />
              </a>
            ))}
          </div>
        </div>

        {/* Code Editor Box */}
        <div
          className={`flex w-full justify-center md:flex-1 md:justify-end transition-all duration-700 delay-300 ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="w-full max-w-[340px] overflow-hidden rounded-[10px] border border-accent-cyan-light/20 bg-bg-secondary/70 font-mono shadow-[0_8px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,102,255,0.15)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/5 bg-bg-primary/60 px-3 py-2">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] text-text-muted">portfolio.js</span>
            </div>
            <div className="overflow-x-auto p-3.5 text-[11px] leading-relaxed">
              <pre className="whitespace-pre-wrap break-words">
                <code>
                  <span className="text-accent-purple">const</span>{" "}
                  <span className="text-accent-cyan-light">developer</span>{" "}
                  <span className="text-accent-purple">= {"{"}</span>
                  {"\n  "}
                  <span className="text-text-secondary">name :</span>{" "}
                  <span className="text-accent-cyan">&quot;Dimas Aksa Oktapian&quot;</span>,{"\n  "}
                  <span className="text-text-secondary">role :</span>{" "}
                  <span className="text-accent-cyan">{roleCode || '""'}</span>,{"\n  "}
                  <span className="text-text-secondary">skills :</span>{" "}
                  <span className="text-accent-cyan">{skillCode || '""'}</span>,{"\n  "}
                  <span className="text-text-secondary">passion :</span>{" "}
                  <span className="text-accent-cyan">&quot;DevSecOps Engineer&quot;</span>,{"\n  "}
                  <span className="text-text-secondary">status :</span>{" "}
                  <span className="text-accent-cyan">&quot;Building...&quot;</span>
                  {"\n"}
                  <span className="text-accent-purple">{"};"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-accent-cyan-light/30 bg-bg-secondary/85 text-accent-cyan-light shadow-[0_4px_15px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:scale-105 hover:border-accent-cyan-light hover:bg-gradient-accent hover:text-white hover:shadow-[0_0_15px_rgba(0,102,255,0.6)]"
    >
      {children}
    </button>
  );
}
