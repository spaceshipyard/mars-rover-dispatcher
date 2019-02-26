import { connect } from 'react-redux'

const data = { x: 90, y: 90, min: 0, max: 180 }

const CameraJoystik = ({ onChange, x, y }) => {
  const getValue = (event) => event.target.value
  return <div>
    <span>Camera Joystick</span>
    <div>
      <div className='camera-controls'>
        <button onClick={() => {
          if (data.x > data.min) {
            data.x -= 5
            onChange({ x: data.x })
          }
        }}>⬅</button>
        <input type='range' min={data.min} max={data.max} step='5' value={x} onChange={(e) => onChange({ y, x: getValue(e) })} />
        <button onClick={() => {
          if (data.x < data.max) {
            data.x += 5
            onChange({ x: data.x })
          }
        }}>➡</button>
      </div>
      <div className='camera-controls'>
        <button onClick={() => {
          if (data.y > data.min) {
            data.y -= 5
            onChange({ y: data.y })
          }
        }}>⬅</button>
        <input type='range' min={data.min} max={data.max} step='5' value={y} onChange={(e) => onChange({ x, y: getValue(e) })} />
        <button onClick={() => {
          if (data.y < data.max) {
            data.y += 5
            onChange({ y: data.y })
          }
        }}>➡</button>
      </div>
    </div>
  </div>
}

const connectToCammera = connect(
  ({ camera }) => ({ x: camera.x, y: camera.y }),
  (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } }) }))

export default connectToCammera(CameraJoystik)
