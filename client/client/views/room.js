import {connect} from 'react-redux';

const stateToRoom = connect(
    ({room}) => ({room}),
    (dispatch) => ({
        requestJoinRoom: (name) => dispatch({type: 'requestJoinRoom', params: {name}})
    }));

class RoomView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {inLobby, requestJoinRoom} = this.props;
        return <div>
            <div>isLobby: {inLobby ? 'inLobby' : 'room'}</div>
            <div>join: <input value={this.state.joinRoomName}
                              onChange={({target}) => this.setState({joinRoomName: target.value})}/>
                <button onClick={() => requestJoinRoom(this.state.joinRoomName)}>join</button>
            </div>

        </div>
    }
};

export default stateToRoom(RoomView);