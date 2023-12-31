const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }]
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 9000
  }
};
