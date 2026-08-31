"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/reactbits/ErrorBoundary";

const Lanyard = dynamic(() => import("@/components/reactbits/Lanyard"), { ssr: false });

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-[55vh] flex items-center px-6 sm:px-12 py-8 text-white">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mx-auto items-start">
        <div>
          <p className="text-space-blue font-semibold tracking-wide">Hi, I'm</p>
          <h2 className="mt-2 font-bold text-3xl sm:text-5xl leading-tight">
            Dimas Aksa Oktapian
          </h2>
          <p className="mt-6 text-white/80 text-sm sm:text-base leading-relaxed max-w-md">
            Sebagai mahasiswa Fakultas Ilmu Komputer, aku berfokus pada pengembangan teknologi
            yang tidak hanya fungsional, tetapi juga menghadirkan pengalaman digital yang
            menarik dan berdampak.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition bg-gradient-to-r from-[#1d4ed8] to-[#38bdf8] shadow-[0_0_24px_4px_rgba(59,130,246,0.55)] hover:brightness-110"
              download
            >
              <span>View Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-white/50 text-xs">
            Tarik kartunya dan lepaskan buat lihat efeknya.
          </p>
        </div>

        <div className="h-[40vh] md:h-[50vh] rounded-[2.5rem] bg-white/5 border border-white/15 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <ErrorBoundary>
            <Lanyard frontImage="/images/profile.jpg" imageFit="cover" />
          </ErrorBoundary>
        </div>
      </div>
    </section>
  );
}
