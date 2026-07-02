/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-green": "#059669",
        "bg-light": "#f9faf7",

        // optional safety aliases for consistent dark UI
        "bg-dark": "#111827",
        "text-dark": "#f9fafb",
      },
    },
  },
  plugins: [],
};