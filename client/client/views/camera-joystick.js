import { connect } from 'react-redux'
import _ from 'lodash'

const MIN = 0
const MAX = 180
const STEP = 5

const incByStepUtilMax = (val) => Math.min(val + STEP, MAX)
const decByStepUntilMin = (val) => Math.max(val - STEP, MIN)
const eventToValue = (event) => +event.target.value

const CameraJoystik = ({ onChange, currOffset }) => {
  const { x, y } = currOffset
  const onPartialInput = (newPartialOffset) => {
    const newOffset = { ...currOffset, ...newPartialOffset }
    !_.isEqual(currOffset, newOffset) && onChange(newOffset)
  }

  return <div>
    <span>Camera Joystick</span>
    <div>
      <div className='camera-controls'>
        <button onClick={() => onPartialInput({ x: decByStepUntilMin(x) })}>⬅</button>
        <input type='range' min={MIN} max={MAX} step={STEP} value={x}
          onChange={(e) => onPartialInput({ x: eventToValue(e) })} />
        <button onClick={() => onPartialInput({ x: incByStepUtilMax(x) })}>➡</button>
      </div>
      <div className='camera-controls'>
        <button onClick={() => onPartialInput({ y: decByStepUntilMin(y) })}>⬅</button>
        <input type='range' min={MIN} max={MAX} step={STEP} value={y}
          onChange={(e) => onPartialInput({ y: eventToValue(e) })} />
        <button onClick={() => onPartialInput({ y: incByStepUtilMax(y) })}>➡</button>
      </div>
    </div>
  </div>
}

const connectToCammera = connect(
  ({ camera: { offset: { x, y } } }) => ({ currOffset: { x, y } }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } }) }))

export default connectToCammera(CameraJoystik)
