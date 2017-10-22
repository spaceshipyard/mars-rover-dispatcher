import { connect } from 'react-redux';

const SocketStatus = ({ socket }) => {
    const {connected, errors} = socket;
    return <div>
        Socket Status - {connected ? 'connected' : 'disconnected'}
        <div> {errors.map( error => <div>{JSON.stringify(error)}</div> )} </div>
        </div>
};

export default connect(
    ({socket}) => ({socket}),
    (dispatch) => ({}))(SocketStatus);