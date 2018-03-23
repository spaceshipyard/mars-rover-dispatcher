import CameraJoystik from './camera-joystick'
import PlatformJoystik from './platform-joystick'
import GamepadJoystik from './gamepad-joystick'
import NippleJoystik from './nipple-joystick'
import SocketStatus from './socket-status'
import VideoPanel from './video-panel'
import ProximityStatus from './proximity'
import Room from './room'
import '../style/main.css'

const App = (props) => {
  return <div>
    <SocketStatus />
    <CameraJoystik />
    <PlatformJoystik />
    <NippleJoystik />
    <ProximityStatus />
    <GamepadJoystik />
    <VideoPanel />
    <Room />
  </div>
}

export default (App)
