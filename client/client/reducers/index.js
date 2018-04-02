import { combineReducers } from 'redux'
import { reducer as socketReducer } from './socket'
import platformReducer from './paltform'
import cameraReducer from './camera'
import platformStepperReducer from './platform-stepper'
import videoReducer from './video'
import roomReducer from './room'
import proximityReducer from './proximity'

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
