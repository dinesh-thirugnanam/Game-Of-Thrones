/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lovelight : ['"Love Light"',"sans-serif"],
        got : ["'Game of Thrones'", "sans-serif"],
        grym : ["'Grymmoire'", "sans-serif"],
        royal : ["'Bonheur Royale'","cursive"],

      },
    },
  },
  plugins: [],
}