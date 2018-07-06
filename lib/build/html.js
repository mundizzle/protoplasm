const fs = require("fs-extra");
const glob = require("glob");
const frontMatter = require("front-matter");
const nunjucks = require("nunjucks");
const pretty = require("pretty");

const data = require("../../src/html/_data");

nunjucks.configure("./src/html/_templates", {
  autoescape: false,
  noCache: true
});

const _data = (method, args) => {
  return data[method](args);
};

const processPage = path => {
  const outputPath = path.replace("./src/html", "./dist");
  const depth = outputPath.split("/").length - 3;
  const _root = depth > 0 ? "../".repeat(depth) : "./";
  fs.readFile(path, "utf-8", (error, file) => {
    if (error) throw error;
    const { body, attributes } = frontMatter(file);
    const html = nunjucks.renderString(body, { ...attributes, _data, _root });

    fs.outputFile(outputPath, pretty(html, { ocd: true }), error => {
      if (error) throw error;
    });
  });
};

const recurseFolder = path => {
  const allFolders = glob(`${path}/*/`, { ignore: [`${path}/_*/`] }, function(
    error,
    folders
  ) {
    if (error) throw error;
    if (folders.length) folders.forEach(recurseFolder);
  });
  const allPages = glob(`${path}/*.html`, {}, function(error, pages) {
    if (error) throw error;
    if (pages.length) pages.forEach(processPage);
  });
};

module.exports = () => {
  recurseFolder("./src/html");
};
