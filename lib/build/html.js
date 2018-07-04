const fs = require("fs-extra");
const glob = require("glob");
const frontMatter = require("front-matter");
const nunjucks = require("nunjucks");
nunjucks.configure("./src/templates", { autoescape: true, noCache: true });

const processPage = path => {
  const outputPath = path.replace("./src/pages", "./dist");

  fs.readFile(path, "utf8", (error, file) => {
    if (error) throw error;
    const { body, attributes } = frontMatter(file);
    const html = nunjucks.renderString(body, attributes);

    fs.outputFile(outputPath, html, error => {
      if (error) throw error;
    });
  });
};

const recurseFolder = path => {
  const allFolders = glob(`${path}/*/`, {}, function(error, folders) {
    if (error) throw error;
    if (folders.length) folders.forEach(recurseFolder);
  });
  const allPages = glob(`${path}/*.html`, {}, function(error, pages) {
    if (error) throw error;
    if (pages.length) pages.forEach(processPage);
  });
};

module.exports = () => {
  recurseFolder("./src/pages");
};
