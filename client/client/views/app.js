import { render } from 'react-dom';
import CameraJoystik from './camera-joystick';
import SocketStatus from './socket-status';

const App = (props) => {
  return <div>
    <SocketStatus />
    <CameraJoystik />
  </div>;
};

export default (App);