"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

let youtubeApiPromise = null;

function loadYouTubeAPI() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YouTube API requires browser"));
  }

  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousCallback === "function") {
        previousCallback();
      }

      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        reject(new Error("YouTube API failed to initialize"));
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;

      script.onerror = () => {
        youtubeApiPromise = null;
        reject(new Error("Failed to load YouTube API"));
      };

      document.body.appendChild(script);
    }
  });

  return youtubeApiPromise;
}

export default function VinylPlayerModal({
  open,
  song,
  onClose,
  onPrevious,
  onNext,
  onPlayingChange,
  onTimeChange,
  onDurationChange,
}) {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const songRef = useRef(song);
  const onNextRef = useRef(onNext);
  const onPreviousRef = useRef(onPrevious);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    songRef.current = song;
  }, [song]);

  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    onPreviousRef.current = onPrevious;
  }, [onPrevious]);

  useEffect(() => {
    onPlayingChange?.(playing);
  }, [playing, onPlayingChange]);

  useEffect(() => {
    onTimeChange?.(currentTime);
  }, [currentTime, onTimeChange]);

  useEffect(() => {
    onDurationChange?.(duration);
  }, [duration, onDurationChange]);

  useEffect(() => {
    if (!song?.videoId) return;

    let cancelled = false;
    let interval = null;

    const createPlayer = async () => {
      try {
        await loadYouTubeAPI();

        if (cancelled || !playerContainerRef.current) {
          return;
        }

        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch {}

          playerRef.current = null;
        }

        setReady(false);
        setPlaying(false);
        setCurrentTime(0);
        setDuration(0);

        playerRef.current = new window.YT.Player(
          playerContainerRef.current,
          {
            videoId: song.videoId,
            width: "1",
            height: "1",
            playerVars: {
              autoplay: 1,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              enablejsapi: 1,
            },
            events: {
              onReady: (event) => {
                if (cancelled) return;

                setReady(true);

                const videoDuration = event.target.getDuration();

                if (videoDuration) {
                  setDuration(videoDuration);
                }

                try {
                  event.target.playVideo();
                } catch {}
              },

              onStateChange: (event) => {
                if (cancelled) return;

                if (
                  event.data ===
                  window.YT.PlayerState.PLAYING
                ) {
                  setPlaying(true);

                  const videoDuration =
                    event.target.getDuration();

                  if (videoDuration) {
                    setDuration(videoDuration);
                  }
                }

                if (
                  event.data ===
                  window.YT.PlayerState.PAUSED
                ) {
                  setPlaying(false);
                }

                if (
                  event.data ===
                  window.YT.PlayerState.ENDED
                ) {
                  setPlaying(false);

                  if (typeof onNextRef.current === "function") {
                    onNextRef.current();
                  }
                }
              },
            },
          }
        );

        interval = setInterval(() => {
          if (
            playerRef.current &&
            typeof playerRef.current.getCurrentTime ===
              "function"
          ) {
            const time = playerRef.current.getCurrentTime();

            if (Number.isFinite(time)) {
              setCurrentTime(time);
            }
          }
        }, 250);
      } catch {
        setReady(false);
        setPlaying(false);
      }
    };

    createPlayer();

    return () => {
      cancelled = true;

      if (interval) {
        clearInterval(interval);
      }
    };
  }, [song?.videoId]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}

        playerRef.current = null;
      }
    };
  }, []);

  function togglePlay() {
    if (!playerRef.current || !ready) return;

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  function seek(event) {
    const value = Number(event.target.value);

    setCurrentTime(value);

    if (
      playerRef.current &&
      typeof playerRef.current.seekTo === "function"
    ) {
      playerRef.current.seekTo(value, true);
    }
  }

  function formatTime(value) {
    if (!Number.isFinite(value)) {
      return "0:00";
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function handlePrevious() {
    if (typeof onPreviousRef.current === "function") {
      onPreviousRef.current();
    }
  }

  function handleNext() {
    if (typeof onNextRef.current === "function") {
      onNextRef.current();
    }
  }

  return (
    <>
      <div className="pointer-events-none fixed left-[-9999px] top-[-9999px] h-px w-px overflow-hidden opacity-0">
        <div ref={playerContainerRef} />
      </div>

      <AnimatePresence>
        {open && song && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 px-4 backdrop-blur-2xl"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#09090d] px-6 pb-7 pt-5 shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                    Now Playing
                  </p>

                  <p className="mt-1 font-mono text-[10px] text-purple-300/70">
                    YouTube Music
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/45 transition hover:bg-white/[0.05] hover:text-white"
                  aria-label="Close music player"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="relative mx-auto mt-7 aspect-square w-[min(72vw,300px)]">
                <div
                  className={`vinyl ${
                    playing ? "vinyl-playing" : ""
                  }`}
                >
                  <div className="vinyl-shine" />

                  <div className="vinyl-grooves" />

                  <div className="vinyl-label">
                    {song.thumbnail ? (
                      <img
                        src={song.thumbnail}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <Music2
                        size={32}
                        className="text-white/50"
                      />
                    )}
                  </div>

                  <div className="vinyl-hole">
                    <div className="vinyl-hole-inner" />
                  </div>
                </div>
              </div>

              <div className="mt-7 text-center">
                <h2 className="truncate font-mono text-base font-semibold text-white">
                  {song.title}
                </h2>

                <p className="mt-2 truncate font-mono text-xs text-white/40">
                  {song.artist}
                </p>
              </div>

              <div className="mt-7">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(
                    currentTime,
                    duration || 0
                  )}
                  onChange={seek}
                  disabled={!duration}
                  className="music-slider w-full"
                />

                <div className="mt-2 flex justify-between font-mono text-[9px] text-white/30">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="text-white/45 transition hover:scale-110 hover:text-white"
                  aria-label="Previous song"
                >
                  <SkipBack
                    size={23}
                    fill="currentColor"
                  />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={!ready}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition hover:scale-105 disabled:opacity-40"
                  aria-label={
                    playing ? "Pause" : "Play"
                  }
                >
                  {playing ? (
                    <Pause
                      size={25}
                      fill="currentColor"
                    />
                  ) : (
                    <Play
                      size={25}
                      fill="currentColor"
                      className="ml-1"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="text-white/45 transition hover:scale-110 hover:text-white"
                  aria-label="Next song"
                >
                  <SkipForward
                    size={23}
                    fill="currentColor"
                  />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[9px] text-white/20">
                <Volume2 size={13} />
                <span>VINYL PLAYER</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .vinyl {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at center,
              #151515 0%,
              #080808 47%,
              #030303 100%
            );
          box-shadow:
            0 30px 70px rgba(0, 0, 0, 0.7),
            inset 0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 0 35px rgba(255, 255, 255, 0.025);
        }

        .vinyl-grooves {
          position: absolute;
          inset: 7%;
          border-radius: 50%;
          background:
            repeating-radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.11) 0px,
              rgba(255, 255, 255, 0.11) 1px,
              transparent 2px,
              transparent 6px
            );
          opacity: 0.55;
        }

        .vinyl-shine {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 50%;
          background:
            linear-gradient(
              125deg,
              transparent 0%,
              transparent 36%,
              rgba(255, 255, 255, 0.055) 43%,
              rgba(255, 255, 255, 0.012) 51%,
              transparent 58%,
              transparent 100%
            );
          pointer-events: none;
        }

        .vinyl-label {
          position: absolute;
          z-index: 4;
          left: 50%;
          top: 50%;
          width: 47%;
          height: 47%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.13);
          box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.45),
            0 0 0 5px rgba(0, 0, 0, 0.08);
          background: #111;
        }

        .vinyl-hole {
          position: absolute;
          z-index: 6;
          left: 50%;
          top: 50%;
          width: 12px;
          height: 12px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #020202;
          box-shadow:
            0 0 0 2px rgba(255, 255, 255, 0.08),
            inset 0 1px 2px rgba(255, 255, 255, 0.08);
        }

        .vinyl-hole-inner {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 3px;
          height: 3px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
        }

        .vinyl-playing {
          animation: vinylSpin 3.8s linear infinite;
        }

        .music-slider {
          appearance: none;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          outline: none;
        }

        .music-slider::-webkit-slider-thumb {
          appearance: none;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
        }

        .music-slider::-moz-range-thumb {
          width: 13px;
          height: 13px;
          border: 0;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
        }

        .music-slider:disabled {
          opacity: 0.35;
        }

        @keyframes vinylSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}