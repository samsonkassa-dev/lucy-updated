import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        yellow: "#EFC35A",
        "yellow-2": "rgba(245, 193, 67, 0.5)",
        gray: "#D9D9D9",
        "gray-2": "rgba(30, 30, 30, 0.5)",
        purple: "#6743ee",
      },
    },
  },
  plugins: [],
};
export default config;
