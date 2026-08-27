/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // tema Space/Cosmic: hitam - biru - putih
        space: {
          black: "#000005",
          navy: "#0a1230",
          blue: "#60a5fa",
        },
      },
    },
  },
  plugins: [],
};
