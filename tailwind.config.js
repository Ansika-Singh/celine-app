/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#070B14',
        surface: '#0D1117',
        surfaceLight: '#101827',
        primary: '#6D5EF5',
        secondary: '#22D3EE',
        accent: '#00FFB3',
        danger: '#FF5C7A',
        text: '#FFFFFF',
        textMuted: '#A0AEC0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
