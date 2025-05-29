safelist: [
  // Dynamic/conditional component classes
  'neon-btn', 'neon-card', 'neon-header', 'neon-glow', 'animate-glowPulse',
  // Focus and ring (common for accessibility, dynamic state)
  'focus:outline-none', 'focus:ring-2', 'focus:ring-accent', 'focus:ring-offset-2',
  // Custom utility classes applied conditionally in code
  'min-w-[80px]', 'min-h-[44px]', 'font-mono', 'text-sm', 'uppercase', 'tracking-wider', 'rounded-2xl', 'transition-all', 'drop-shadow-neon', 'backdrop-blur-md',
  // Dynamic color variants for semantic classes
  { pattern: /^bg-(primary|accent|neon|foreground|background|background-alt)$/ },
  { pattern: /^text-(primary|accent|foreground|neon)$/ },
  { pattern: /^border-(primary|accent)$/ },
],