import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";

export default {
  plugins: [postcssImport(), autoprefixer()],
};
