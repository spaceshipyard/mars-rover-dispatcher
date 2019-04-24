import { combineReducers } from 'redux'
import { reducer as socketReducer } from './socket'
import platformReducer from './paltform'
import cameraReducer from './camera'
import platformStepperReducer from './platform-stepper'
import videoReducer from './video'
import roomReducer from './room'
import sensorDataReducer from './sensor-data'
import messagesReducer from './messages'

const rootReducer = combineReducers({
  camera: cameraReducer,
  socket: socketReducer,
  platform: platformReducer,
  platformStepper: platformStepperReducer,
  video: videoReducer,
  room: roomReducer,
  sensorData: sensorDataReducer,
  messages: messagesReducer
})

export default rootReducer
