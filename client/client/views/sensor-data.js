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

const I2cData = ({i2cData}) => {
  return <div>
   i2c Data:
    <ul>
      {i2cData.map(({name, value}) => <li><span>{name}:</span> <span>{value}</span></li>)}
    </ul>
  </div>
}

const SensorData = ({ proximity, i2cData }) => {
  return <ul>
    {proximity && <li><ProximityStatus proximity={proximity} /></li>}
    {i2cData && <li><I2cData i2cData={i2cData} /></li>}
  </ul>
}

const connectToPlatform = connect(
  ({ sensorData }) => sensorData)

export default connectToPlatform(SensorData)
