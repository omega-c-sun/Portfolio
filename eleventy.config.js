module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("NOTES.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("_site/**");

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("files");

  eleventyConfig.addFilter("date", (value, format = "YYYY-MM-DD") => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const yyyy = d.getUTCFullYear();
    const monthIndex = d.getUTCMonth();
    const mm = String(monthIndex + 1).padStart(2, "0");
    const dayNum = d.getUTCDate();
    const dd = String(dayNum).padStart(2, "0");
    if (format === "%Y-%m-%d" || format === "YYYY-MM-DD") return `${yyyy}-${mm}-${dd}`;
    if (format === "%B %d, %Y") return `${months[monthIndex]} ${dayNum}, ${yyyy}`;
    if (format === "%b %Y") return `${short[monthIndex]} ${yyyy}`;
    return `${yyyy}-${mm}-${dd}`;
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("projects/*.md")
      .filter((item) => !item.inputPath.replace(/\\/g, "/").endsWith("/index.md"))
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
