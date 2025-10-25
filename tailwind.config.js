/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-beige': '#F5F1EB',
        'cafe-brown': '#8B4513',
        'cafe-cream': '#FFF8DC',
        'cafe-dark': '#3C2415',
        'cafe-gold': '#DAA520',
        'cafe-light': '#FAF7F0',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

