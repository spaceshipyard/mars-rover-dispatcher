import { connect } from 'react-redux'
import StatusOn from '../svg/robot.svg'
import StatusOff from '../svg/robot-sleep.svg'

const MAX_ERRORS = 10;

const SocketStatus = ({ socket }) => {
  const {connected, errors} = socket
  return <div className='status-panel'>
    <div className='status-icon icon'>
      {connected ? <StatusOn /> : <StatusOff />}
    </div>
    {connected ? '' : <div className='socket-error'>{errors
      .slice(errors.length >MAX_ERRORS ? errors.length - MAX_ERRORS : 0 )
      .map(error => <div>{JSON.stringify(error)}</div>)}</div>}    
  </div>
}

export default connect(
  ({socket}) => ({socket}),
  (dispatch) => ({}))(SocketStatus)
