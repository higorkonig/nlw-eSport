/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        background: "url('/fundo.png')",
        'nlw-gradient':
          'linear-gradient(89.86deg, #7572FC 27.08%, #43E7AD 33.95%, #E1D55D 40.57%)',
        'game-gradient':
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
