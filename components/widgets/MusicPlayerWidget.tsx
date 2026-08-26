"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";

type SearchItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { default: { url: string }; medium?: { url: string } };
  };
};

function decodeHtml(text: string) {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayerWidget({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const { playerRef, isReady, onStateChangeRef } = useYouTubePlayer("yt-player-hidden");

  const [view, setView] = useState<"search" | "nowplaying">("search");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const queueRef = useRef<SearchItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showMini, setShowMini] = useState(false);

  const [current, setCurrent] = useState<{ title: string; channel: string; thumb: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);

  const pendingVideoId = useRef<string | null>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // hubungkan callback state-change YouTube player
  useEffect(() => {
    onStateChangeRef.current = (event: any) => {
      const YT = window.YT;
      const buffering = event.data === YT.PlayerState.BUFFERING;
      setIsBuffering(buffering);
      if (!buffering) setLoadingIndex(null);

      const playing = event.data === YT.PlayerState.PLAYING;
      setIsPlaying(playing);

      if (playing) startProgressTracking();
      else stopProgressTracking();

      if (event.data === YT.PlayerState.ENDED) playNext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isReady) {
      playerRef.current?.setVolume?.(volume);
      if (pendingVideoId.current) {
        setLoadingIndex(-1);
        playerRef.current.loadVideoById(pendingVideoId.current);
        setIsPlaying(true);
        setShowMini(true);
        setView("nowplaying");
        pendingVideoId.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  function startProgressTracking() {
    stopProgressTracking();
    progressInterval.current = setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== "function") return;
      const cur = p.getCurrentTime();
      const dur = p.getDuration();
      if (dur > 0) {
        setProgress((cur / dur) * 100);
        setCurrentTime(cur);
        setDuration(dur);
      }
    }, 500);
  }

  function stopProgressTracking() {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }

  async function searchMusic(q: string) {
    setSearching(true);
    try {
      const res = await fetch(`/api/music/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const items: SearchItem[] = (data.items || []).filter((it: SearchItem) => it?.id?.videoId);
      queueRef.current = items;
      setResults(items);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }

  function playTrackAt(idx: number) {
    const item = queueRef.current[idx];
    if (!item) return;
    setCurrentIndex(idx);

    const thumb = item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url;
    const title = decodeHtml(item.snippet.title);
    const channel = decodeHtml(item.snippet.channelTitle);
    setCurrent({ title, channel, thumb });

    if (!isReady) {
      pendingVideoId.current = item.id.videoId;
      setLoadingIndex(idx);
      return;
    }

    setLoadingIndex(idx);
    playerRef.current.loadVideoById(item.id.videoId);
    setIsPlaying(true);
    setShowMini(true);
    setView("nowplaying");
  }

  function togglePlayPause() {
    const p = playerRef.current;
    if (!p) return;
    if (isPlaying) p.pauseVideo();
    else p.playVideo();
  }

  function playNext() {
    if (queueRef.current.length === 0) return;
    playTrackAt((currentIndex + 1) % queueRef.current.length);
  }

  function playPrev() {
    if (queueRef.current.length === 0) return;
    playTrackAt((currentIndex - 1 + queueRef.current.length) % queueRef.current.length);
  }

  function handleSeek(value: number) {
    const p = playerRef.current;
    if (!p || typeof p.getDuration !== "function") return;
    p.seekTo((value / 100) * p.getDuration(), true);
  }

  function handleVolume(value: number) {
    setVolume(value);
    playerRef.current?.setVolume?.(value);
  }

  return (
    <>
      {/* Overlay panel pencarian & now playing */}
      <div
        className={`fixed inset-0 z-[1000] flex items-end justify-center bg-black/75 backdrop-blur-sm transition-opacity duration-300 sm:items-center ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className={`flex max-h-[82vh] w-full max-w-[420px] flex-col overflow-hidden rounded-t-[18px] border border-accent-cyan-light/25 bg-gradient-to-br from-bg-secondary to-bg-primary shadow-[0_-10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,102,255,0.15)] transition-transform duration-300 sm:rounded-2xl ${
            open ? "translate-y-0" : "translate-y-8"
          }`}
        >
          {view === "search" && (
            <>
              <div className="flex items-center justify-between border-b border-accent-cyan-light/15 px-5 py-4">
                <h3 className="flex items-center gap-2 font-display text-sm text-white">
                  <Icon name="disc" /> Music Player
                </h3>
                <button onClick={onClose} aria-label="Close music player" className="text-text-secondary">
                  <Icon name="xmark" />
                </button>
              </div>

              <div className="flex gap-2 p-3.5">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && query.trim() && searchMusic(query.trim())}
                  placeholder="Cari lagu, artis..."
                  aria-label="Search song or artist"
                  className="flex-1 rounded-lg border border-border-subtle bg-black/60 px-3 py-2.5 text-[13px] text-white outline-none focus:border-accent-cyan-light"
                />
                <button
                  onClick={() => query.trim() && searchMusic(query.trim())}
                  aria-label="Search"
                  className="w-10 rounded-lg bg-gradient-accent text-white"
                >
                  <Icon name="search" className="mx-auto" />
                </button>
              </div>

              <div className="thin-scroll min-h-[200px] flex-1 overflow-y-auto px-3.5 pb-3">
                {searching && <p className="mt-8 text-center text-xs text-text-muted">Mencari...</p>}
                {!searching && results.length === 0 && (
                  <p className="mt-8 text-center text-xs text-text-muted">
                    Ketik lagu yang ingin dicari, lalu tekan enter.
                  </p>
                )}
                {results.map((item, i) => (
                  <button
                    key={item.id.videoId + i}
                    onClick={() => playTrackAt(i)}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-accent-cyan-light/[0.08]"
                  >
                    <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.snippet.thumbnails.default.url} alt="" fill unoptimized className="object-cover" />
                      {loadingIndex === i && (isBuffering || !isReady) && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        </span>
                      )}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-xs text-white">{decodeHtml(item.snippet.title)}</span>
                      <span className="truncate text-[11px] text-text-muted">{decodeHtml(item.snippet.channelTitle)}</span>
                    </span>
                  </button>
                ))}
              </div>

              {current && (
                <button
                  onClick={() => currentIndex >= 0 && setView("nowplaying")}
                  className="flex items-center gap-3 border-t border-accent-cyan-light/15 bg-bg-secondary/70 px-5 py-3.5 text-left"
                >
                  <span className="relative h-[42px] w-[42px] flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={current.thumb} alt="" fill unoptimized className="object-cover" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-xs text-white">{current.title}</span>
                    <span className="truncate text-[10px] text-text-muted">{current.channel}</span>
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-accent text-white"
                  >
                    <Icon name={isPlaying ? "pause" : "play"} />
                  </span>
                </button>
              )}
            </>
          )}

          {view === "nowplaying" && current && (
            <>
              <div className="flex items-center justify-between border-b border-accent-cyan-light/15 px-5 py-4">
                <button onClick={() => setView("search")} aria-label="Back to search" className="text-text-secondary">
                  <Icon name="chevronDown" />
                </button>
                <span className="font-display text-xs text-text-secondary">Now Playing</span>
                <button onClick={onClose} aria-label="Close music player" className="text-text-secondary">
                  <Icon name="xmark" />
                </button>
              </div>

              <div className="flex justify-center px-5 pb-2.5 pt-8">
                <div
                  className={`relative h-[180px] w-[180px] rounded-full border-[3px] border-accent-cyan-light/30 shadow-[0_0_30px_rgba(0,102,255,0.25)] ${
                    isPlaying ? "animate-spin-vinyl" : ""
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, #1a1a1a 0%, #0a0a0a 35%, #1a1a1a 36%, #0a0a0a 60%, #1a1a1a 61%, #050505 100%)",
                  }}
                >
                  <span className="absolute left-1/2 top-1/2 z-[2] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan-light shadow-[0_0_10px_#38bdf8]" />
                  <span className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-white/15">
                    <Image src={current.thumb} alt="" fill unoptimized className="object-cover" />
                  </span>
                </div>
              </div>

              <h4 className="mt-5 truncate px-5 text-center font-display text-[15px] text-white">{current.title}</h4>
              <p className="mt-1 text-center text-xs text-text-secondary">{current.channel}</p>

              <div className="flex items-center gap-2.5 px-5 pt-5">
                <span className="min-w-[32px] font-mono text-[10px] text-text-muted">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  aria-label="Seek track position"
                  className="player-range flex-1"
                />
                <span className="min-w-[32px] font-mono text-[10px] text-text-muted">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-6 px-5 py-6">
                <button onClick={playPrev} aria-label="Previous track" className="text-lg text-white">
                  <Icon name="prev" />
                </button>
                <button
                  onClick={togglePlayPause}
                  aria-label="Play or pause"
                  className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-accent text-lg text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                >
                  <Icon name={isPlaying ? "pause" : "play"} />
                </button>
                <button onClick={playNext} aria-label="Next track" className="text-lg text-white">
                  <Icon name="next" />
                </button>
              </div>

              <div className="flex items-center gap-2.5 px-5 pb-5 text-text-secondary">
                <Icon name="volume" />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => handleVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="player-range flex-1"
                />
              </div>
            </>
          )}

          <div id="yt-player-hidden" className="absolute h-0 w-0 overflow-hidden" />
        </div>
      </div>

      {/* Mini player */}
      {current && (
        <div
          onClick={() => {
            setView("nowplaying");
            onOpen();
          }}
          className={`fixed inset-x-0 bottom-0 z-[900] cursor-pointer border-t border-accent-cyan-light/20 bg-gradient-to-br from-bg-secondary to-bg-primary shadow-[0_-6px_24px_rgba(0,0,0,0.5)] transition-all duration-300 sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[92%] sm:max-w-[640px] sm:-translate-x-1/2 sm:rounded-2xl sm:overflow-hidden ${
            showMini && !open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="h-[3px] w-full bg-accent-cyan-light/10">
            <div className="h-full bg-gradient-accent shadow-[0_0_8px_#38bdf8] transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="mx-auto flex max-w-[1100px] items-center gap-3 px-3.5 py-2.5 sm:px-4.5">
            <span
              className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-accent-cyan-light/30 ${
                isPlaying ? "animate-spin-vinyl" : ""
              }`}
            >
              <Image src={current.thumb} alt="" fill unoptimized className="object-cover" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs text-white">{current.title}</span>
              <span className="truncate text-[10px] text-text-muted">{current.channel}</span>
            </span>
            <span className="flex flex-shrink-0 items-center gap-3.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playPrev();
                }}
                aria-label="Previous track"
                className="hidden text-sm text-white xs:block"
              >
                <Icon name="prev" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                aria-label="Play or pause"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-accent text-xs text-white"
              >
                <Icon name={isPlaying ? "pause" : "play"} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playNext();
                }}
                aria-label="Next track"
                className="text-sm text-white"
              >
                <Icon name="next" />
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
