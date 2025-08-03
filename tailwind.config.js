/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5e8',
          100: '#c8e6c8',
          500: '#2E7D32',
          600: '#2e7d32',
          700: '#1b5e20'
        },
        secondary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          500: '#1565C0',
          600: '#1565c0',
          700: '#0d47a1'
        },
        accent: {
          50: '#fff3e0',
          100: '#ffe0b2',
          500: '#F57C00',
          600: '#f57c00',
          700: '#ef6c00'
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        'display': ['DM Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'float': '0 4px 12px rgba(0,0,0,0.15)'
      }
    },
  },
  plugins: [],
}