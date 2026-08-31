"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/reactbits/ErrorBoundary";

const Lanyard = dynamic(() => import("@/components/reactbits/Lanyard"), { ssr: false });

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-[55vh] flex items-center px-6 sm:px-12 py-8 text-white overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mx-auto items-start">
        <div className="animate-about-fade">
          <p className="text-space-blue font-semibold tracking-wide animate-about-slide-1">
            Hi, I'm
          </p>
          <h2 className="mt-2 font-bold text-3xl sm:text-5xl leading-tight animate-about-slide-2">
            Dimas Aksa Oktapian
          </h2>
          <p className="mt-6 text-white/80 text-sm sm:text-base leading-relaxed max-w-md animate-about-slide-3">
            Sebagai mahasiswa Fakultas Ilmu Komputer, aku berfokus pada pengembangan teknologi
            yang tidak hanya fungsional, tetapi juga menghadirkan pengalaman digital yang
            menarik dan berdampak.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 animate-about-slide-4">
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white transition-all duration-300 ease-out bg-gradient-to-r from-[#1d4ed8] to-[#38bdf8] shadow-[0_0_24px_4px_rgba(59,130,246,0.55)] hover:shadow-[0_0_32px_6px_rgba(59,130,246,0.8)] hover:scale-105 active:scale-95"
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
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
          <p className="mt-3 text-white/50 text-xs animate-about-slide-4">
            Tarik kartunya dan lepaskan buat lihat efeknya.
          </p>
        </div>

        <div className="relative z-20 h-[40vh] md:h-[50vh] animate-about-scale">
          <ErrorBoundary>
            <Lanyard frontImage="/images/profile.jpg" imageFit="cover" />
          </ErrorBoundary>
        </div>
      </div>

      <style jsx>{`
        .animate-about-slide-1 {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-about-slide-2 {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }
        .animate-about-slide-3 {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-about-slide-4 {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
          opacity: 0;
        }
        .animate-about-scale {
          animation: scaleUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
