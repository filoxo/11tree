module.exports = ({ env }) => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-import": {},
    "@csstools/postcss-minify": env === "production" ? {} : false,
  },
});
