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
        'rv-gradient': "linear-gradient(to left, transparent 0%, white 70%), url('/0948bf193.svg')",
        'rv-gradient-dark': "linear-gradient(to left, transparent 0%, rgb(22, 28, 42) 70%), url('/0948bf193.svg')",
        'map-gradient': "linear-gradient(-160deg, transparent 0%, white 32%), url('/bgMap.svg')",
        'map-gradient-dark': "linear-gradient(-160deg, transparent 0%, rgb(22, 28, 42) 25%), url('/bgMap.webp')",
      },
      backgroundPosition: {
        'center-top': 'center top',
      },
      colors: {
        dark: "#161C2A",
        superdark: "#121723",
      },
      zIndex: {
        '999': '999',
      },
      boxShadow: {
        'md': '0 2px 7px -3px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
