import { connect } from 'react-redux'
import StatusOn from '../svg/robot.svg'
import StatusOff from '../svg/robot-sleep.svg'


const SocketInfo = ({messages}) => {
  const {arr = []} = messages
  return (
  <div className='status-panel'>
    <div className='socket-info'>
      recieved data:
      <div className='readData'> 
      {messages.data.map(message => <div>[ {message.time} ] [ {message.cmd} ] [ {message.params.type} ] {JSON.stringify(message.params.data)}</div>)}
      </div>
      sent data:
      <div className='writeData'>
      {messages.commands.map(message => <div>[ {message.time} ] [ {message.cmd} ] {JSON.stringify(message.params)}</div>)}
      </div>
    </div>
  </div>)
}

export default connect(
  ({messages}) => ({messages}),
  (dispatch) => ({}))(SocketInfo)
