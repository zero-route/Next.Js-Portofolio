 "use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/reactbits/ErrorBoundary";

const Lanyard = dynamic(() => import("@/components/reactbits/Lanyard"), { ssr: false });

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-[55vh] flex items-center px-6 sm:px-12 py-8 text-white overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mx-auto items-start">
        <div>
          <p className="text-space-blue font-semibold tracking-wide about-reveal about-reveal--from-left">
            Hi, I'm
          </p>
          <h2 className="mt-2 font-bold text-3xl sm:text-5xl leading-tight about-reveal about-reveal--from-left about-delay-1">
            Dimas Aksa Oktapian
          </h2>
          <p className="mt-6 text-white/80 text-sm sm:text-base leading-relaxed max-w-md about-reveal about-reveal--fade about-delay-2">
            Memiliki hoby dan ketertarikan di bidang teknologi, terutama terkait kemanan, keandalan, dan efisiensi infrastruktur jaringan.
            Minta yang tinggi dibidang robotic, network configuration, electrical, dan penetration testing.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 about-reveal about-reveal--from-bottom about-delay-3">
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
                className="w-3.5 h-3.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
          <p className="mt-3 text-white/50 text-xs about-reveal about-reveal--from-bottom about-delay-4">
            Tarik kartunya dan lepaskan buat lihat efeknya.
          </p>
        </div>

        <div className="relative z-20 h-[48vh] md:h-[62vh] about-reveal about-reveal--scale about-delay-1">
          <ErrorBoundary>
            <Lanyard frontImage="/images/profile.jpg" imageFit="cover" />
          </ErrorBoundary>
        </div>
      </div>

      <style jsx>{`
        .about-reveal {
          opacity: 0;
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }
        .about-reveal--from-left {
          animation-name: aboutFromLeft;
        }
        .about-reveal--from-bottom {
          animation-name: aboutFromBottom;
        }
        .about-reveal--fade {
          animation-name: aboutFade;
        }
        .about-reveal--scale {
          animation-name: aboutScale;
          animation-duration: 1s;
        }
        .about-delay-1 {
          animation-delay: 0.15s;
        }
        .about-delay-2 {
          animation-delay: 0.3s;
        }
        .about-delay-3 {
          animation-delay: 0.45s;
        }
        .about-delay-4 {
          animation-delay: 0.6s;
        }
        @keyframes aboutFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes aboutFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes aboutFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes aboutScale {
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
