import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050714",
        "bg-secondary": "#0a0e27",
        "bg-card": "#0f172a",
        "bg-card-hover": "#1e293b",
        "glow-blue": "#1e3a8a",
        "glow-purple": "#3b0764",
        "accent-blue": "#0066ff",
        "accent-cyan": "#0DFFE6",
        "accent-cyan-light": "#38bdf8",
        "accent-cyan-glow": "#0ea5e9",
        "accent-purple": "#8b5cf6",
        "text-primary": "#ffffff",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
        "border-subtle": "#1e293b",
        "border-active": "#38bdf8",
      },
      fontFamily: {
        display: ["var(--font-audiowide)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #0066ff 100%)",
        "gradient-accent": "linear-gradient(90deg, #0066ff 0%, #38bdf8 100%)",
      },
      keyframes: {
        slideFadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideFadeDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideFadeLeftToRight: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideFadeRightToLeft: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        blinkCursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        spinVinyl: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        moveGlowBlue: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(25vw,20vh,0) scale(1.2)" },
          "100%": { transform: "translate3d(-10vw,35vh,0) scale(0.9)" },
        },
        moveGlowPurple: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-30vw,-25vh,0) scale(1.15)" },
          "100%": { transform: "translate3d(15vw,-15vh,0) scale(0.85)" },
        },
      },
      animation: {
        "slide-up": "slideFadeUp 0.8s ease-out forwards",
        "slide-down": "slideFadeDown 0.6s ease-out forwards",
        "slide-ltr": "slideFadeLeftToRight 0.8s ease-out forwards",
        "slide-rtl": "slideFadeRightToLeft 0.8s ease-out forwards",
        "fade-scale": "fadeInScale 0.6s ease-out forwards",
        "pulse-dot": "pulseDot 1.5s infinite",
        "blink-cursor": "blinkCursor 0.9s infinite",
        "spin-vinyl": "spinVinyl 6s linear infinite",
        "glow-blue": "moveGlowBlue 18s infinite alternate ease-in-out",
        "glow-purple": "moveGlowPurple 22s infinite alternate ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
