const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const version = require('./package.json').version
const banner = `Spirit.js v${version}
(c) ${new Date().getFullYear()} Patrick Brouwer
Released under the MIT License.`

const config = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: 'index',
  output: {
    path: path.join(__dirname, './dist'),
    filename: isProd ? 'spirit.min.js' : 'spirit.js',
    library: 'spirit',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isProd ? 'production' : 'development')
    })
  ]
}
module.exports = config
