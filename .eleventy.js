// const eleventySass = require("eleventy-sass");
const PostCSSPlugin = require("eleventy-plugin-postcss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const htmlminifier = require("html-minifier-terser");

const IS_PROD_BUILD = process.env.NODE_ENV === "production";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addPlugin(pluginWebc, {
    /**
     * Global no-import Components configuration - any webc components in here can be used in any template without needing to import.
     * @see https://www.11ty.dev/docs/languages/webc/#global-no-import-components
     */
    components: "src/_components/**/*.webc",
  });

  eleventyConfig.addTransform("htmlminifier", (content, outputPath) => {
    if (!outputPath.endsWith(".html")) return content;

    return htmlminifier.minify(
      content,
      IS_PROD_BUILD
        ? {
            useShortDoctype: true,
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyElements: true,
            removeRedundantAttributes: true,
          }
        : {
            useShortDoctype: true,
            collapseWhitespace: true,
            maxLineLength: 120,
            preserveLineBreaks: true,
            removeEmptyElements: true,
            removeRedundantAttributes: true,
          }
    );
  });

  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addGlobalData("author", "Your name here");
  eleventyConfig.addGlobalData("title", "Your site title here");

  /**
   * No-code Icons
   * @see https://iconify.design/docs/usage/css/no-code/
   *
   * Just need to select a
   */
  eleventyConfig.addGlobalData("icon", {
    prefix: "ion",
    list: new Set([
      "logo-youtube",
      "logo-twitter",
      "logo-twitter-x",
      "logo-instagram",
      "logo-tiktok",
      "logo-reddit",
    ]),
    get url() {
      const iconListParam = encodeURIComponent(Array.from(this.list).join(","));
      return `https://api.iconify.design/${this.prefix}.css?icons=${iconListParam}`;
    },
  });

  return {
    dir: {
      input: "src",
    },
  };
};
