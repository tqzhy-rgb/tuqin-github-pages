/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F1B6FF",
        ink: "#F1B6FF",
        carbon: "#101010",
        card: "#212121",
        ember: "#A66B45",
        moss: "#7C8761"
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "serif"]
      }
    }
  },
  plugins: []
};
