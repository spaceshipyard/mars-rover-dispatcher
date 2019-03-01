import { connect } from 'react-redux'
import OffsetAdjuster from '../components/offset-adjuster'

const PlatformMovementFactor = ({ onChange, factor }) => {
  const { x, y } = factor
  const formatFactor = v => `${(v * 100).toFixed(1)}%`
  return <div>
    <span>Platform Movement</span>
    <div>
      <span>[ {formatFactor(x)} | {formatFactor(y)} ]</span>
      <OffsetAdjuster min={-1} max={1} step={0.001} offset={factor} onChange={onChange} />
    </div>
  </div>
}

const connectToPlatform = connect(
  ({ platform: { factor } }) => ({ factor }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'platformMovementFactor', value: { x, y } }) }))

export default connectToPlatform(PlatformMovementFactor)
