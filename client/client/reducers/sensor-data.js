import { combineReducers } from 'redux'

const genericReducer = (sensorDataType) => {
  return (state = [], {type, params}) => {
    console.log({type, params})
    if (type === 'message' && (params.cmd === 'sensor.data' || params.cmd === 'i2c.data')) {
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
  i2cData: genericReducer('i2c-data')
})
