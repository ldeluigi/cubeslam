const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'build')
  },
  target: 'node',
  optimization: {
        minimize: false // for debug purposes
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery",
    "css-emitter": "CssEmitter",
    "preloader": "Preloader"
  }
};
