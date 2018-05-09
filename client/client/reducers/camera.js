import { combineReducers } from 'redux'

const cameraReducer = (state = { x: 0, y: 0 }, action) => {
  if (action.type === 'camUpdate') {
    state = action.value
  }
  return state
}

export default combineReducers({ offset: cameraReducer })
