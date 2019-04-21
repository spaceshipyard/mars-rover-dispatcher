import { combineReducers } from 'redux'

const proximityReducer = (state = [], { type, params }) => {
  if (type === 'message' && params.cmd === 'sensor.data') {
    // fixme it should be destructed somewhere else
    const { type, data } = params.params
    if (type === 'proximity-data') {
      state = data
    }
  }

  return state
}

export default combineReducers({ proximity: proximityReducer })
