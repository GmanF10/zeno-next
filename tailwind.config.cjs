safelist: [
  // ====================================================
  // 1. Dynamically applied component classes (JSX/logic)
  // ====================================================
  'neon-btn',        // Custom neon button
  'neon-card',       // Custom card component
  'neon-header',     // Header with neon theme
  'neon-glow',       // Glow effect wrapper
  'animate-glowPulse', // Neon glow animation

  // ==========================================
  // 2. Focus and accessibility-related styles
  // ==========================================
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-accent',
  'focus:ring-offset-2',

  // =================================================
  // 3. Utility classes conditionally applied in code
  // =================================================
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

  // ==========================================
  // 4. Pattern matchers for dynamic color usage
  //    Supports: bg-${color}, text-${color}, etc.
  // ==========================================
  { pattern: /^bg-(primary|accent|neon|foreground|background|background-alt)$/ },
  { pattern: /^text-(primary|accent|foreground|neon)$/ },
  { pattern: /^border-(primary|accent)$/ },
],