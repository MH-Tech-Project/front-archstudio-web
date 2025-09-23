/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores principais do sistema
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
        },
        
        // Backgrounds e contrastes
        background: {
          DEFAULT: 'var(--background)',
          contrast: 'var(--background-contrast)',
        },
        
        // Sistema de cinzas
        gray: {
          DEFAULT: 'var(--gray)',
          500: 'var(--gray)',
          900: 'var(--gray-900)',
        },
        
        // Textos
        foreground: {
          DEFAULT: 'var(--foreground)',
        },
        'text-white': 'var(--text-white)',
        
        // Elementos de UI
        card: 'var(--card)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--primary), var(--secondary))',
        'gradient-hero': 'linear-gradient(135deg, var(--background), var(--primary), var(--accent))',
      },
    },
  },
  plugins: [],
}