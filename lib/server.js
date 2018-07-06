const fs = require("fs-extra");
const chokidar = require("chokidar");
const browserSync = require("browser-sync");

const html = require("./build/html");
const css = require("./build/css");
const js = require("./build/js");
const assets = require("./build/assets");

const watch = () => {
  chokidar.watch("./src/html/**/*.html").on("all", html);
  chokidar.watch("./src/css/**/*.css").on("all", css);
  chokidar.watch("./src/js/**/*.js").on("all", js);
  chokidar.watch("./src/assets/**").on("all", assets);
};

fs.emptyDir("./dist", error => {
  if (error) throw error;
  const server = browserSync.create();
  server.init({
    server: "./dist",
    browser: "google chrome",
    files: "**"
  });
  watch();
});
