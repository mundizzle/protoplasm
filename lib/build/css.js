const fs = require("fs-extra");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const postcssNormalize = require("postcss-normalize");
const postcssPresetEnv = require("postcss-preset-env");

const from = "./src/css/index.css";
const to = "./dist/index.css";

module.exports = () => {
  fs.readFile(from, "utf-8", (error, css) => {
    if (error) throw error;

    postcss([postcssImport, postcssNormalize(), postcssPresetEnv({ stage: 0 })])
      .process(css, { from: from, to: to })
      .then(result => {
        fs.outputFile(to, result.css, error => {
          if (error) throw error;
        });
      });
  });
};
