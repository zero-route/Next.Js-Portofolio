/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify album/cover art
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // kalau nanti upload avatar/gambar via Supabase Storage
      },
    ],
  },
};

module.exports = nextConfig;
