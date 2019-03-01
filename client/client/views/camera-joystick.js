import { connect } from 'react-redux'
import OffsetAdjuster from '../components/offset-adjuster'

const MIN = 0
const MAX = 180
const STEP = 5

const CameraJoystik = ({ onChange, offset }) => {
  return <div>
    <span>Camera Joystick</span>
    <OffsetAdjuster min={MIN} max={MAX} step={STEP} offset={offset} onChange={onChange} />
  </div>
}

const connectToCammera = connect(
  ({ camera: { offset } }) => ({ offset }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } }) }))

export default connectToCammera(CameraJoystik)
