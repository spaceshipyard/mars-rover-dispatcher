import CameraJoystik from './camera-joystick'
import PlatformJoystik from './platform-joystick'
import GamepadJoystik from './gamepad-joystick'
import NippleJoystik from './nipple-joystick'
import SocketStatus from './socket-status'
import SocketErrors from './socket-errors'
import SocketInfo from './socket-info'
import VideoPanel from './video-panel'
import SensorData from './sensor-data'
import Room from './room'
import '../style/main.css'
import GithubLogo from '../svg/github.svg'
import SpaceshipyardLogo from '../images/logo.jpeg'

const App = (props) => {
  return <div className='wrapper'>
    <header className='card'>
      <img
        height={100}
        className='icon-with-text'
        src={SpaceshipyardLogo} />
      Spaceshipyard / Mars Rover Contol Panel
    </header>
    <div className='status card'>
      <div className='app-status'>
        <SocketStatus />
        <GamepadJoystik />
      </div>
      <br />
      <div className='sensors'>
        <SensorData />
      </div>
      <br />
      <div className='messages'>
        <SocketErrors />
        <SocketInfo />
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
    <footer className='card'>
      <span className='icon-small icon-with-text'>
        <GithubLogo width={30} height={30} />
      </span>
      <a href='https://github.com/spaceshipyard/'>https://github.com/spaceshipyard/</a></footer>
  </div>
}

export default (App)
