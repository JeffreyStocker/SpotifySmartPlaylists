const path = require('path');
const webpack = require ('webpack');
const dotEnv = require ('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new dotEnv(),
    // new webpack.DefinePlugin({
    //   'clientID': JSON.stringify(process.env.CLIENT_ID)
    // })
  ],
  watchOptions: {
    ignored: [/node_modules/, 'src']
  }
};