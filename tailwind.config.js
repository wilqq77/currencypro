/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B2B50',
        brand: '#1687F8',
        sky: '#EAF5FF',
        teal: '#00C6B2',
        up: '#00B981',
        down: '#E5484D',
        bg: '#F5FAFF',
        ink: '#102A56',
        muted: '#7188AB',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,42,86,0.04), 0 8px 24px -12px rgba(16,42,86,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};