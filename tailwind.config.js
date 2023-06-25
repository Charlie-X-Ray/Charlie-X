/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "iceland": ["Iceland", ...defaultTheme.fontFamily.sans],
      "cabin": ["Cabin", ...defaultTheme.fontFamily.sans],
      "cutive": ["Cutive", ...defaultTheme.fontFamily.serif],
      "crimsontext": ["Crimson Text", ...defaultTheme.fontFamily.serif],
      "sans": defaultTheme.fontFamily.sans,
      "serif": defaultTheme.fontFamily.serif,
      "mono": defaultTheme.fontFamily.mono,
    }
  },
  plugins: [],
}

