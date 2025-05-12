export default ({ env }) => ({
  plugins: {
    "@tailwindcss/postcss": {},
    "@csstools/postcss-minify": env === "production" ? {} : false,
  },
});
