/**
 * Ambil semua API key dari environment variable dengan pola
 * PREFIX_1, PREFIX_2, ... PREFIX_12 (server-side only, bukan NEXT_PUBLIC_).
 *
 * Contoh .env.local:
 *   GEMINI_API_KEY_1=xxxx
 *   GEMINI_API_KEY_2=yyyy
 *   YOUTUBE_API_KEY_1=zzzz
 */
export function getRotatingKeys(prefix: string, max = 12): string[] {
  const keys: string[] = [];
  for (let i = 1; i <= max; i++) {
    const value = process.env[`${prefix}_${i}`];
    if (value && value.trim().length > 0) keys.push(value.trim());
  }
  return keys;
}

/**
 * Coba jalankan `fn` dengan setiap key secara berurutan.
 * Kalau satu key kena limit/quota (fn melempar error atau return null),
 * otomatis lanjut ke key berikutnya sampai salah satu berhasil atau
 * semua key habis.
 */
export async function tryWithKeyRotation<T>(
  keys: string[],
  fn: (key: string) => Promise<T | null>
): Promise<T> {
  if (keys.length === 0) {
    throw new Error("Tidak ada API key yang dikonfigurasi di environment variable.");
  }

  let lastError: unknown = null;

  for (const key of keys) {
    try {
      const result = await fn(key);
      if (result !== null) return result;
    } catch (err) {
      lastError = err;
      // key ini kemungkinan kena rate-limit/quota, lanjut ke key berikutnya
      continue;
    }
  }

  throw lastError ?? new Error("Semua API key gagal atau kena limit.");
}
