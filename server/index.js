const fs = require('fs')
const https = require('https')
const express = require('express')
const path = require('path')
const app = express()

const host = process.env.host || '127.0.0.1'
const port = process.env.serverPort || 443

configureStatic()
configureSocket()

function configureStatic () {
  const staticFolderPath = process.env.staticContentFolder || './../client/public'
  app.use('/', express.static(staticFolderPath))
}

function configureSocket () {
  const server = createServer({ host, port })

  const defaultRoomName = 'lobby'

  const io = require('socket.io')(server)

  io.on('connection', function (socket) {
    console.log('new connection')
    var currentRoomName

    socket.on('disconnect', function () {
      console.log('Got disconnect!')
    })

    socket.on('echo', function (data) {
      socket.emit('echo', data)
    })

    socket.on('msg:acknowledge', function (data) {
      console.log('msg:acknowledge', data)
    })

    socket.on('msg:rejected', function (data) {
      console.log('msg:rejected', data)
    })

    socket.on('message', function (data) {
      console.log('message', currentRoomName, data)
      socket.broadcast.to(currentRoomName).emit('message', data)
      socket.emit('msg:broadcasted', data)
    })

    socket.join(defaultRoomName, function () {
      currentRoomName = defaultRoomName
      const rooms = Object.keys(socket.rooms).filter(item => item !== socket.id)
      socket.emit('welcome', { currRooms: rooms })
    })

    socket.on('join', ({ roomName }) => {
      socket.leave(currentRoomName, () => {
        console.log('leave', currentRoomName, socket.id)
        socket.emit('leave', { roomName: currentRoomName })
        socket.join(roomName, () => {
          currentRoomName = roomName
          socket.to(roomName).emit('memberJoined', { clientId: socket.id })
          console.log('join', roomName, socket.id)
          socket.emit('join', { roomName })
        })
      })
    })
  })
}

function createServer ({ host, port }) {
  const serv = https.createServer({
    key: fs.readFileSync(process.env.CERT_PUBLIC_KEY || path.join('..', 'etc', 'localhost-cert', 'localhost.server.key')),
    cert: fs.readFileSync(process.env.CERT_PRIVATE_KEY || path.join('..', 'etc', 'localhost-cert', 'localhost.server.crt')),
    ca: fs.readFileSync(process.env.CERT_PRIVATE_KEY || path.join('..', 'etc', 'localhost-cert', 'localhost.server.crt')),
    requestCert: false,
    rejectUnauthorized: false
  }, app)

  app.get('/shutdown', function (req, res) {
    res.send('ok, shutdown')
    process.nextTick(() => {
      serv.close()
      process.exit(0)
    })
  })

  serv.listen(port, host, () => {
    console.log('Mars-Rover-Dispatcher server up and running at %s:%s', host, port)
  })

  return serv
}
