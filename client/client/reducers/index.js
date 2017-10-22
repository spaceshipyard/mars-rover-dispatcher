import { combineReducers } from 'redux';
import { reducer as socketReducer, addEvents as addSocketEvents } from './socket';

const cameraReducer = (state = { x: 0, y: 0 }, action) => {
    switch (action.type) {
        case 'camUpdate':
            return state = action.value;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    camera: cameraReducer,
    socket: socketReducer,
});

export default rootReducer;