const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production'

const version = require('./package.json').version
const banner = `Spirit.js v${version}\n\n(c) ${new Date().getFullYear()} Patrick Brouwer\nReleased under the MIT License.`

const config = {
  devtool: isProd ? false : 'source-map',
  entry: './src/index.js',
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.join(__dirname, './dist'),
    filename: isProd ? 'spirit.min.js' : 'spirit.js',
    library: 'spirit',
    libraryTarget: 'var',
    libraryExport: 'default'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    }),
  ],
  ...(isProd && {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false })]
    }
  })
}

module.exports = config
