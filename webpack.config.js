const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const version = require('./package.json').version
const banner = `Spirit.js v${version}\n\n(c) ${new Date().getFullYear()} Patrick Brouwer\nReleased under the MIT License.`

const config = {
  devtool: isProd ? false : 'source-map',
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
    extensions: ['.js'],
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

if (isProd) {
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true
      }
    })
  )
}

module.exports = config
