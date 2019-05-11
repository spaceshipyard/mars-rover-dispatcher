import { connect } from 'react-redux'

const MAX_ERRORS = 10

const getLastErrors = arr => arr.slice(arr.length > MAX_ERRORS ? arr.length - MAX_ERRORS : 0)

const SocketErrors = ({ socket }) => {
  const { connected, errors } = socket
  return (
    <div className='status-panel'>
      {connected ? '' : <div className='errorData'>{getLastErrors(errors)
        .map(error => <div>{JSON.stringify(error)}</div>)}
      </div>}
    </div>)
}

export default connect(
  ({ socket }) => ({ socket }),
  (dispatch) => ({}))(SocketErrors)
