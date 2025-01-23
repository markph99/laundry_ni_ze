// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      keyframes: {
        floatUp: {
          '0%':   { transform: 'translateY(0)',   opacity: '1' },
          '100%': { transform: 'translateY(-200%)', opacity: '0' },
        },
      },
      animation: {
        floatUp: 'floatUp 8s linear infinite',
      },
    },
  },
  plugins: [],
};
