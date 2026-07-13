/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/features/**/*.{js,jsx}",
    "./src/common/**/*.{js,jsx}",
    "./src/providers/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      mobile: "375px",
      tablet: "744px",
      desktop: "1200px",
    },
    extend: {
      colors: {
        black: "#0f0f0f",
        gray: {
          500: "#161616",
          400: "#5A5A5A",
          300: "#A4A4A4",
          200: "#DDDDDD",
          100: "#EEEEEE",
        },
        white: "#FFFFFF",
        main: "#EFFF04",
        red: "#FF483D",
        blue: "#29C9F9",
        purple: "#A77EFF",
        pink: "#FF2A6A",
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        brand: ["BaskinRobbins", "Noto Sans KR", "sans-serif"],
      },
      maxWidth: {
        layout: "1200px",
      },
    },
  },
  plugins: [],
};
