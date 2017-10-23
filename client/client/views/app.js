import { render } from 'react-dom';
import CameraJoystik from './camera-joystick';
import PlatformJoystik from './platform-joystick';
import SocketStatus from './socket-status';

const App = (props) => {
  return <div>
    <SocketStatus />
    <CameraJoystik />
    <PlatformJoystik />
  </div>;
};

export default (App);