import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      colors: {
        crimson: "#dc143c",
        "blood-red": "#8b0000",
        "fiery-orange": "#ff4500",
        ember: "#ff6b35",
        inferno: "#c0392b",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "inferno-gradient": "linear-gradient(135deg, #8b0000, #dc143c, #ff4500)",
        "void-gradient": "radial-gradient(ellipse at top, rgba(220,20,60,0.12) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
