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
    {proximity.map(({name, distance}) => <ProximityStatusItem name={name} distance={distance} />)}
  </div>
}

const connectToPlatform = connect(
  ({ proximity }) => (proximity))

export default connectToPlatform(ProximityStatus)
