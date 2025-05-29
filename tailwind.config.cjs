/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // ============================================
    // 🔹 1. Dynamically applied component classes
    // ============================================
    'neon-btn',
    'neon-card',
    'neon-header',
    'neon-glow',
    'animate-glowPulse',

    // ============================================
    // 🔹 2. Focus & accessibility styles
    // ============================================
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-accent',
    'focus:ring-offset-2',

    // ============================================
    // 🔹 3. Conditional utility classes (JSX logic)
    // ============================================
    'min-w-[80px]',
    'min-h-[44px]',
    'font-mono',
    'text-sm',
    'uppercase',
    'tracking-wider',
    'rounded-2xl',
    'transition-all',
    'drop-shadow-neon',
    'backdrop-blur-md',

    // ============================================
    // 🔹 4. Dynamic color patterns
    // ============================================
    { pattern: /^bg-(primary|accent|neon|foreground|background|background-alt)$/ },
    { pattern: /^text-(primary|accent|foreground|neon)$/ },
    { pattern: /^border-(primary|accent)$/ },
  ],
  theme: {
    extend: {
      // 🧩 Custom animation setup for glowPulse
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
      // Optional color bindings to CSS variables
      colors: {
        primary: 'var(--color-brand-primary)',
        accent: 'var(--color-brand-accent)',
        background: 'var(--color-surface-base)',
        'background-alt': 'var(--color-surface-alt)',
        foreground: 'var(--color-text-default)',
        neon: 'var(--color-brand-neon)',
      },
    },
  },
  plugins: [],
};