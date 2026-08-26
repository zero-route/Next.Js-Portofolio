"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const TRIVIA_API = "https://opentdb.com/api.php";
const TRIVIA_CATEGORY_API = "https://opentdb.com/api_category.php";

type Category = { id: number; name: string };
type Question = { category: string; question: string; correct: string; answers: string[] };
type View = "setup" | "quiz" | "result";

function decodeHtml(text: string) {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const translateCache: Record<string, string> = {};
async function translateText(text: string) {
  if (translateCache[text]) return translateCache[text];
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`
    );
    const data = await res.json();
    const translated = data[0].map((chunk: any) => chunk[0]).join("");
    translateCache[text] = translated;
    return translated;
  } catch {
    return text;
  }
}

export default function TriviaWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [view, setView] = useState<View>("setup");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [amount, setAmount] = useState("10");
  const [hint, setHint] = useState("");
  const [starting, setStarting] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const loadedCategories = useRef(false);

  useEffect(() => {
    if (open && !loadedCategories.current) {
      loadedCategories.current = true;
      fetch(TRIVIA_CATEGORY_API)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.trivia_categories)) setCategories(data.trivia_categories);
        })
        .catch(() => {});
    }
  }, [open]);

  async function startQuiz() {
    setStarting(true);
    setHint("Memuat soal...");
    try {
      let url = `${TRIVIA_API}?amount=${amount}&type=multiple&difficulty=${difficulty}`;
      if (category) url += `&category=${category}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code !== 0 || !data.results?.length) {
        setHint("Soal tidak ditemukan untuk kombinasi ini, coba kategori lain.");
        setStarting(false);
        return;
      }

      setHint("Menerjemahkan soal...");

      const translated: Question[] = await Promise.all(
        data.results.map(async (q: any) => {
          const decodedQuestion = decodeHtml(q.question);
          const decodedCorrect = decodeHtml(q.correct_answer);
          const decodedIncorrect = q.incorrect_answers.map(decodeHtml);
          const decodedCategory = decodeHtml(q.category);

          const [tCategory, tQuestion] = await Promise.all([
            translateText(decodedCategory),
            translateText(decodedQuestion),
          ]);

          return {
            category: tCategory,
            question: tQuestion,
            correct: decodedCorrect,
            answers: shuffle([decodedCorrect, ...decodedIncorrect]),
          };
        })
      );

      setQuestions(translated);
      setIndex(0);
      setScore(0);
      setAnswered(false);
      setSelected(null);
      setHint("");
      setStarting(false);
      setView("quiz");
    } catch {
      setHint("Gagal memuat soal, coba lagi.");
      setStarting(false);
    }
  }

  function handleAnswer(answer: string) {
    if (answered) return;
    setAnswered(true);
    setSelected(answer);
    if (answer === questions[index].correct) setScore((s) => s + 1);
  }

  function nextQuestion() {
    const next = index + 1;
    if (next < questions.length) {
      setIndex(next);
      setAnswered(false);
      setSelected(null);
    } else {
      setView("result");
    }
  }

  function retry() {
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setView("quiz");
  }

  const q = questions[index];
  const total = questions.length;
  const percentage = total ? Math.round((score / total) * 100) : 0;
  const resultLabel =
    percentage === 100 ? "Sempurna! 🎉" : percentage >= 80 ? "Keren banget!" : percentage >= 50 ? "Not bad!" : "Ayo coba lagi!";

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-end justify-center bg-black/75 backdrop-blur-sm transition-opacity duration-300 sm:items-center ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`flex max-h-[85vh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[18px] border border-accent-cyan-light/25 bg-gradient-to-br from-bg-secondary to-bg-primary shadow-[0_-10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,102,255,0.15)] transition-transform duration-300 sm:rounded-2xl ${
          open ? "translate-y-0" : "translate-y-8"
        }`}
      >
        {view === "setup" && (
          <>
            <PanelHeader title="Trivia Quiz" icon="brain" onClose={onClose} />
            <div className="flex flex-col gap-1.5 p-5">
              <label className="mt-3 font-mono text-[11px] text-accent-cyan-light">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-border-subtle bg-black/60 px-3 py-2.5 text-[13px] text-white outline-none focus:border-accent-cyan-light"
              >
                <option value="">Semua Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label className="mt-3 font-mono text-[11px] text-accent-cyan-light">Tingkat Kesulitan</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="rounded-lg border border-border-subtle bg-black/60 px-3 py-2.5 text-[13px] text-white outline-none focus:border-accent-cyan-light"
              >
                <option value="easy">Mudah</option>
                <option value="medium">Sedang</option>
                <option value="hard">Sulit</option>
              </select>

              <label className="mt-3 font-mono text-[11px] text-accent-cyan-light">Jumlah Soal</label>
              <select
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-lg border border-border-subtle bg-black/60 px-3 py-2.5 text-[13px] text-white outline-none focus:border-accent-cyan-light"
              >
                <option value="5">5 Soal</option>
                <option value="10">10 Soal</option>
                <option value="15">15 Soal</option>
              </select>

              <button
                onClick={startQuiz}
                disabled={starting}
                className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-gradient-accent py-2.5 font-mono text-xs text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] disabled:opacity-60"
              >
                Mulai Kuis <Icon name="play" />
              </button>
              <p className="mt-2.5 min-h-[14px] text-center text-[11px] text-text-muted">{hint}</p>
            </div>
          </>
        )}

        {view === "quiz" && q && (
          <>
            <div className="flex items-center justify-between border-b border-accent-cyan-light/15 px-5 py-4">
              <span className="font-mono text-xs text-text-secondary">
                Soal {index + 1}/{total}
              </span>
              <button onClick={onClose} aria-label="Close trivia" className="text-text-secondary">
                <Icon name="xmark" />
              </button>
            </div>

            <div className="flex-shrink-0 px-5 pt-2.5 font-mono text-xs text-text-secondary">
              <Icon name="star" className="mr-1 inline text-amber-400" /> Skor: {score}
            </div>

            <div className="flex-shrink-0 px-5 py-4">
              <span className="mb-2.5 inline-block rounded-full border border-accent-cyan-light/30 px-2.5 py-0.5 font-mono text-[10px] text-accent-cyan-light">
                {q.category}
              </span>
              <p className="text-[15px] leading-relaxed text-white">{q.question}</p>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-5 thin-scroll">
              {q.answers.map((a) => {
                const isCorrect = answered && a === q.correct;
                const isWrong = answered && a === selected && a !== q.correct;
                return (
                  <button
                    key={a}
                    disabled={answered}
                    onClick={() => handleAnswer(a)}
                    className={`rounded-[10px] border px-3.5 py-3 text-left text-[13px] transition-colors ${
                      isCorrect
                        ? "border-green-500 bg-green-500/15 text-green-500"
                        : isWrong
                        ? "border-red-500 bg-red-500/15 text-red-500"
                        : "border-accent-cyan-light/15 bg-bg-secondary/60 text-white hover:border-accent-cyan-light hover:bg-accent-cyan-light/[0.08]"
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextQuestion}
              disabled={!answered}
              className="m-5 flex items-center justify-center gap-2 rounded-lg bg-gradient-accent py-2.5 font-mono text-xs text-white shadow-[0_0_15px_rgba(0,102,255,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {index === total - 1 ? (
                <>
                  Lihat Hasil <Icon name="flag" />
                </>
              ) : (
                <>
                  Lanjut <Icon name="arrowRight" />
                </>
              )}
            </button>
          </>
        )}

        {view === "result" && (
          <>
            <div className="flex items-center justify-between border-b border-accent-cyan-light/15 px-5 py-4">
              <span className="font-mono text-xs text-text-secondary">Hasil Kuis</span>
              <button onClick={onClose} aria-label="Close trivia" className="text-text-secondary">
                <Icon name="xmark" />
              </button>
            </div>
            <div className="flex flex-col items-center px-5 py-10 text-center">
              <Icon name="trophy" className="mb-4 text-5xl text-amber-400" />
              <h4 className="mb-1 font-display text-3xl text-white">
                {score} / {total}
              </h4>
              <p className="mb-6 text-xs text-text-secondary">{resultLabel}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={retry}
                  className="flex items-center gap-2 rounded-lg bg-gradient-accent px-4.5 py-2.5 font-mono text-xs text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]"
                >
                  Main Lagi <Icon name="retry" />
                </button>
                <button
                  onClick={() => setView("setup")}
                  className="rounded-lg border border-border-active px-4.5 py-2.5 font-mono text-xs text-white"
                >
                  Ganti Kategori
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PanelHeader({ title, icon, onClose }: { title: string; icon: string; onClose: () => void }) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b border-accent-cyan-light/15 px-5 py-4">
      <h3 className="flex items-center gap-2 font-display text-sm text-white">
        <Icon name={icon} /> {title}
      </h3>
      <button onClick={onClose} aria-label="Close trivia" className="text-text-secondary">
        <Icon name="xmark" />
      </button>
    </div>
  );
}
