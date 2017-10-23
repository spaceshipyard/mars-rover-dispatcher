import { combineReducers } from 'redux';
import { reducer as socketReducer } from './socket';
import platformReducer from './paltform';

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
    platform: platformReducer
});

export default rootReducer;