#!/bin/sh
rootdir='/root'

log=$rootdir/log

#server
host=127.0.0.1
port=8080

#client
portClient=8082

room=vn

export host=$host
export port=$port
export portClient=$portClient
export room=$room

cd $rootdir/mars-rover-dispatcher/server
#git pull
npm run start &

cd $rootdir/mars-rover-dispatcher/client
#git pull
#npm run start 
npm run build:dev &

#cd $rootdir/mars-rover-node-bridge
#git pull
#npm run start > $log &
