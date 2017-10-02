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

    function msgForward() {
        emitCmd('direction', { value: "FORWARD" });
    }

    function msgLeft() {
        emitCmd('rotate-left', {});
    }

    function msgRight() {
        emitCmd('rotate-right', {});
    }

    function msgBack() {
        emitCmd('direction', { value: "BACKWARD" });
    }

    function msgRelease() {
        emitCmd('direction', { value: "RELEASE" });
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
