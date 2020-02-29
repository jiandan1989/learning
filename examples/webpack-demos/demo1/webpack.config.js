const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src/"),
  entry: {
    index: "./index.js",
    demo: "./demo.js"
  },
  // entry: {
  //   // 对象形式
  //   main: "./src/index.js",
  //   demo: "./src/demo.js"
  // },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[id].js"
  }
};
