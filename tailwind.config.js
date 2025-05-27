/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",      
    "./public/index.html",             
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      dropShadow: {
        neon: "0 0 8px #39ff14, 0 0 24px #39ff14",
      },
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)",
        secondary: "#65ec4d", // (optional: keep if you use)
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        foreground: "var(--foreground)",
        "text-light": "var(--text-light)",
        "text-highlight": "var(--text-highlight)",
        "border-primary": "var(--primary)",
        "border-accent": "var(--accent)",
      },
    },
  },
  plugins: [],
};
