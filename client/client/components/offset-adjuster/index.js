import { getEventTargetValueAsNum as eventToValue } from '../../views/utils'
import _ from 'lodash'

export default ({ min, max, step, offset, onChange }) => {
  const incByStepUntilMax = (val) => Math.min(val + step, max)
  const decByStepUntilMin = (val) => Math.max(val - step, min)

  const { x, y } = offset
  const onPartialInput = (newPartialOffset) => {
    const newOffset = { ...offset, ...newPartialOffset }
    !_.isEqual(offset, newOffset) && onChange(newOffset)
  }

  return <div>
    <div className='adjuster-controls'>
      <button onClick={() => onPartialInput({ x: decByStepUntilMin(x) })}>⬅</button>
      <input type='range' min={min} max={max} step={step} value={x}
        onChange={(e) => onPartialInput({ x: eventToValue(e) })} />
      <button onClick={() => onPartialInput({ x: incByStepUntilMax(x) })}>➡</button>
    </div>
    <div className='adjuster-controls'>
      <button onClick={() => onPartialInput({ y: decByStepUntilMin(y) })}>⬅</button>
      <input type='range' min={min} max={max} step={step} value={y}
        onChange={(e) => onPartialInput({ y: eventToValue(e) })} />
      <button onClick={() => onPartialInput({ y: incByStepUntilMax(y) })}>➡</button>
    </div>
  </div>
}
