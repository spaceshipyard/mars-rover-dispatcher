import { connect } from 'react-redux';


const VideoPanel = ({ participant, requestCall, onChange }) => {
    return <div>
        <span>video panel</span>
        <input type="text" value={participant} onChange={e => onChange(e.target.value)} />
        <button onClick={() => requestCall(participant)}>call</button>
    </div>;
};

const connectWrapper = connect(
    ({ video:{participant} }) => ({ participant }),
    (dispatch) => ({ 
        requestCall: (participant) => dispatch({ type: 'requestVideoCall', participant }),
        onChange: (value) => dispatch({ type: 'videoParticipantUpdate', value })


}));


export default connectWrapper(VideoPanel);