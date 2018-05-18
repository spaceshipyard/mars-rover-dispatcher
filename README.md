[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Mars Rover Dispatcher
=========================
it is a web server to control remote robots over network based on socket.io,
it has a web client based on webpack and react/redux/redux-sags with joysticks to control camera and moving

# How To Start Socket Server
1. open `./server` folder
1. set `host` and `port` as env variables default values `0.0.0.0:8080`
1. `npm i`
1. `npm run start`


# How to Start Client (Web Client for pilots)
1. open `./client`
1. `npm i`
1. `npm run build:prod` , it starts serving client static files on `0.0.0.0:80`

note:
(0.0.0.0) means all network interfaces, so http://localhost:80 and http://localhost:8080(for dispatcher server), or http://yourhost:8080
