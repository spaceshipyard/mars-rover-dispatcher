import { connect } from 'react-redux'
import { PureComponent } from 'react'
import classnames from 'classnames'

let autoScrollInterval
const SCROLL_INTERVAL = 300
const DEFAULT_SCROLL_ENABLED = true

class SocketInfo extends PureComponent {
  constructor () {
    super()
    this.state = {
      autoscrollEnabled: DEFAULT_SCROLL_ENABLED
    }
  }
  componentDidMount () {
    const { autoscrollEnabled } = this.state

    if (autoscrollEnabled) {
      autoScrollInterval = setInterval(this.autoScroll, SCROLL_INTERVAL)
    }
  }

  toggleAutoscroll () {
    const { autoscrollEnabled } = this.state
    this.setState({ autoscrollEnabled: !autoscrollEnabled })
    if (autoscrollEnabled && autoScrollInterval) {
      clearInterval(autoScrollInterval)
    } else {
      autoScrollInterval = setInterval(this.autoScroll, SCROLL_INTERVAL)
    }
  }

  autoScroll () {
    const readData = document.querySelector('.readData')
    const writeData = document.querySelector('.writeData')
    readData.scroll(0, readData.clientHeight)
    writeData.scroll(0, writeData.clientHeight)
  }

  render () {
    const { autoscrollEnabled } = this.state
    const { messages } = this.props

    return (<div className='status-panel'>

      <div className='socket-info'>
        <div>
          <label><input type='checkbox' onClick={this.toggleAutoscroll} checked={autoscrollEnabled} /> Auto-scroll</label>
        </div>
    Recieved data:
        <div className='readData'>
          {messages.data.map(message => <div>[ {message.time} ] [ {message.cmd} ] [ {message.params.type} ] {JSON.stringify(message.params)}</div>)}
        </div>
    Sent data:
        <div className='writeData'>
          {messages.commands.map(message => {
            return <div key={message.localId + '-' + message.boardcasted} className={classnames({
              'messageItem': !message.boardcasted,
              'messageItem-boardcasted': message.boardcasted })}>
                [ {message.time} ] [ {message.cmd} ] {JSON.stringify(message.params)} </div>
          })}
        </div>
      </div>
    </div>)
  }
}

export default connect(
  ({ messages }) => ({ messages }),
  (dispatch) => ({}))(SocketInfo)
