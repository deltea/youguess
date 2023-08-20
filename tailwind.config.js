/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "youtube": "#FF0000",
        "neutral": "#282828",
      },
      fontFamily: {
        "sans": ["YoutubeSans", "sans"],
      }
    },
  },
  plugins: [],
}

