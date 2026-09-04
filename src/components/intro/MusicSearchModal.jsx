"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  X,
  Music2,
  Loader2,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicSearchModal({
  open,
  onClose,
  onSelect,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  async function searchMusic(event) {
    event?.preventDefault();

    const value = query.trim();

    if (!value) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/music/search?q=${encodeURIComponent(value)}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to search music."
        );
      }

      setResults(data.results || []);
    } catch (err) {
      console.error(err);

      setResults([]);
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setQuery("");
    setResults([]);
    setError("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
          onMouseDown={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.1] bg-[#09090d] shadow-[0_30px_100px_rgba(0,0,0,0.65)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/[0.08]">
                  <Music2
                    size={17}
                    className="text-purple-300"
                  />
                </div>

                <div>
                  <h2 className="font-mono text-sm font-semibold text-white">
                    Music Search
                  </h2>

                  <p className="font-mono text-[10px] text-white/35">
                    Search music
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-white/50 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            {/* Search */}
            <form
              onSubmit={searchMusic}
              className="p-5"
            >
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 focus-within:border-purple-400/40"
              >
                <Search
                  size={17}
                  className="shrink-0 text-white/35"
                />

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search song, artist..."
                  className="min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/25"
                />

                <button
                  type="submit"
                  disabled={
                    loading || !query.trim()
                  }
                  className="rounded-lg bg-purple-500 px-4 py-2 font-mono text-[11px] font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results */}
            <div className="max-h-[55vh] overflow-y-auto px-5 pb-5">
              {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2
                    size={28}
                    className="animate-spin text-purple-400"
                  />

                  <span className="mt-3 font-mono text-xs text-white/35">
                    Searching music...
                  </span>
                </div>
              )}

              {!loading && error && (
                <div className="rounded-xl border border-red-400/10 bg-red-400/[0.05] p-4 font-mono text-xs text-red-300">
                  {error}
                </div>
              )}

              {!loading &&
                !error &&
                results.length === 0 && (
                  <div className="py-14 text-center">
                    <Music2
                      size={30}
                      className="mx-auto text-white/15"
                    />

                    <p className="mt-3 font-mono text-xs text-white/30">
                      Search for your favorite music.
                    </p>
                  </div>
                )}

              <div className="space-y-2">
                {results.map((item) => (
                  <button
                    key={item.videoId}
                    onClick={() =>
                      onSelect(item)
                    }
                    className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition hover:border-white/[0.08] hover:bg-white/[0.04]"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/[0.05]">
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/45">
                        <Play
                          size={18}
                          fill="white"
                          className="scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-xs font-semibold text-white/85">
                        {item.title}
                      </p>

                      <p className="mt-1 truncate font-mono text-[10px] text-white/35">
                        {item.artist}
                      </p>
                    </div>

                    <Music2
                      size={15}
                      className="mr-2 shrink-0 text-white/20 transition group-hover:text-purple-300"
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