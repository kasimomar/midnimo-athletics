import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#173A2B",
        paper: "#F8F5ED",
        accent: "#A5C88D",
        clay: "#E6BD84",
        forest: "#275D40",
        sage: "#E5ECDF",
        muted: "#506357",
        line: "#C9D2C4",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
