"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Music2,
  ArrowUpRight,
  Mail,
  Github,
  Gitlab,
  Linkedin,
  Send,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";
import AstreaChatModal from "@/components/intro/AstreaChatModal";
import MusicSearchModal from "@/components/intro/MusicSearchModal";
import VinylPlayerModal from "@/components/intro/VinylPlayerModal";

const roleList = [
  "Website Developer",
  "Network Engineer",
  "Penetration Testing",
  "Full-Stack Developer",
  "Automation Engineer",
  "Robotic Engineer",
  "Electrical Engineer",
];

const skillsList = [
  "HTML5",
  "CSS3",
  "Tailwind-CSS",
  "JavaScript",
  "TypeScript",
  "Next.Js",
  "Vue",
  "Node.js",
  "PHP",
  "Laravel",
  "Ruby",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "GitLab",
  "GitHub",
  "Python",
  "C++",
  "C",
  "Java",
  "VS-Code",
];

function useTypewriter(
  words,
  typingSpeed = 120,
  deletingSpeed = 75,
  pause = 1800
) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!deleting && text.length < currentWord.length) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (!deleting && text === currentWord) {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(text.slice(0, -1));
      }, deletingSpeed);
    } else if (deleting && text.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pause,
  ]);

  return text;
}

export default function Home() {
  const role = useTypewriter(roleList, 120, 75, 1900);
  const skill = useTypewriter(skillsList, 110, 70, 1700);

  const [astreaOpen, setAstreaOpen] = useState(false);

  const [musicSearchOpen, setMusicSearchOpen] = useState(false);
  const [vinylOpen, setVinylOpen] = useState(false);

  const [currentSong, setCurrentSong] = useState(null);
  const [musicQueue, setMusicQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicCurrentTime, setMusicCurrentTime] = useState(0);
  const [musicDuration, setMusicDuration] = useState(0);

  const handleSelectSong = (song, queue = []) => {
    if (!song) return;

    const selectedQueue = queue.length ? queue : [song];

    const index = selectedQueue.findIndex(
      (item) => item.videoId === song.videoId
    );

    setMusicQueue(selectedQueue);
    setCurrentIndex(index >= 0 ? index : 0);
    setCurrentSong(song);
    setMusicSearchOpen(false);
    setVinylOpen(true);
  };

  const handleNextSong = () => {
    if (!musicQueue.length) return;

    const nextIndex =
      currentIndex >= musicQueue.length - 1 ? 0 : currentIndex + 1;

    setCurrentIndex(nextIndex);
    setCurrentSong(musicQueue[nextIndex]);
  };

  const handlePreviousSong = () => {
    if (!musicQueue.length) return;

    const previousIndex =
      currentIndex <= 0 ? musicQueue.length - 1 : currentIndex - 1;

    setCurrentIndex(previousIndex);
    setCurrentSong(musicQueue[previousIndex]);
  };

  const openVinylPlayer = () => {
    if (!currentSong) {
      setMusicSearchOpen(true);
      return;
    }

    setMusicSearchOpen(false);
    setVinylOpen(true);
  };

  const openMusicSearch = () => {
    setVinylOpen(false);
    setMusicSearchOpen(true);
  };

  const introIcons = [Bot, Music2];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/zero-route",
      label: "GitHub",
    },
    {
      icon: Gitlab,
      href: "https://gitlab.com/",
      label: "GitLab",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
    },
    {
      icon: Send,
      href: "https://t.me/",
      label: "Telegram",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    {
      icon: Music2,
      href: "https://www.tiktok.com/",
      label: "TikTok",
    },
  ];

  const paragraph =
    "A passionate individual in various fields of Information Technology. Combining expertise across multiple IT disciplines, including Network Engineering, Full-Stack Development, Penetration Testing, Automation, Robotics, and Electrical Engineering.";

  const paragraphWords = paragraph.split(" ");

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030305] px-5 pb-24 pt-32 text-white sm:px-7 sm:pt-40 lg:px-10 lg:pt-44 xl:px-14 xl:pt-48">
      <div className="mx-auto w-full max-w-[1550px]">
        <div className="home-layout">
          <div className="min-w-0">
            <motion.div
              initial="hidden"
              animate="visible"
              className="mb-5 flex gap-3 sm:mb-6"
            >
              {introIcons.map((Icon, index) => {
                const isMusicIcon = index === 1;
                const isBotIcon = index === 0;

                return (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => {
                      if (isBotIcon) {
                        setAstreaOpen(true);
                      }

                      if (isMusicIcon) {
                        openMusicSearch();
                      }
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-label={
                      isBotIcon
                        ? "Open Astrea AI"
                        : "Open music search"
                    }
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/[0.08] hover:shadow-[0_8px_25px_rgba(139,92,246,0.15)] sm:h-11 sm:w-11"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      className="text-white transition-colors duration-300 hover:text-purple-200"
                    />
                  </motion.button>
                );
              })}
            </motion.div>

            <div className="mb-7 leading-none sm:mb-8">
              <motion.h1
                initial={{ opacity: 0, x: -65 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1.15,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-mono text-[3rem] font-black tracking-[-0.08em] text-[#f4f4f5] sm:text-[4rem] lg:text-[4.2rem] xl:text-[4.8rem]"
              >
                DevSecOps
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, x: 65 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1.15,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-3 font-mono text-[3rem] font-black tracking-[-0.08em] text-white sm:mt-4 sm:text-[4rem] lg:text-[4.2rem] xl:text-[4.8rem]"
              >
                ENGINEER
              </motion.h2>
            </div>

            <motion.p
              initial="hidden"
              animate="visible"
              className="max-w-[680px] font-mono text-[12px] leading-6 text-white/55 sm:text-[13px] sm:leading-7 lg:max-w-[650px] lg:text-[14px]"
            >
              {paragraphWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.95 + index * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mr-1.5 inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 1.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 flex flex-wrap gap-3 sm:mt-8"
            >
              <a
                href="#projects"
                className="group relative flex items-center gap-2 overflow-hidden rounded-xl border border-[#a78bfa]/30 bg-gradient-to-r from-[#6d28d9] via-[#8b5cf6] to-[#c4b5fd] px-5 py-3 font-mono text-[12px] font-semibold text-white shadow-[0_0_25px_rgba(124,58,237,0.18)] transition-all duration-300 hover:scale-[1.025] hover:shadow-[0_0_35px_rgba(139,92,246,0.3)]"
              >
                <span className="button-shine absolute inset-0" />
                <span className="relative">View Projects</span>
                <ArrowUpRight
                  size={16}
                  className="relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.035] px-5 py-3 font-mono text-[12px] font-semibold text-white/75 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
              >
                Let&apos;s Talk
                <Mail size={15} />
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap gap-3"
            >
              {socialLinks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 2.1 + index * 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-white/55 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-purple-500/[0.08] hover:text-white"
                  >
                    <Icon size={16} strokeWidth={1.7} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.4,
              delay: 2.3,
              ease: "easeOut",
            }}
            className="portfolio-wrapper"
          >
            <div className="portfolio-card overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090911] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <div className="flex h-10 items-center justify-between border-b border-white/[0.07] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f87171]" />
                  <span className="h-2 w-2 rounded-full bg-[#facc15]" />
                  <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
                </div>

                <span className="font-mono text-[9px] text-white/30">
                  portfolio.js
                </span>
              </div>

              <div className="min-h-[195px] p-5 font-mono text-[11px] leading-[1.8] sm:p-6 sm:text-[12px]">
                <div>
                  <span className="font-semibold text-[#c084fc]">const</span>{" "}
                  <span className="font-semibold text-[#60a5fa]">
                    developer
                  </span>{" "}
                  <span className="text-white/60">= {"{"}</span>
                </div>

                <div className="pl-4 text-white/60">
                  <div>
                    Nama <span className="text-white/40">:</span>{" "}
                    <span className="text-[#86efac]">
                      &quot;Dimas Aksa Oktapian&quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Role <span className="text-white/40">:</span>{" "}
                    <span className="text-[#86efac]">
                      &quot;{role}
                      <span className="ml-[1px] inline-block h-[12px] w-[1px] animate-pulse bg-[#d8b4fe] align-middle" />
                      &quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Skills <span className="text-white/40">:</span>{" "}
                    <span className="text-[#86efac]">
                      &quot;{skill}
                      <span className="ml-[1px] inline-block h-[12px] w-[1px] animate-pulse bg-[#d8b4fe] align-middle" />
                      &quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Passion <span className="text-white/40">:</span>{" "}
                    <span className="text-[#86efac]">
                      &quot;DevSecOps Engineer&quot;
                    </span>
                    <span className="text-white/40">,</span>
                  </div>

                  <div>
                    Status <span className="text-white/40">:</span>{" "}
                    <span className="text-[#86efac]">
                      &quot;Building........&quot;
                    </span>
                  </div>
                </div>

                <div className="text-white/60">{"};"}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AstreaChatModal
        open={astreaOpen}
        onClose={() => setAstreaOpen(false)}
      />

      <MusicSearchModal
        open={musicSearchOpen}
        onClose={() => setMusicSearchOpen(false)}
        onSelect={handleSelectSong}
      />

      <VinylPlayerModal
        open={vinylOpen}
        song={currentSong}
        onClose={() => setVinylOpen(false)}
        onPrevious={handlePreviousSong}
        onNext={handleNextSong}
        onPlayingChange={setMusicPlaying}
        onTimeChange={setMusicCurrentTime}
        onDurationChange={setMusicDuration}
      />

      {currentSong && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-3 left-3 right-3 z-[9998] sm:bottom-5 sm:left-5 sm:right-5"
        >
          <div className="mx-auto flex max-w-[1280px] items-center gap-3 rounded-2xl border border-purple-400/20 bg-[#07070d]/95 px-3 py-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:gap-4 sm:px-5 sm:py-3">
            <button
              type="button"
              onClick={openVinylPlayer}
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black shadow-[0_0_20px_rgba(139,92,246,0.12)] sm:h-12 sm:w-12">
                {currentSong.thumbnail ? (
                  <img
                    src={currentSong.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Music2 size={18} className="text-white/40" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-mono text-[11px] font-semibold text-white sm:text-xs">
                  {currentSong.title}
                </p>

                <p className="mt-0.5 truncate font-mono text-[9px] text-white/35 sm:text-[10px]">
                  {currentSong.artist}
                </p>
              </div>
            </button>

            <div className="hidden items-center gap-5 sm:flex">
              <button
                type="button"
                onClick={handlePreviousSong}
                className="text-white/50 transition hover:scale-110 hover:text-white"
                aria-label="Previous song"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 5h2v14H6zM19 5v14l-9-7z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={openVinylPlayer}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                aria-label="Open player"
              >
                {musicPlaying ? (
                  <span className="flex gap-[3px]">
                    <span className="h-4 w-[3px] rounded-full bg-black" />
                    <span className="h-4 w-[3px] rounded-full bg-black" />
                  </span>
                ) : (
                  <span className="ml-0.5 border-y-[7px] border-y-transparent border-l-[10px] border-l-black" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNextSong}
                className="text-white/50 transition hover:scale-110 hover:text-white"
                aria-label="Next song"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 5h2v14h-2zM5 5v14l9-7z" />
                </svg>
              </button>
            </div>

            <div className="hidden w-[180px] shrink-0 lg:block">
              <div className="flex items-center justify-between font-mono text-[8px] text-white/25">
                <span>
                  {Math.floor(musicCurrentTime / 60)}:
                  {Math.floor(musicCurrentTime % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>

                <span>
                  {Math.floor(musicDuration / 60)}:
                  {Math.floor(musicDuration % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </div>

              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white transition-[width] duration-200"
                  style={{
                    width:
                      musicDuration > 0
                        ? `${Math.min(
                            100,
                            (musicCurrentTime / musicDuration) * 100
                          )}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .home-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 42px;
          align-items: center;
        }

        .portfolio-wrapper {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
        }

        .portfolio-card {
          width: 100%;
        }

        .button-shine {
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(255, 255, 255, 0.22) 48%,
            transparent 70%
          );
          transform: translateX(-120%);
          animation: buttonShine 4.5s ease-in-out infinite;
        }

        @keyframes buttonShine {
          0%,
          65%,
          100% {
            transform: translateX(-120%);
          }

          82% {
            transform: translateX(120%);
          }
        }

        @media (min-width: 900px) {
          .home-layout {
            grid-template-columns: minmax(0, 1fr) minmax(400px, 0.78fr);
            gap: 55px;
          }

          .portfolio-wrapper {
            max-width: 540px;
            margin: 0;
            align-self: center;
          }
        }

        @media (min-width: 1200px) {
          .home-layout {
            grid-template-columns: minmax(0, 1fr) minmax(470px, 0.82fr);
            gap: 80px;
          }

          .portfolio-wrapper {
            max-width: 580px;
          }
        }
      `}</style>
    </section>
  );
}