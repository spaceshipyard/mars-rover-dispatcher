import express from 'express';
import path from 'path';

const PORT = 8082;
const PUBLIC_PATH = __dirname + '/public';
const app = express();

const isDevelopment = process.env.NODE_ENV === 'development';

let server;

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.babel').default;
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(PUBLIC_PATH));
}


//fixme copy past with socket server and UI
const shutDownServer = () => {
    process.nextTick(() => {
        server.close();
        process.exit(0);
    })
};
app.get('/shutdown', function(req, res) {
    res.send('ok');
    shutDownServer();
});

app.all("*", function(req, res) {
  res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});


server = app.listen(PORT, '0.0.0.0', function() {
  console.log('Listening on port ' + PORT + '...');
});