/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'neon-btn', 'neon-card', 'neon-header', 'neon-glow', 'animate-glowPulse',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-accent', 'focus:ring-offset-2',
    'min-w-[80px]', 'min-h-[44px]', 'font-mono', 'text-sm', 'uppercase',
    'tracking-wider', 'rounded-2xl', 'transition-all', 'drop-shadow-neon', 'backdrop-blur-md',
    { pattern: /^bg-(primary|accent|neon|foreground|background|background-alt)$/ },
    { pattern: /^text-(primary|accent|foreground|neon|error)$/ },
    { pattern: /^border-(primary|accent|error)$/ },
  ],
  theme: {
    extend: {
      animation: {
        'glow-pulse': 'glow-pulse var(--duration-glow) ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
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
      colors: {
        primary: 'var(--color-brand-primary)',
        accent: 'var(--color-brand-accent)',
        neon: 'var(--color-brand-neon)',
        'neon-alt': 'var(--color-brand-neon-alt)',
        background: 'var(--color-surface-base)',
        'background-alt': 'var(--color-surface-alt)',
        foreground: 'var(--color-text-default)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        code: ['var(--font-code)', 'monospace'],
      },
      boxShadow: {
        'glow-neon': 'var(--shadow-glow-neon)',
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
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
  },
  plugins: [],
};