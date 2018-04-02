import { connect } from 'react-redux'
import StatusOn from '../svg/robot.svg'
import StatusOff from '../svg/robot-sleep.svg'

const MAX_ERRORS = 10;

const getLastErrors = arr => arr.slice(arr.length >MAX_ERRORS ? arr.length - MAX_ERRORS : 0 )

const SocketStatus = ({ socket }) => {
  const {connected, errors} = socket
  return (
  <div className='status-panel'>
    <div className='status-icon icon'>
      {connected ? <StatusOn /> : <StatusOff />}
    </div>
    {connected ? '' : <div className='socket-error'>{getLastErrors(errors)
          .map(error => <div>{JSON.stringify(error)}</div>)}
        </div>}    
  </div>)
}

export default connect(
  ({socket}) => ({socket}),
  (dispatch) => ({}))(SocketStatus)
