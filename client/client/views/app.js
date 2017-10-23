import { render } from 'react-dom';
import CameraJoystik from './camera-joystick';
import PlatformJoystik from './platform-joystick';
import SocketStatus from './socket-status';
import VideoPanel from './video-panel';

const App = (props) => {
  return <div>
    <SocketStatus />
    <CameraJoystik />
    <PlatformJoystik />
    <VideoPanel/>
  </div>;
};

export default (App);