import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default new Config().merge({
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: __dirname + '/../public',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: "body"
    })]
});