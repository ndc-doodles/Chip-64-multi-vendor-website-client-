export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
      },

      // 👇 ADD THIS ONLY
      fontFamily: {
        sans: ["Mona Sans", "system-ui", "sans-serif"],
      },
    },
  },
};
