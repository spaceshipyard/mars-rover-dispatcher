import { connect } from 'react-redux'
import StatusOn from '../svg/robot.svg'
import StatusOff from '../svg/robot-sleep.svg'

const SocketStatus = ({ socket }) => {
  const {connected, errors} = socket
  return (
  <div className='status-panel'>
    <div className='status-icon icon'>
      {connected ? <StatusOn /> : <StatusOff />}
    </div>  
  </div>)
}

export default connect(
  ({socket}) => ({socket}),
  (dispatch) => ({}))(SocketStatus)
