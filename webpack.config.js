const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build"),
    library: 'slam',
    libraryTarget: 'global'
  },
  target: "web",
  optimization: {
    minimize: false // for debug purposes
  },
  externals: {},
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
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, "./jquery/jquery.js"),
      cookie: "component-cookie"
    }
  },
  node: { fs: "empty", tls: "empty" }
};
