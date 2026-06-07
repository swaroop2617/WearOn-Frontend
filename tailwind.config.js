export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',       // dark text
        secondary: '#6B7280',     // muted text
        accent: '#E11D48',        // highlight (pink/red)
        bg: '#FFF7ED',            // soft background (instead of peach)
        card: '#FFFFFF',          // card background
        border: '#E5E7EB',        // borders
      }
    },
  },
  plugins: [],
}