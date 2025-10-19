/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2E8B57',
        secondary: '#3CB371',
        accent: '#FF6B35',
        background: '#F5F5F5',
        text: '#2C3E50',
        card: '#FFFFFF',
        border: '#E0E0E0'
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
      },
    },
  },
  plugins: [],
}