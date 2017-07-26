'use strict';

const express = require('express');
const _ = require('lodash');
const app = express();
const path = require('path');
const fs = require('fs');

const host = process.env.host || 'localhost';
const port = process.env.port || 80;

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);


configureStatic();
configureSocket();

server.listen(port, host);


function configureStatic() {
    app.use('/socket.io/socket.io.js', express.static(path.resolve(__dirname, '../node_modules/socket.io-client/socket.io.js')));
    app.use('/', express.static('static'));
}

function configureSocket() {
    io.on('connection', function(socket){
        console.log('new connection');
        var activeTicket;

        socket.on('disconnect', function() {
            console.log('Got disconnect!');
        });

        socket.on('echo',function(data){
            socket.emit('echo', data);
        });

        socket.on('message', function(data) {
            console.log('message', data);
            io.emit('message', data);
        });

        socket.emit('welcome', function () {});
    });

}