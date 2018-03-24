import { combineReducers } from 'redux'

const offsetReducer = (state = { x: 0, y: 0 }, action) => {
  if (action.type === 'platformStepperMove') {
    state = action.value
  }
  return state
}

export default combineReducers({ offset: offsetReducer })
