/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-green': '#059669',
        'bg-light': '#f9faf7', // This adds the 'bg-light' color
      },
    },
  },
  plugins: [],
}