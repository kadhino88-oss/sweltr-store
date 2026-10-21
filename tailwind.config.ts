import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF8F1",
        ink: "#0B0F17",
        panel: "#FFFFFF",
        panel2: "#F5F0E5",
        line: "#E4DED2",
        muted: "#5B616B",
        soft: "#343A45",
        cream: "#F5F0E5",
        gold: "#D6A84F",
        "gold-strong": "#F3C86A",
        "gold-deep": "#A87F2C",
        magenta: "#FF2E63",
        orange: "#FF7A3C",
        yellow: "#FFD23F",
        cyan: "#4FE3C1",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(3%, -4%) scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        drift: "drift 14s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
