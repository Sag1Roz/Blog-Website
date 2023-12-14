/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        primary: "#19376D",
        "primary-dark": "#A5D7E8",
        hover: "#4177d9",
        "hover-dark": "#c2e2ed",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
