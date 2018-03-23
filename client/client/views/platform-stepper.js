import { connect } from 'react-redux'

const PlatformStepper = ({ onChange }) => {
  return <div>
    <span>Platform Joystick</span>
    <div>
      <input type='button' value='<' onClick={(e) => onChange({ x: -10 })} />
      <input type='button' value='>' onClick={(e) => onChange({ x: 10 })} />
    </div>
  </div>
}

const connectToPlatform = connect(
  ({ platform: { offset } }) => ({ x: offset.x, y: offset.y }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'platformStepperMove', value: { x } }) }))

export default connectToPlatform(PlatformStepper)
