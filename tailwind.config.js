/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",      // covers your src/components, etc.
    "./public/index.html",             // optional: covers your root html
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"], // for your --font-sans variable, if used
        mono: ["var(--font-geist-mono)", "monospace"],   // for your --font-mono variable, if used
      },
      dropShadow: {
        neon: "0 0 8px #39ff14, 0 0 24px #39ff14",
      },
      colors: {
        // You can define custom colors if you want to use className="text-primary", etc.
        primary: "#39ff14",
        secondary: "#65ec4d",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
