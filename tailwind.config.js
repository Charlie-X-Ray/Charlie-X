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
      "cabin": ["Cabin", ...defaultTheme.fontFamily.sans]
    }
  },
  plugins: [],
}

