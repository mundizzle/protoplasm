const fs = require("fs-extra");

module.exports = () => {
  fs.copy("./src/assets", "./dist/assets", error => {
    if (error) throw error;
  });
};
