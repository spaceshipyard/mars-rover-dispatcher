import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, takeEvery, call, put, cancel } from 'redux-saga/effects';

function connect() {
    const socket = io(':8080');
    return socket;
}

function subscribe(socket) {

    return eventChannel(emit => {

        const bindToSocket = (event) => { socket.on(event, (data) => emit({ type: event, params: data })); };

        bindToSocket('connect');
        bindToSocket('reconnected');
        bindToSocket('error');
        bindToSocket('reconnect_error');
        bindToSocket('disconnect');
        bindToSocket('message');
        bindToSocket('welcome');
        bindToSocket('join');
        bindToSocket('memberJoined');

        return () => { };
    });
}

function* read(socket) {
    console.log('subscribe');
    const channel = yield call(subscribe, socket);
    while (true) {
        let action = yield take(channel);
        console.log('action', action);
        yield put(action);
    }
}


function* camUpdate() {
    while (true) {
        const { value } = yield take('camUpdate');

        const msg = { cmd: 'camera', params: { offset: value } }

        yield put({ type: 'sendMessage', params: msg });
    }

}

function* platformMove() { // fixme copy past from cam update
    while (true) {
        const { value } = yield take('platformMove');

        const msg = { cmd: 'direction', params: { offset: value } }

        yield put({ type: 'sendMessage', params: msg });
    }
}

function* videoCall(socket, action) {
    while (true) {
        const { participant } = yield take('requestVideoCall');
        socket.emit('message', { cmd: 'makeCall', video: true, participants: participant });
    }
}


function* write(socket, action) {
    while (true) {
        const { params } = yield take('sendMessage');
        socket.emit('message', params);
    }
}

function* handleIO(socket) {
    yield fork(camUpdate);
    yield fork(videoCall, socket);
    yield fork(platformMove);
    yield fork(read, socket);
    yield fork(write, socket);
}

function* flow() {
    while (true) {
        const socket = yield call(connect);
        const task = yield fork(handleIO, socket);
        let action = yield take(`logout`);
        yield cancel(task);
    }
}

export default function* rootSaga() {
    yield fork(flow);
}