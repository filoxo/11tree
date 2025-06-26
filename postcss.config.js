export default ({ env }) => ({
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-import": {},
    "@csstools/postcss-minify": env === "production" ? {} : false,
  },
});
