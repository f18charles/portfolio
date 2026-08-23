/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#08080C', // deep obsidian background
          surface: '#11131F', // card & panel background
          elevated: '#181B2B', // elevated floating elements
        },
        paper: {
          DEFAULT: '#FAFAF9', // near-white surface
          muted: '#94A3B8',  // secondary body text
          faint: '#64748B',  // tertiary comments / timestamps
        },
        cobalt: {
          DEFAULT: '#1E3FE0',
          soft: '#607AFE',
          glow: '#3E5CF0',
        },
        violet: {
          DEFAULT: '#8B2FE0',
          soft: '#C084FC',
          glow: '#A855F7',
        },
        signal: {
          DEFAULT: '#2ED67A', // cyber emerald green
          soft: '#4ADE80',
          glow: '#22C55E',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          soft: '#38BDF8',
        },
        amber: {
          DEFAULT: '#D97706',
          soft: '#FBBF24',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest2: '-0.04em',
        widest2: '0.25em',
      },
      keyframes: {
        beam: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        beam: 'beam 6s ease-in-out infinite',
        blink: 'blink 1s step-start infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
      },
    },
  },
  plugins: [],
}
