/**
 * Created by drykovanov on 12.08.2017.
 */

function getMessageEmitter(socket) {

    socket.on('message', onMessage);

    function onMessage(msg) {
        console.log('on message', msg);
    }

    function emitMsg(data) {
        socket.emit('message', data)
    }

    function emitCmd(cmd, parameters) {
        emitMsg({ cmd: cmd, parameters: parameters || {} })
    }

    function msgForward() {
        emitCmd('direction:FORWARD;');
    }

    function msgLeft() {
        emitCmd('dir-left:;');
    }

    function msgRight() {
        emitCmd('dir-right:;')
    }

    function msgBack() {
        emitCmd('direction:BACKWARD;');
    }

    function msgRelease() {
        emitCmd('direction:RELEASE;');
    }

    function join(roomName) {
        socket.emit('join', { roomName })
    }

    return {
        emitCmd: emitCmd,
        msgForward: msgForward,
        msgBack: msgBack,
        msgLeft: msgLeft,
        msgRight: msgRight,
        msgRelease: msgRelease,
        join: join
    }
}
