const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");

const config = {
  input: "src/js/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};

module.exports = () => {
  async function build() {
    const bundle = await rollup.rollup(config);
    const { code } = await bundle.generate(config);
    await bundle.write({
      file: "dist/index.js",
      format: "cjs"
    });
  }
  build();
};
