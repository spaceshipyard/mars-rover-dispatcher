import webpack from 'webpack'
import Config from 'webpack-config'
import path from 'path'

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '/../client/index.js')
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
