import { render } from 'react-dom';
import CameraJoystik from './camera-joystick';
import PlatformJoystik from './platform-joystick';
import PlatformStepper from './platform-stepper';
import SocketStatus from './socket-status';
import VideoPanel from './video-panel';
import Room from './room';

const App = (props) => {
  return <div>
    <SocketStatus />
    <CameraJoystik />
    <PlatformJoystik />
    <PlatformStepper />
    <VideoPanel/>
    <Room/>
  </div>;
};

export default (App);