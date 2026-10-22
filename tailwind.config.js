/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        },
        cyber: {
          blue: '#00e5ff',
          red: '#ff0055',
          green: '#00ff66',
          dark: '#0a0d14',
          panel: '#111827',
        }
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace', 'Courier New'],
        cinematic: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser': 'laserGlow 2s infinite alternate',
      }
    },
  },
  plugins: [],
}
