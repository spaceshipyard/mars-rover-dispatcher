/**
 * Created by drykovanov on 12.08.2017.
 */
var msgIdCounter = 0;

function getMessageEmitter(socket) {

    socket.on('message', onMessage);

    function onMessage(msg) {
        console.log('on message', msg);
    }

    function emitMsg(data) {
        data.id = msgIdCounter++;
        socket.emit('message', data)
    }

    function emitCmd(cmd, parameters) {
        emitMsg({ cmd: cmd, params: parameters || {} })
    }

    function join(roomName) {
        socket.emit('join', { roomName })
    }

    return {
        emitCmd: emitCmd,
        emitMsg: emitMsg,
        join: join
    }
}
