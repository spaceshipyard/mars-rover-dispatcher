#!/bin/sh
rootdir='/home/pi/mars-control'
host=198.168.0.123
port=8082

cd $rootdir/mars-rover-node-bridge
git pull
export host=http://$host:$port
nohup npm start &

cd $rootdir/mars-rover-dispatcher/server
git pull
export host=$host 
nohup npm start &

cd $rootdir/mars-rover-dispatcher/client
git pull
nohup npm run build:dev &
