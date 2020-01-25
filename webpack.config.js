const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build")
  },
  target: "web",
  optimization: {
    minimize: false // for debug purposes
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: "jQuery",
    "css-emitter": "CssEmitter",
    preloader: "Preloader"
  },
  module: {
    rules: [
      {
        test: /\.(obj|mtl)$/,
        use: ["file-loader"]
      }
    ],
    noParse: [/\.py/]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.ContextReplacementPlugin(/copy/, data => {
      delete data.dependencies[0].critical;
      return data;
    })
  ],
  node: { fs: "empty", tls: "empty" }
};
