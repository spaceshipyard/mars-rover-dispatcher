import { connect } from 'react-redux'

const VideoPanel = ({ participant, requestCall, onChange }) => {
  return <div>
    <input type='text' placeholder='Call by skype' value={participant} onChange={e => onChange(e.target.value)} />
    <button onClick={() => requestCall(participant)}>call</button>
  </div>
}

const connectWrapper = connect(
  ({ video: {participant} }) => ({ participant }),
  (dispatch) => ({
    requestCall: (participant) => dispatch({ type: 'requestVideoCall', participant }),
    onChange: (value) => dispatch({ type: 'videoParticipantUpdate', value })
  }))

export default connectWrapper(VideoPanel)
