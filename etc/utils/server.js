const path = require('path')
const fs = require('fs')

const privateKeyPath = process.env.CERT_PRIVATE_KEY || './../etc/localhost-cert/localhost.server.key'
const publicKeyPath = process.env.CERT_PUBLIC_KEY || './../etc/localhost-cert/localhost.server.crt'

const privateKey = fs.readFileSync(privateKeyPath).toString()
const certificate = fs.readFileSync(publicKeyPath).toString()

const options = {
  key: privateKey,
  cert: certificate
}

module.exports = function runServer ({host, port}, app) {
  const shutDownServer = () => {
    process.nextTick(() => {
      server.close()
      process.exit(0)
    })
  }

  app.get('/shutdown', function (req, res) {
    res.send('ok')
    shutDownServer()
  })

  const https = require('https')
  server = https.createServer(options, app)

  server.listen(port, host, function () {
    console.log('Listening on ' + host + ':' + port)
  })

  return server
}
