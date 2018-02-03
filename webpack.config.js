const path = require('path');

console.log(path.join(__dirname, "public", "scripts"))

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public", "scripts"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  }
};
