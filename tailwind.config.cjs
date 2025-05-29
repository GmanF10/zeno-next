/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,css}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/styles/globals.css',
    './src/styles/tokens.css',
    './src/styles/layout.css',
    './src/styles/utilities.css',
  ],
  safelist: [
    'px-6', 'py-2', 'rounded-2xl', 'border-2', 'text-[#39ff14]',
    'bg-transparent', 'transition-all', 'hover:bg-[#39ff14]',
    'hover:text-[#0a0c10]', 'min-w-[80px]', 'min-h-[44px]', 'font-mono',
    'text-sm', 'uppercase', 'tracking-wider', 'drop-shadow-neon',
    'backdrop-blur-md', 'text-center', 'focus:outline-none',
    'focus:ring-2', 'focus:ring-accent', 'focus:ring-offset-2',
    'layout-container', 'container', 'mx-auto', 'px-layout',
    { pattern: /^bg-(primary|accent|neon|background|foreground)$/ },
    { pattern: /^text-(primary|accent|foreground|neon)$/ },
    { pattern: /^border-(primary|accent)$/ },
  ],
  theme: {
    container: {
      center: true,
      padding: 'var(--layout-content-padding)',
      screens: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
    extend: {
      fontFamily: {
        orbitron: ['var(--font-heading)', 'Orbitron', 'sans-serif'],
        geist: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      dropShadow: {
        neon: 'var(--shadow-neon)',
      },
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-accent)',
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        foreground: 'var(--color-foreground)',
        'text-light': 'var(--color-text-light)',
        'text-highlight': 'var(--color-text-highlight)',
        'border-primary': 'var(--color-primary)',
        'border-accent': 'var(--color-accent)',
        neon: 'var(--color-neon)',
        'neon-alt': 'var(--color-neon-alt)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        neon: 'var(--shadow-neon)',
      },
      zIndex: {
        header: 'var(--z-index-header)',
        modal: 'var(--z-index-modal)',
        overlay: 'var(--z-index-overlay)',
      },
      transitionDuration: {
        fast: 'var(--transition-fast)',
        medium: 'var(--transition-medium)',
        slow: 'var(--transition-slow)',
      },
      maxWidth: {
        layout: 'var(--layout-max-width)',
      },
      padding: {
        layout: 'var(--layout-content-padding)',
      },
      gap: {
        layout: 'var(--grid-gap)',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 8px var(--color-neon), 0 0 16px var(--color-neon)',
            textShadow: '0 0 10px var(--color-neon)',
          },
          '50%': {
            boxShadow: '0 0 20px var(--color-neon), 0 0 40px var(--color-neon)',
            textShadow: '0 0 20px var(--color-neon-alt)',
          },
        },
      },
      animation: {
        glowPulse: 'glowPulse var(--duration-glow, 2s) ease-in-out infinite',
      },
    },
  },
  plugins: [],
};