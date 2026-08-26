# Portofolio Dimas — Next.js (App Router) + TypeScript + Tailwind CSS

Migrasi dari HTML/CSS/JS murni ke Next.js. Fitur AI Chatbot & Music Player yang
sebelumnya lewat Cloudflare Workers sekarang jadi **API Route** di Next.js sendiri
(`app/api/chat`, `app/api/music/search`), lengkap dengan **rotasi API key**
(sampai 12 key per layanan) supaya kalau satu key kena limit, otomatis lanjut ke
key berikutnya.

## 1. Install dependency

```bash
npm install
```

## 2. Lengkapi gambar & CV asli

Folder `public/asset/` masih kosong. Salin file-file berikut dari project lama kamu
ke `public/asset/`:

```
profile.jpg
eirp.jpg
kali.jpg
pmr.jpg
esp-robot.jpg
pythonAI.jpg
n8n.jpg
CV-DIMAS.pdf
```

## 3. Isi API key

Salin `.env.local.example` jadi `.env.local`, lalu isi API key kamu:

```bash
cp .env.local.example .env.local
```

- `GEMINI_API_KEY_1` s/d `GEMINI_API_KEY_12` → API key Gemini (ambil di [Google AI Studio](https://aistudio.google.com/apikey))
- `YOUTUBE_API_KEY_1` s/d `YOUTUBE_API_KEY_12` → API key YouTube Data API v3 (aktifkan di [Google Cloud Console](https://console.cloud.google.com/apis/library/youtube.googleapis.com))

Tidak perlu isi semua 12 — isi sebanyak key yang kamu punya, sisanya biarkan kosong.
Sistem otomatis skip key yang kosong dan lanjut rotasi ke key berikutnya kalau satu
key kena status 429/403 (limit/quota habis).

**Untuk ganti persona/aturan AI chatbot** (dulu di-setting di Cloudflare Worker),
edit file `lib/systemPrompt.ts` — tidak perlu sentuh logic API route.

## 4. Jalankan di lokal

```bash
npm run dev
```

Buka `http://localhost:3000`.

## 5. Deploy ke Vercel via GitHub

```bash
git init
git add .
git commit -m "Initial migration to Next.js"
git branch -M main
git remote add origin <url-repo-github-kamu>
git push -u origin main
```

Lalu di [vercel.com](https://vercel.com):
1. **Add New Project** → import repo GitHub ini.
2. Framework Preset otomatis terdeteksi **Next.js**.
3. Di **Environment Variables**, masukkan semua `GEMINI_API_KEY_*` dan
   `YOUTUBE_API_KEY_*` yang ada di `.env.local` kamu (satu per satu, Name & Value).
4. Deploy.

Setelah itu setiap `git push` ke `main` akan auto-deploy ke Vercel.

## Struktur proyek

```
app/
  api/chat/route.ts          # Gemini chatbot (server-side, key tersembunyi)
  api/music/search/route.ts  # YouTube search (server-side, key tersembunyi)
  layout.tsx, page.tsx, globals.css
components/
  layout/    (IntroLoader, Navbar, Footer)
  sections/  (Hero, About, ProjectTimeline, Expertise, Contact)
  widgets/   (ChatbotWidget, MusicPlayerWidget, TriviaWidget)
  ui/        (Icon.tsx - mapping react-icons)
hooks/       (useRevealOnScroll, useTypingEffect, useYouTubePlayer)
lib/         (data.ts, apiKeyRotation.ts, systemPrompt.ts)
```

## Catatan

- Playback musik (YouTube IFrame Player) **tidak butuh API key** — hanya fitur
  *search* lagu yang butuh YouTube Data API key.
- Trivia quiz tetap fetch langsung ke `opentdb.com` dari browser (public API,
  tidak butuh key), sama seperti versi lama.
- Form kontak tetap pakai `formsubmit.co` seperti sebelumnya.
