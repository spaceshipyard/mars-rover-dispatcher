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
  return <div className='wrapper'>
    <header className='card'>Spaceshipyard / Mars Rover Contol Panel</header>
    <div className='status card'>
      <div className='app-status'>
        <SocketStatus />
        <GamepadJoystik />
      </div>
      <br />
      <div className='sensors'>
        <ProximityStatus />
      </div>
    </div>
    <div className='control card'>
      <Room />
      <VideoPanel />
      <br />
      <CameraJoystik />
      <br />
      <PlatformJoystik />
      <br />
      <NippleJoystik />
    </div>
    <footer className='card'><a href='https://github.com/spaceshipyard/'>https://github.com/spaceshipyard/</a></footer>
  </div>
}

export default (App)
