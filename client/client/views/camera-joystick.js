import { connect } from 'react-redux'
import _ from 'lodash'
import { getEventTargetValueAsNum as eventToValue } from './utils'

const MIN = 0
const MAX = 180
const STEP = 5

const incByStepUntilMax = (val) => Math.min(val + STEP, MAX)
const decByStepUntilMin = (val) => Math.max(val - STEP, MIN)

const CameraJoystik = ({ onChange, offset }) => {
  const { x, y } = offset
  const onPartialInput = (newPartialOffset) => {
    const newOffset = { ...offset, ...newPartialOffset }
    !_.isEqual(offset, newOffset) && onChange(newOffset)
  }

  return <div>
    <span>Camera Joystick</span>
    <div>
      <div className='camera-controls'>
        <button onClick={() => onPartialInput({ x: decByStepUntilMin(x) })}>⬅</button>
        <input type='range' min={MIN} max={MAX} step={STEP} value={x}
          onChange={(e) => onPartialInput({ x: eventToValue(e) })} />
        <button onClick={() => onPartialInput({ x: incByStepUntilMax(x) })}>➡</button>
      </div>
      <div className='camera-controls'>
        <button onClick={() => onPartialInput({ y: decByStepUntilMin(y) })}>⬅</button>
        <input type='range' min={MIN} max={MAX} step={STEP} value={y}
          onChange={(e) => onPartialInput({ y: eventToValue(e) })} />
        <button onClick={() => onPartialInput({ y: incByStepUntilMax(y) })}>➡</button>
      </div>
    </div>
  </div>
}

const connectToCammera = connect(
  ({ camera: { offset } }) => ({ offset }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } }) }))

export default connectToCammera(CameraJoystik)
