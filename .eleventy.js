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
          },
    );
  });

  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addGlobalData("author", "Your name here");
  eleventyConfig.addGlobalData("title", "Your site title here");

  /**
   * No-code icons, using Iconify api
   * @docs https://iconify.design/docs/usage/css/no-code/
   * @docs https://icon-sets.iconify.design/ion/?keyword=ion
   *
   * 1. default theme is "ion", change it to any other theme at icon-sets.iconify.design
   * 2. explictly list the icons you want to use. this helps save bandwidth and forces you to be intentional about which icons are loaded
   * 3. use with `tree-icon` webc component
   *
   * @example <tree-icon name="logo-youtube"></tree-icon>
   * @see src/_components/tree-icon.webc
   */
  const icons = {
    theme: "ion",
    names: [
      "logo-instagram",
      "logo-facebook",
      "logo-twitter",
      "logo-whatsapp",
      "logo-youtube",
      "home-outline",
      "business-outline",
      "sunny-outline",
      "call-sharp",
      "call-outline",
      "phone-portrait-outline",
      "chevron-back",
      "chevron-forward",
    ],
    get url() {
      const iconListParam = encodeURIComponent(this.names.join(","));
      return `https://api.iconify.design/${this.theme}.css?icons=${iconListParam}`;
    },
  };

  eleventyConfig.addGlobalData("iconSet", icons);

  return {
    dir: {
      input: "src",
    },
  };
};
