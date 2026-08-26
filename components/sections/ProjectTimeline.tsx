"use client";

import Image from "next/image";
import { timelineProjects } from "@/lib/data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function ProjectTimeline() {
  const header = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="resume" className="px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div ref={header.ref} className="mb-12 text-center md:mb-16">
          <h2 className="font-display text-[28px] text-white">Project</h2>
        </div>

        <div className="relative flex flex-col gap-10 md:block md:py-5">
          <div className="absolute left-1/2 top-[27px] bottom-[27px] hidden w-0.5 -translate-x-1/2 bg-accent-cyan-light/15 md:block" />

          {timelineProjects.map((item, i) => {
            const isLeft = i % 2 === 0;
            return <TimelineItem key={item.title} item={item} isLeft={isLeft} />;
          })}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  isLeft,
}: {
  item: (typeof timelineProjects)[number];
  isLeft: boolean;
}) {
  const reveal = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={reveal.ref}
      className={`relative transition-all duration-700 md:mb-[70px] md:w-[44%] ${
        isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
      } ${
        reveal.isVisible
          ? "translate-x-0 opacity-100"
          : isLeft
          ? "-translate-x-[60px] opacity-0"
          : "translate-x-[60px] opacity-0"
      }`}
    >
      <span
        className={`absolute top-5 z-[2] hidden h-3.5 w-3.5 rounded-full border-2 border-accent-cyan-light bg-bg-primary shadow-[0_0_10px_#38bdf8] md:block ${
          isLeft ? "-right-[47px]" : "-left-[47px]"
        }`}
      />
      <div className="group relative overflow-hidden rounded-[10px] border border-accent-cyan-light/15 bg-bg-secondary/60 p-4 backdrop-blur-md transition-colors hover:border-accent-cyan-light">
        <div className="relative h-auto w-full overflow-hidden rounded-lg">
          <Image
            src={item.img}
            alt={item.title}
            width={800}
            height={item.type === "chart" ? 112 : 400}
            className={`w-full rounded-lg ${item.type === "chart" ? "bg-[#0d1117] p-2" : ""}`}
            unoptimized={item.type === "chart"}
          />
        </div>
        <h4 className="mb-1.5 mt-3.5 font-display text-[15px] text-white">{item.title}</h4>
        <p className="text-xs leading-relaxed text-text-secondary">{item.desc}</p>
      </div>
    </div>
  );
}
