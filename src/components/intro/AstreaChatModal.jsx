"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  X,
  Trash2,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const initialMessage = {
  role: "model",
  content:
    "Halo, aku Astrea. 👋 Ada yang ingin kamu tanyakan?",
};

export default function AstreaChatModal({
  open,
  onClose,
}) {
  const [messages, setMessages] = useState([
    initialMessage,
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(event) {
    event?.preventDefault();

    const value = input.trim();

    if (!value || loading) return;

    const userMessage = {
      role: "user",
      content: value,
    };

    const nextMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "Astrea sedang tidak tersedia."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "model",
          content:
            data.response ||
            "Maaf, Astrea belum bisa menjawab saat ini.",
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "model",
          content:
            error?.message ||
            "Maaf, terjadi kesalahan. Coba lagi sebentar.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    if (loading) return;

    setMessages([initialMessage]);
    setInput("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-2xl"
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
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-[min(720px,88vh)] w-full max-w-lg flex-col overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#09090d] shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/[0.08]">
                  <Bot
                    size={19}
                    className="text-purple-200"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-mono text-sm font-semibold text-white">
                      Astrea
                    </h2>

                    <span className="flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2 py-0.5 font-mono text-[8px] text-emerald-300/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      ONLINE
                    </span>
                  </div>

                  <p className="mt-0.5 font-mono text-[9px] text-white/30">
                    AI Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={loading}
                  aria-label="Clear conversation"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] text-white/35 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-30"
                >
                  <Trash2 size={15} />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Astrea"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] text-white/40 transition hover:bg-white/[0.05] hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-5">
              <div className="space-y-4">
                {messages.map((message, index) => {
                  const isUser =
                    message.role === "user";

                  return (
                    <motion.div
                      key={`${message.role}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className={`flex ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[86%] ${
                          isUser
                            ? "rounded-2xl rounded-br-md border border-purple-400/20 bg-purple-500/[0.12]"
                            : "rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.035]"
                        } px-4 py-3`}
                      >
                        {!isUser && (
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <Sparkles
                              size={11}
                              className="text-purple-300/60"
                            />

                            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-purple-300/50">
                              Astrea
                            </span>
                          </div>
                        )}

                        <p className="whitespace-pre-wrap break-words font-mono text-[11px] leading-6 text-white/75">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

                {loading && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex justify-start"
                  >
                    <div className="rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.035] px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300/70 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300/70 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-300/70" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-white/[0.07] bg-[#08080c] p-4">
              <form
                onSubmit={sendMessage}
                className="flex items-end gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey
                      ) {
                        event.preventDefault();
                        sendMessage(event);
                      }
                    }}
                    disabled={loading}
                    rows={1}
                    maxLength={2000}
                    placeholder="Tanyakan sesuatu ke Astrea..."
                    className="max-h-32 min-h-[46px] w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 pr-12 font-mono text-[11px] leading-5 text-white outline-none placeholder:text-white/20 transition focus:border-purple-400/30 focus:bg-white/[0.04] disabled:opacity-50"
                  />

                  <span className="pointer-events-none absolute bottom-2 right-3 font-mono text-[7px] text-white/15">
                    {input.length}/2000
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={
                    !input.trim() || loading
                  }
                  aria-label="Send message"
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/[0.12] text-purple-200 transition hover:bg-purple-500/[0.2] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Send
                    size={16}
                    className="translate-x-[-1px]"
                  />
                </button>
              </form>

              <p className="mt-2 text-center font-mono text-[8px] text-white/15">
                Astrea • AI Assistant
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}