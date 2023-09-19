/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titles: ["var(--font-family-titles)"],
        text: ["var(--font-family-text)"],
      },
    },
  },
  plugins: [],
};
