import { combineReducers } from 'redux'

const INITIAL_STATE = { x: 90, y: 90 }

const cameraReducer = (state = INITIAL_STATE, action) => {
  if (action.type === 'camUpdate') {
    state = { ...state, ...action.value }
  }
  return state
}

export default combineReducers({ offset: cameraReducer })
