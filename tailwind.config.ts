import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: "#00e599",
          hover: "#00ffaa",
          light: "#e6f9f2",
          dark: "#00b573",
        },
        ivory: {
          50: "#FDFCF9",
          100: "#FAF8F5",
          200: "#F5EFEB",
          300: "#EFE8DE",
        },
        champagne: {
          DEFAULT: "#E8DFC8",
          light: "#FAF6ED",
          border: "#E7DFD5",
          dark: "#C9A66B",
        },
        forest: {
          950: "#07241D",
          900: "#092F26",
          800: "#0D3830",
          700: "#085442",
          600: "#0B6852",
        },
        sage: {
          50: "#F6FAF7",
          100: "#EFF8F3",
          200: "#D8ECE2",
          300: "#C2E0D2",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F5ECCB",
          dark: "#B38F24",
        },
        emerald: {
          950: "#021410",
          900: "#041f1a",
          850: "#05261e",
          800: "#062b24",
          700: "#0a382f",
          600: "#106353",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 229, 153, 0.25)",
        "glow-lg": "0 0 40px rgba(0, 229, 153, 0.4)",
        card: "0 10px 30px rgba(6, 43, 36, 0.06)",
        "card-dark": "0 20px 45px rgba(0, 0, 0, 0.45)",
        luxury: "0 10px 30px rgba(13, 56, 48, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02)",
        "luxury-hover": "0 20px 40px rgba(13, 56, 48, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04)",
        "luxury-sm": "0 4px 16px rgba(13, 56, 48, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
