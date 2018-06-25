'use strict'

const express = require('express')
const app = express()

const host = process.env.host || '127.0.0.1'
const port = process.env.serverPort || 443
const staticFolderPath = process.env.staticContentFolder || './../client/public'

const server = require('./../etc/utils/server')({host, port}, app)
const io = require('socket.io')(server)

configureStatic()
configureSocket()

function configureStatic () {
  app.use('/', express.static(staticFolderPath))
}

const defaultRoomName = 'lobby'

function configureSocket () {
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
      socket.emit('welcome', {currRooms: rooms})
    })

    socket.on('join', ({roomName}) => {
      socket.leave(currentRoomName, () => {
        console.log('leave', currentRoomName, socket.id)
        socket.emit('leave', {roomName: currentRoomName})
        socket.join(roomName, () => {
          currentRoomName = roomName
          socket.to(roomName).emit('memberJoined', {clientId: socket.id})
          console.log('join', roomName, socket.id)
          socket.emit('join', {roomName})
        })
      })
    })
  })
}
