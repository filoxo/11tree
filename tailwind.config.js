const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,md,njk}", "./.eleventy.js"],
  plugins: [require("@tailwindcss/typography")],
};
