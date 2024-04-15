// const eleventySass = require("eleventy-sass");
const PostCSSPlugin = require("eleventy-plugin-postcss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addPlugin(pluginWebc);

  // eleventyConfig.addShortcode("avatar", function (url, alt) {
  //   return `<img src="${url}" alt="${alt}" class="rounded-full w-24 h-24 border-4 border-solid border-teal-500 m-auto" />`;
  // });

  //   eleventyConfig.addPairedShortcode(
  //     "link",
  //     function (content, href, options = {}) {
  //       const external = options.external || true;
  //       const props = {
  //         href,
  //         class: "inline-flex items-center gap-4 justify-center",
  //         target: external ? "_blank" : undefined,
  //         rel: external ? "noopener noreferrer" : undefined,
  //         "aria-label": options["aria-label"],
  //       };

  //       // convert to `attribute="value"`
  //       const linkAttrs = Object.entries(props)
  //         .map(([attr, value]) => (value ? `${attr}="${value}"` : ""))
  //         .join(" ");

  //       return `<a ${linkAttrs}>${content}</a>`;
  //     }
  //   );

  //   let linkIdCount = 0;
  //   const genLinkId = () => `link-${linkIdCount++}`;

  //   eleventyConfig.addPairedShortcode("nsfw", function (content, href) {
  //     const id = genLinkId();
  //     const props = {
  //       href,
  //       class: "inline-flex items-center gap-4 justify-center",
  //       target: "_blank",
  //       rel: "noopener noreferrer",
  //     };

  //     // convert to `attribute="value"`
  //     const linkAttrs = Object.entries(props)
  //       .map(([attr, value]) => (value ? `${attr}="${value}"` : ""))
  //       .join(" ");

  //     return `<button ${linkAttrs} onClick="document.getElementById('${id}')?.showModal()" type="button">${content}</button>
  // <dialog id="${id}" class="p-6 md:p-8 space-y-4 rounded-xl shadow backdrop-blur-lg bg-white/90">
  //   <p class="text-center">Are you 18 years or older?</p>
  //   <button onClick="document.getElementById('${id}')?.close()">No, I'm not 18</button>
  //   <a ${linkAttrs}>Yes, proceed to site</a>
  // </dialog>`;
  //   });

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
