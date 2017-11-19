'use strict';

const express = require('express');
const _ = require('lodash');
const app = express();
const path = require('path');
const fs = require('fs');

const host = process.env.host || '127.0.0.1';
const port = process.env.port || 8080;

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);


configureStatic();
configureSocket();

console.log('listen', {host, port});

server.listen(port, host);


function configureStatic() {
    app.use('/socket.io/socket.io.js', express.static(path.resolve(__dirname, '../node_modules/socket.io-client/socket.io.js')));
    app.use('/', express.static('static'));
}

const defaultRoomName = 'lobby';

function configureSocket() {
    io.on('connection', function(socket){
        console.log('new connection');
        var currentRoomName;

        socket.on('disconnect', function() {
            console.log('Got disconnect!');
        });

        socket.on('echo',function(data){
            socket.emit('echo', data);
        });

        socket.on('msg:acknowledge', function (data) {
            console.log('msg:acknowledge', data);
        });

        socket.on('msg:rejected', function (data) {
            console.log('msg:rejected', data);
        });

        socket.on('message', function(data) {
            console.log('message', data);
            io.to(currentRoomName).emit('message', data);
        });

        socket.join(defaultRoomName, function () {
            currentRoomName = defaultRoomName;
            const rooms = Object.keys(socket.rooms).filter(item => item != socket.id);
            socket.emit('welcome', { currRooms: rooms } );
        });

        socket.on('join', ({roomName}) => {
            socket.leave(currentRoomName, () => {
                console.log('leave', currentRoomName, socket.id);
                socket.emit('leave', { roomName: currentRoomName });
                socket.join(roomName, () => {
                    currentRoomName = roomName;
                    socket.to(roomName).emit('memberJoined', {clientId: socket.id});
                    console.log('join', roomName, socket.id);
                    socket.emit('join', {roomName});
                });
            })
        });


    });

}
