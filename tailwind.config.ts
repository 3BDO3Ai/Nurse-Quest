import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          bg: '#e6f2f5',
          accent: '#2a9d8f',
          dark: '#1f6f68',
        },
      },
      keyframes: {
        type: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 400ms ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
