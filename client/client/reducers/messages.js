import _ from 'lodash'

const MAX_MESSAGES = 20
let msgIdCounter = 0

function formatTime (date) {
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return `${hours}:${minutes}:${seconds}`
}

const getLastMessages = arr => arr.slice(arr.length > MAX_MESSAGES ? arr.length - MAX_MESSAGES : 0)

const messagesReducer = (state = {data: [], commands: []}, action) => {
  const {params} = action

  if (!params || !params.cmd) {
    return state
  }

  if (action.type === 'msg:broadcasted') {
    const originalMsg = _.find(state.commands, { 'localId': params.localId })
    if (originalMsg) {
      originalMsg.boardcasted = true
      return { ...state, commands: [...state.commands] }
    }
    return state
  }

  params.time = formatTime(new Date())
  params.localId = msgIdCounter++

  if (params.cmd.includes('.data')) {
    return { data: getLastMessages([...state.data, params]), commands: [...state.commands] }
  } else {
    return { data: [...state.data], commands: getLastMessages([...state.commands, params]) }
  }
}

export default messagesReducer
