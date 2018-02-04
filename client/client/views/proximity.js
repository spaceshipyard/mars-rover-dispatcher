import { connect } from 'react-redux';

const ProximityStatus = ({ proximity }) => {
    const status = proximity < 100 ? (proximity > 50 ? 'warning' : 'danger') : 'good';
    return <div>
        <span className={`proximity proximity-${status}`}>{Math.round(proximity)} см</span>
        <span className={`proximity-line proximity-${status}`} style={{width: proximity > 300 ? 300 : proximity}} />
    </div>;
};

const connectToPlatform = connect(
    ({ proximity }) => ( proximity ));

export default connectToPlatform(ProximityStatus);