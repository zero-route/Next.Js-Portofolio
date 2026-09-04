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

export default function VinylPlayerModal({
  open,
  song,
  onClose,
  onPrevious,
  onNext,
}) {
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!open || !song) return;

    let interval;

    function createPlayer() {
      if (!window.YT || !window.YT.Player) {
        return;
      }

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }

      playerRef.current = new window.YT.Player(
        playerContainerRef.current,
        {
          videoId: song.videoId,

          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },

          events: {
            onReady: (event) => {
              setReady(true);

              const videoDuration =
                event.target.getDuration();

              setDuration(videoDuration);

              event.target.playVideo();
            },

            onStateChange: (event) => {
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
                onNext?.();
              }
            },
          },
        }
      );
    }

    if (!window.YT) {
      const script =
        document.createElement("script");

      script.src =
        "https://www.youtube.com/iframe_api";

      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady =
        createPlayer;
    } else {
      createPlayer();
    }

    interval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.getCurrentTime ===
          "function"
      ) {
        setCurrentTime(
          playerRef.current.getCurrentTime()
        );
      }
    }, 250);

    return () => {
      clearInterval(interval);

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
    };
  }, [open, song?.videoId]);

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

    if (playerRef.current) {
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

  return (
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
            {/* Top */}
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
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/45 transition hover:bg-white/[0.05] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            {/* Hidden YouTube player */}
            <div className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-1 w-1 overflow-hidden">
              <div ref={playerContainerRef} />
            </div>

            {/* Vinyl */}
            <div className="relative mx-auto mt-7 aspect-square w-[min(72vw,300px)]">
              <div
                className={`vinyl ${
                  playing ? "vinyl-playing" : ""
                }`}
              >
                <div className="vinyl-grooves" />

                <div className="vinyl-label">
                  {song.thumbnail ? (
                    <img
                      src={song.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Music2
                      size={32}
                      className="text-white/50"
                    />
                  )}
                </div>

                <div className="vinyl-hole" />
              </div>
            </div>

            {/* Song info */}
            <div className="mt-7 text-center">
              <h2 className="truncate font-mono text-base font-semibold text-white">
                {song.title}
              </h2>

              <p className="mt-2 truncate font-mono text-xs text-white/40">
                {song.artist}
              </p>
            </div>

            {/* Progress */}
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
                className="music-slider w-full"
              />

              <div className="mt-2 flex justify-between font-mono text-[9px] text-white/30">
                <span>
                  {formatTime(currentTime)}
                </span>

                <span>
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-7">
              <button
                onClick={onPrevious}
                className="text-white/45 transition hover:scale-110 hover:text-white"
              >
                <SkipBack
                  size={23}
                  fill="currentColor"
                />
              </button>

              <button
                onClick={togglePlay}
                disabled={!ready}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition hover:scale-105 disabled:opacity-40"
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
                onClick={onNext}
                className="text-white/45 transition hover:scale-110 hover:text-white"
              >
                <SkipForward
                  size={23}
                  fill="currentColor"
                />
              </button>
            </div>

            {/* Bottom */}
            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[9px] text-white/20">
              <Volume2 size={13} />
              <span>VINYL PLAYER</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}