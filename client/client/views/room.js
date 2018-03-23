import React from 'react'
import {connect} from 'react-redux'

const stateToRoom = connect(
  ({room}) => ({room}),
  (dispatch) => ({
    requestJoinRoom: (name) => dispatch({type: 'requestJoinRoom', params: {name}})
  }))

class RoomView extends React.Component {
  constructor (props) {
    super(props)
    this.state = { joinRoomName: window.localStorage.joinRoomName || 'lobby' }
  }

  onChange (value) {
    this.setState({joinRoomName: value})
    window.localStorage.joinRoomName = value
  }

  render () {
    const {room: {inLobby, roomName}, requestJoinRoom} = this.props
    return <div>
      <div>{inLobby ? 'inLobby' : 'in room'}</div>
      <div>Room Name: {roomName}</div>
      <div>join:</div>
      <div>
        <input value={this.state.joinRoomName} onChange={({target}) => this.onChange(target.value)} />
        <button onClick={() => requestJoinRoom(this.state.joinRoomName)}>join</button>
      </div>
    </div>
  }
};

export default stateToRoom(RoomView)
