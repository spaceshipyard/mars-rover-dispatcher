import {combineReducers} from 'redux'

const proximityReducer = (state = [], {type, params}) => {
  const {data} = params.params // fixme it should be destructed somewhere else and dooble 'type' declaration should be removed
  if (type === 'message' &&
  params.cmd === 'sensor.data' &&
  params.params.type === 'proximity-data') {
    state = data
  }
  return state
}

export default combineReducers({proximity: proximityReducer})
