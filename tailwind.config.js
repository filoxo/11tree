const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,webc}", "./.eleventy.js"],
  plugins: [require("@tailwindcss/typography")],
};
