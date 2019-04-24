import { connect } from 'react-redux'

const ProximityStatusItem = ({ name, distance: proximity }) => {
  const status = proximity < 100 ? (proximity > 50 ? 'warning' : 'danger') : 'good'
  return <div>
    <span>{name}</span>
    <span className={`proximity proximity-${status}`}>{Math.round(proximity)} см</span>
  </div>
}

const ProximityStatus = ({proximity}) => {
  return <div>
    Proximity Data:
    {proximity.map(({name, distance}) => <ProximityStatusItem name={name} distance={distance} />)}
  </div>
}

const MotorEncoder = ({motorEncoder}) => {
  return <div>
    Motor Encoder:
    <ul>
      {motorEncoder.map(({name, value}) => <li><span>{name}:</span> <span>{value}</span></li>)}
    </ul>
  </div>
}

const SensorData = ({ proximity, motorEncoder }) => {
  return <ul>
    {proximity && <li><ProximityStatus proximity={proximity} /></li>}
    {motorEncoder && <li><MotorEncoder motorEncoder={motorEncoder} /></li>}
  </ul>
}

const connectToPlatform = connect(
  ({ sensorData }) => sensorData)

export default connectToPlatform(SensorData)
