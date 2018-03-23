import {combineReducers} from 'redux'

const inLobbyReducer = (state = true, {type}) => {
  switch (type) {
    case 'inLobby' :
      return true
    case 'leaveLobby':
      return false
    default:
      return state
  }
}

const roomNameReducer = (state = '', action) => {
  switch (action.type) {
    case 'join':
      return action.params.roomName || 'undefined room name'
    case 'inLobby':
      return '<<lobby>>'
    default:
      return state
  }
}

export default combineReducers({inLobby: inLobbyReducer, roomName: roomNameReducer})
