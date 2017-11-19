const postcssImport = require("postcss-import");
const postcssAssets = require("postcss-assets");
const cssnext = require("cssnext");
const postcssSimpleVars = require("postcss-simple-vars");
const postcssNested = require("postcss-nested");
const postcssColourFunctions = require("postcss-colour-functions");
const postcssInlineSvg = require("postcss-inline-svg");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = function() {
  return {
    plugins: [
      postcssAssets({
        loadPaths: ["./app/images/"],
        relative: "./app/css/"
      }),
      postcssImport,
      postcssSimpleVars,
      cssnext,
      postcssNested,
      postcssInlineSvg,
      postcssColourFunctions,
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    ]
  };
};
