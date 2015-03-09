module.exports = {
  entry: {
    app:  ['./src/index-react.jsx']
  },

  output: {
    path: "build",
    filename: "bundle.js"
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js(x?)/,   exclude: /node_modules/, loader: "jsx-loader!babel-loader" }
    ]
  },
};
