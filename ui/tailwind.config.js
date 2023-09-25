/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-brand-color": "var(--primary-brand-color)",
        "highlight-color": "var(--highlight-color)",
      },
      fontFamily: {
        titles: ["var(--font-family-titles)"],
        text: ["var(--font-family-text)"],
      },
    },
  },
  plugins: [],
};
