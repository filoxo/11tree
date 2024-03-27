// const eleventySass = require("eleventy-sass");
const PostCSSPlugin = require("eleventy-plugin-postcss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addShortcode("avatar", function (url, alt) {
    return `<img src="${url}" alt="${alt}" class="rounded-full w-24 h-24 border-4 border-solid border-teal-500 m-auto" />`;
  });

  eleventyConfig.addPairedShortcode("link", function (content, href) {
    return `<a href="${href}" class="inline-flex items-center gap-4 justify-center">${content}</a>`;
  });

  eleventyConfig.addNunjucksGlobal("currentYear", new Date().getFullYear());
  eleventyConfig.addNunjucksGlobal("author", "Your name here");

  // selected icon theme prefix, https://iconify.design/icon-sets/
  const iconPrefix = "ion";
  // accumulate which icons are being used on site
  const iconSet = new Set();

  /* use in .njk files, `{% icon 'icon-name' %}` */
  eleventyConfig.addShortcode("icon", (iconName) => {
    iconSet.add(iconName);
    return `<span class="icon icon--${iconPrefix} icon--${iconPrefix}--${iconName} text-current text-3xl" aria-hidden="true"></span>`;
  });

  // using https://iconify.design/docs/usage/css/no-code/ approach for icons.
  // This generates an Iconify stylesheet URL, exposed as a njk global for interpolation in default layout.
  eleventyConfig.addNunjucksGlobal("iconSetUrl", () => {
    const icons = encodeURIComponent(Array.from(iconSet).join(","));
    // enumerate icons from https://icon-sets.iconify.design/ri/ in order to optimize stylesheet weight
    const iconUrl = `https://api.iconify.design/${iconPrefix}.css?icons=${icons}`;
    return iconUrl;
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
