import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-mode-primary': '#111827',
        'dark-mode-modal': '#0a0b0e',
        'loading': '#679cc5'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'theme-mode-button': '0 0 1px #2196F3'
      },
      keyframes: {
        dotOne: {
          '0%, 15%': { opacity: '0' },
          '25%, 100%': { opacity: '1' },
        },
        dotTwo: {
          '0%, 15%': { opacity: '0' },
          '50%, 100%': { opacity: '1' },
        },
        dotThree: {
          '0%, 15%': { opacity: '0' },
          '75%, 100%': { opacity: '1' },
        },
      },
      animation: {
        dotOne: 'dotOne 2s infinite linear',
        dotTwo: 'dotTwo 2s infinite linear',
        dotThree: 'dotThree 2s infinite linear',
      },
      zIndex: {
        'topBar': '1',
        'modal': '2',
      }
    },
  },
  plugins: [
    plugin(({addBase, theme}) => {
      addBase({
        h1: { fontSize: theme('fontSize.2xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
        h4: { fontSize: theme('fontSize.base') },
        h5: { fontSize: theme('fontSize.sm') },
        h6: { fontSize: theme('fontSize.xs') },
      })
    })
  ],
}
export default config
