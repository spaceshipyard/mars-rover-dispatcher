[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Mars Rover Dispatcher
=========================
**Dispatcher/server** is a web server to control remote robots over network based on socket.io

**Dispatcher/client** is a web client for Pilots based on webpack and react/redux/redux-sagas to control camera's servos and movement

---

You need to run Dispatcher server with valid https sertificates and client on some vps/local pc.
And [Arduino Bridge](https://github.com/spaceshipyard/mars-rover-node-bridge) on Raspberry configured to Dispatcher's host and port

---

# How To start Dispatcher/server 
1. `cd server` 
1. `npm i`
1. `npm run start` 

# How to start Dispatcher/client (separate console)
1. `cd client`
1. `npm i`
1. `npm run build:prod`
1. open `https://localhost:8082`