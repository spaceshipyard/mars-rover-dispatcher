import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

export default new Config().merge({
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.join(__dirname, '/../public')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          error: false,
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader'
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /mock-server/
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['env', {
              modules: false
            }],
            'stage-0',
            'react'
          ]
        }
      },
      {
        test: /.css?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: 'body'
    })]
})
