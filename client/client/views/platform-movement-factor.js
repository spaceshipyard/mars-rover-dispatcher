import { connect } from 'react-redux'
import { getEventTargetValueAsNum as eventToValue } from './utils'

const PlatformMovementFactor = ({ onChange, factor:{ x, y } }) => {
  return <div>
    <span>Platform Movement Factor: [ {x * 100}% | {y * 100}% ]</span>
    <div>
      <input type='range' min='-1' max='1' step='0.1' value={x} onChange={(e) => onChange({ y, x: eventToValue(e) })} />
      <input type='range' min='-1' max='1' step='0.1' value={y} onChange={(e) => onChange({ x, y: eventToValue(e) })} />
    </div>
  </div>
}

const connectToPlatform = connect(
  ({ platform: { factor } }) => ({ factor }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'platformMovementFactor', value: { x, y } }) }))

export default connectToPlatform(PlatformMovementFactor)
