var webpack = require('webpack')

module.exports = {
  entry: {
    app:  [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.jsx',
    ]
  },

  output: {
    publicPath: "/build/",
    path: __dirname + "/build/",
    filename: "bundle.js"
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js(x?)/, 
        exclude: /node_modules/, 
        loaders: ["react-hot", "jsx-loader", "babel-loader"]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
