#!/bin/bash
### BEGIN INIT INFO
# Provides: mars-rover-dispatcher
# Required-Start: $remote_fs $syslog
# Required-Stop: $remote_fs $syslog
# Default-Start: 2 3 4 5
# Default-Stop: 0 1 6
# Short-Description: mars-rover-dispatcher
# Description: This file starts and stops mars-rover-dispatcher server
#
### END INIT INFO

#set -x

# Absolute path this script is in. /home/user/bin
ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
echo $ABSOLUTE_PATH
export basedir=`dirname $ABSOLUTE_PATH`
export port=443

if [[ $env = "dev" ]]
then
    export host=localhost
else
    export host=mars-rover.online
    export serverHost='"mars-rover.online"'
    export CERT_PRIVATE_KEY=${basedir}/etc/mars-rover-cert/mars-rover.org.key
    export CERT_PUBLIC_KEY=${basedir}/etc/mars-rover-cert/mars-rover.org.crt
fi

function install {
    if git diff-index --quiet HEAD --; then
        # No changes
        echo "git verification has been passed, no local changes"
    else
        # Changes
        echo "local git changes are observed procedure is terminated"
        exit 1
    fi

    git pull --rebase

    cd ${basedir}/server
    npm i

    buildClient

}

function buildClient {
    cd ${basedir}/client
    npm i
    npm run build:prod
    cd ${basedir}
}

function run {
    cd ${basedir}/server
    nohup npm run start:watch &

    cd ${basedir}
}

function stop {
    curl -k https://${host}:${port}/shutdown
}

case "$1" in
 start)
  stop
  run
 ;;
 stop)
  stop
 ;;
 restart)
  stop
  run
 ;;
 install)
  install
 ;;
 buildClient)
  buildClient
 ;;
 *)
  echo "Usage: mars-rover-dispatcher {start|stop|restart|install|buildClient}" >&2
  exit 3
 ;;

esac



