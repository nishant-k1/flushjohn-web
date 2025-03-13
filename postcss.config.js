export default {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production"
      ? require("@fullhuman/postcss-purgecss")({
          content: ["./pages/**/*.js", "./components/**/*.js"],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        })
      : null,
  ],
};
