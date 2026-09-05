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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#090b0e",
          surface: "#12161c",
          elevated: "#181d25",
          border: "#2a3340",
        },
        moss: {
          DEFAULT: "#2f9e8c",
          hover: "#38b39f",
          soft: "rgba(47, 158, 140, 0.14)",
          bright: "#5eead4",
        },
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.04), 0 18px 50px -24px rgba(0,0,0,0.65)",
      },
    },
  },
  plugins: [],
};

export default config;
