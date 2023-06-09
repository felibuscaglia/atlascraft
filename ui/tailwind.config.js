/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-brand-color": "#2a2a2a",
        "secondary-brand-color": "#E5E5E5",
      },
      fontFamily: {
        text: ["Questrial"],
        title: ["Playfair Display"],
      },
    },
  },
  plugins: [],
};
