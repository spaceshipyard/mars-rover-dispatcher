import { combineReducers } from 'redux'

export default combineReducers({
  participant: (state = '', action) => {
    switch (action.type) {
      case 'videoParticipantUpdate':
        return action.value
      default:
        return state
    }
  }
})
