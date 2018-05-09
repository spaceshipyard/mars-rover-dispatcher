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
      Robot selection
      <div className='robot-selection'>{inLobby ? 'in lobby - default channel, type channel name to connect' : <div>Robot: {roomName}</div>}</div>
      <div className='room-buttons'>
        <input placeholder='channel name' value={this.state.joinRoomName} onChange={({target}) => this.onChange(target.value)} />
        <button onClick={() => requestJoinRoom(this.state.joinRoomName)}>connect</button>
      </div>
    </div>
  }
};

export default stateToRoom(RoomView)
