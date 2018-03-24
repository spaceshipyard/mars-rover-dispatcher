import { combineReducers } from 'redux'
import { reducer as socketReducer } from './socket'
import platformReducer from './paltform'
import platformStepperReducer from './platform-stepper'
import videoReducer from './video'
import roomReducer from './room'
import proximityReducer from './proximity'

const cameraReducer = (state = { x: 0, y: 0 }, action) => {
  if (action.type === 'camUpdate') {
    state = action.value
  }
  return state
}

const rootReducer = combineReducers({
  camera: cameraReducer,
  socket: socketReducer,
  platform: platformReducer,
  platformStepper: platformStepperReducer,
  video: videoReducer,
  room: roomReducer,
  proximity: proximityReducer
})

export default rootReducer
