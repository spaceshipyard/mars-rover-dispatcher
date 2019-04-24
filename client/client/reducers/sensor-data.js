import { combineReducers } from 'redux'

const genericReducer = (sensorDataType) => {
  return (state = [], {type, params}) => {
    if (type === 'message' && params.cmd === 'sensor.data') {
      // fixme it should be destructed somewhere else
      const {type, data} = params.params
      if (type === sensorDataType) {
        state = data
      }
    }

    return state
  }
}

export default combineReducers({
  proximity: genericReducer('proximity-data'),
  motorEncoder: genericReducer('motor-encoder-data')
})
