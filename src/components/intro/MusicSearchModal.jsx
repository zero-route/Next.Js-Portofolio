"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Play, Music2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function MusicSearchModal({
  open,
  onClose,
  onSelect,
}) {
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [open]);

  async function searchMusic(event) {
    event?.preventDefault();

    const value = query.trim();

    if (!value || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/music/search?q=${encodeURIComponent(value)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Failed to search music."
        );
      }

      setResults(data.results || []);
    } catch (err) {
      setResults([]);
      setError(
        err?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(song) {
    if (!song) return;

    onSelect?.(song, results);
  }

  function handleClose() {
    onClose?.();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 px-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#09090d] shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                  Music Search
                </p>

                <p className="mt-1 font-mono text-[10px] text-purple-300/70">
                  YouTube Music
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-white/45 transition hover:bg-white/[0.05] hover:text-white"
                aria-label="Close music search"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-5">
              <form
                onSubmit={searchMusic}
                className="flex items-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-2"
              >
                <Search
                  size={17}
                  className="ml-2 shrink-0 text-white/30"
                />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search music..."
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 font-mono text-xs text-white outline-none placeholder:text-white/25"
                />

                <button
                  type="submit"
                  disabled={!query.trim() || loading}
                  className="rounded-xl bg-white px-4 py-2 font-mono text-[10px] font-semibold text-black transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "..." : "Search"}
                </button>
              </form>

              <div className="mt-4 max-h-[55vh] overflow-y-auto pr-1">
                {error && (
                  <div className="rounded-xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3 font-mono text-[10px] text-red-300/70">
                    {error}
                  </div>
                )}

                {!loading &&
                  !error &&
                  results.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-14 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                        <Music2
                          size={23}
                          className="text-white/25"
                        />
                      </div>

                      <p className="mt-4 font-mono text-xs text-white/35">
                        Search for your favorite music
                      </p>
                    </div>
                  )}

                {loading && (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-2"
                        >
                          <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-white/[0.06]" />

                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.06]" />
                            <div className="h-2 w-1/3 animate-pulse rounded bg-white/[0.05]" />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {!loading &&
                  results.map((item) => (
                    <button
                      key={item.videoId}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition hover:border-white/[0.07] hover:bg-white/[0.035]"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/[0.04]">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Music2
                              size={18}
                              className="text-white/25"
                            />
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/40">
                          <Play
                            size={18}
                            fill="white"
                            className="scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                          />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-mono text-[11px] font-semibold text-white/85">
                          {item.title}
                        </p>

                        <p className="mt-1 truncate font-mono text-[9px] text-white/35">
                          {item.artist}
                        </p>
                      </div>

                      <Play
                        size={15}
                        className="mr-2 shrink-0 text-white/20 transition group-hover:text-white"
                      />
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}