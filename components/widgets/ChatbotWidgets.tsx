"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type GeminiHistoryItem = { role: "user" | "model"; parts: { text: string }[] };
type ChatMessage = { text: string; sender: "user" | "bot" };

export default function ChatbotWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "bot", text: "Hi! Saya Astrea, Mau tanyain apa seputar dimas, projectnya, atau hal menarik di dunia!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<GeminiHistoryItem[]>([]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyRef.current }),
      });
      const data = await res.json();
      const reply: string = data.reply || "Maaf, terjadi kesalahan koneksi.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);

      historyRef.current.push({ role: "user", parts: [{ text }] });
      historyRef.current.push({ role: "model", parts: [{ text: reply }] });
      if (historyRef.current.length > 20) {
        historyRef.current = historyRef.current.slice(-20);
      }
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Maaf, terjadi kesalahan koneksi." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`fixed bottom-20 right-6 z-[1000] flex max-h-[70vh] w-[min(340px,calc(100vw-32px))] flex-col rounded-2xl border border-accent-cyan-light/25 bg-gradient-to-br from-bg-secondary to-bg-primary shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,102,255,0.15)] transition-all duration-300 ${
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between border-b border-accent-cyan-light/15 px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-accent-cyan-light/30 bg-accent-cyan-light/10 text-accent-cyan-light">
            <Icon name="robot" />
          </div>
          <div>
            <span className="block font-mono text-[9px] tracking-wide text-text-muted">AI ASSISTANT</span>
            <h4 className="font-display text-[13px] text-white">Astrea</h4>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1 font-mono text-[10px] text-green-500">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" /> Online
          </span>
          <button onClick={onClose} aria-label="Close chatbot" className="text-text-secondary">
            <Icon name="xmark" />
          </button>
        </div>
      </div>

      <div className="thin-scroll flex min-h-[180px] flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3.5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] whitespace-pre-line rounded-[10px] px-3 py-2.5 text-[12.5px] leading-relaxed ${
              m.sender === "bot"
                ? "self-start border border-accent-cyan-light/15 bg-accent-cyan-light/[0.08] text-text-secondary"
                : "self-end bg-gradient-accent text-white"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className="self-start text-[11px] italic text-text-muted">Mengetik...</div>}
      </div>

      <div className="flex gap-2 border-t border-accent-cyan-light/15 px-3.5 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Tanyakan tentang Dimas..."
          aria-label="Type your message"
          className="flex-1 rounded-lg border border-border-subtle bg-black/60 px-3 py-2 text-[12.5px] text-white outline-none focus:border-accent-cyan-light"
        />
        <button
          onClick={sendMessage}
          aria-label="Send"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-accent text-white"
        >
          <Icon name="send" />
        </button>
      </div>
    </div>
  );
}
