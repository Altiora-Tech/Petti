/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'petti-blue': '#6AD1E3',
        'petti-deep-blue': '#122431',
        'petti-base': '#F5F9FB',
        'petti-accent': '#FFD66B',
        'petti-pink': '#FFB6C1',
        'petti-light-blue': '#A9CBE0',
        'petti-slider': '#f4f8fb',
        'petti-slider-dark': '#1d3a50',
        'petti-text-light': '#243b6b',
        'petti-text-dark': '#fff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        scroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      'bounce-smooth': {
          '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        'bounce-smooth': 'bounce-smooth 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};