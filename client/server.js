import express from 'express'
import path from 'path'
import fs from 'fs'

const PORT = process.env.portClient || 8082
const HOST = process.env.host || '0.0.0.0'
const PUBLIC_PATH = path.join(__dirname, '/public')
const app = express()

const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment) {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.babel').default
  const compiler = webpack(webpackConfig)
  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use(express.static(PUBLIC_PATH))
}

require('./../etc/utils/server')({ host:HOST, port: PORT }, app)

app.all('*', function (req, res) {
  res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'))
})