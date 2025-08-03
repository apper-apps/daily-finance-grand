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
          50: 'rgba(0, 255, 65, 0.1)',
          100: 'rgba(0, 255, 65, 0.2)',
          500: '#00ff41',
          600: '#00e639',
          700: '#00cc31'
        },
        secondary: {
          50: 'rgba(0, 255, 255, 0.1)',
          100: 'rgba(0, 255, 255, 0.2)',
          500: '#00ffff',
          600: '#00e6e6',
          700: '#00cccc'
        },
        accent: {
          50: 'rgba(0, 255, 65, 0.1)',
          100: 'rgba(0, 255, 65, 0.2)',
          200: 'rgba(0, 255, 65, 0.3)',
          500: '#00ff41',
          600: '#00e639',
          700: '#00cc31'
        },
        'cyber-neon': '#00ff41',
        'cyber-cyan': '#00ffff',
        'cyber-purple': '#8b00ff',
        'cyber-red': '#ff0040',
        'cyber-yellow': '#ffff00',
        'cyber-orange': '#ff8000',
        success: '#00ff41',
        warning: '#ffff00',
        error: '#ff0040',
        info: '#00ffff'
      },
      fontFamily: {
        'display': ['Orbitron', 'monospace'],
        'body': ['Share Tech Mono', 'monospace'],
        'mono': ['Share Tech Mono', 'monospace']
      },
      boxShadow: {
        'card': '0 0 20px rgba(0, 255, 65, 0.2), 0 0 10px rgba(0, 0, 0, 0.8)',
        'float': '0 0 30px rgba(0, 255, 65, 0.3), 0 4px 15px rgba(0, 0, 0, 0.9)',
        'cyber-glow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
        'cyber-strong': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        'neon-box': '0 0 20px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 255, 65, 0.1)'
      },
      animation: {
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'cyber-glow': 'cyber-glow 2s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'cyber-flicker': 'cyber-flicker 0.1s ease-in-out infinite'
      },
      backdropBlur: {
        'cyber': '15px'
      }
    },
  },
  plugins: [],
}