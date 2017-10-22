import { connect } from 'react-redux';


const CameraJoystik = ({ onChange, x, y }) => {
    const getValue = (event) => event.target.value
    return <div>
        <span>Camra Joystick</span>
        <div>
            <input type="range" min="0" max="360" step="1" value={x} onChange={(e) => onChange({ y, x: getValue(e) })} />
            <input type="range" min="0" max="360" step="1" value={y} onChange={(e) => onChange({ x, y: getValue(e) })} />
        </div>
    </div>;
};

const connectToCammera = connect(
    ({ camera }) => ({ x: camera.x, y: camera.y }),
    (dispatch) => ({ onChange: ({ x, y }) => dispatch({ type: 'camUpdate', value: { x, y } }) }));


export default connectToCammera(CameraJoystik);