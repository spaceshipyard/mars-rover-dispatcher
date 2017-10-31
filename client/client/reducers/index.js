import { combineReducers } from 'redux';
import { reducer as socketReducer } from './socket';
import platformReducer from './paltform';
import platformStepperReducer from './platform-stepper';
import videoReducer from './video';
import roomReducer from './room';

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
    platform: platformReducer,
    platformStepper: platformStepperReducer,
    video: videoReducer,
    room: roomReducer
});

export default rootReducer;