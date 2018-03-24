import { connect } from 'react-redux'

const PlatformJoystik = ({ onChange, x, y }) => {
  const getValue = (event) => event.target.value
  return <div>
    <span>Platform Joystick</span>
    <div>
      <input type='range' min='-2' max='2' step='0.1' value={x} onChange={(e) => onChange({ y, x: getValue(e) })} />
      <input type='range' min='-2' max='2' step='0.1' value={y} onChange={(e) => onChange({ x, y: getValue(e) })} />
    </div>
  </div>
}

const connectToPlatform = connect(
  ({ platform: { offset } }) => ({ x: offset.x, y: offset.y }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'platformMove', value: { x, y } }) }))

export default connectToPlatform(PlatformJoystik)
