"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { webProjects, tools, skillGroups } from "@/lib/data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const TABS = ["project", "tools", "skills"] as const;
type Tab = (typeof TABS)[number];

export default function Expertise() {
  const [activeTab, setActiveTab] = useState<Tab>("project");
  const [replayKey, setReplayKey] = useState(0);
  const section = useRevealOnScroll<HTMLElement>();

  function handleTabClick(tab: Tab) {
    setActiveTab(tab);
    setReplayKey((k) => k + 1);
  }

  return (
    <section
      id="expertise"
      ref={section.ref as React.RefObject<HTMLElement>}
      className="px-5 py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <h2 className="mb-3 bg-gradient-text bg-clip-text font-display text-[28px] text-transparent">
            Expertise
          </h2>
          <p className="mx-auto max-w-[500px] text-[13px] text-text-secondary">
            All the projects, tools, and skills that I used in various fields of deployment.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="relative flex w-full max-w-[420px] rounded-[10px] border border-accent-cyan-light/15 bg-bg-secondary/60 p-1 backdrop-blur-md">
            <div
              className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(33.333%-4px)] rounded-lg bg-gradient-accent shadow-[0_0_15px_rgba(0,102,255,0.4)] transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateX(${TABS.indexOf(activeTab) * 100}%)` }}
            />
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`relative z-[2] flex-1 rounded-lg px-1.5 py-2.5 font-mono text-[11px] transition-colors ${
                  activeTab === tab ? "text-white" : "text-text-secondary"
                }`}
              >
                {tab === "project" ? "Web Project" : tab === "tools" ? "Tools" : "Skills"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "project" && (
          <div key={replayKey} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {webProjects.map((p, i) => (
              <div
                key={p.title}
                className="animate-slide-up rounded-[10px] border border-accent-cyan-light/15 bg-bg-secondary/60 p-3.5 opacity-0 transition-transform hover:scale-105 hover:border-border-active"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <Image src={p.img} alt={p.title} width={600} height={400} className="mb-3 w-full rounded-lg" />
                <h4 className="mb-1.5 font-display text-sm text-white">{p.title}</h4>
                <p className="text-xs leading-relaxed text-text-secondary">{p.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tools" && (
          <div key={replayKey} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tools.map((t, i) => (
              <div
                key={t.name}
                className={`animate-slide-up rounded-[10px] border border-accent-cyan-light/15 bg-bg-secondary/60 p-4.5 opacity-0 transition-transform hover:scale-105 hover:border-border-active ${
                  i % 2 === 0 ? "" : ""
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="mb-2 block bg-gradient-text bg-clip-text font-display text-[22px] text-transparent">
                  {t.number}
                </span>
                <h4 className="mb-1.5 font-display text-sm text-white">{t.name}</h4>
                <p className="text-xs leading-relaxed text-text-secondary">{t.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div key={replayKey}>
            {skillGroups.map((group) => (
              <div key={group.title} className="mb-9">
                <h3 className="mb-4 font-mono text-[13px] uppercase tracking-wide text-accent-cyan-light">
                  {group.title}
                </h3>
                <div className="grid grid-cols-3 gap-3.5 sm:grid-cols-6">
                  {group.items.map((item, i) => (
                    <div
                      key={item.name}
                      className="flex animate-slide-up flex-col items-center gap-2 rounded-[10px] border border-accent-cyan-light/15 bg-bg-secondary/60 px-2 py-4 opacity-0 transition-transform hover:-translate-y-1 hover:scale-110 hover:border-accent-cyan-light"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <Icon name={item.icon} fromSkillSet className="text-[28px] text-white" />
                      <span className="text-center text-[11px] text-text-secondary">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
