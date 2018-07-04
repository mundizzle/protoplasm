const fs = require("fs-extra");
const html = require("./html");
const css = require("./css");
const js = require("./js");

fs.emptyDir("./dist", error => {
  if (error) throw error;
  html();
  css();
  js();
});
