import { render } from 'react-dom';
import { connect } from 'react-redux';

const CameraJoystik = ({ requestHello, message }) => {
  return <div><span> {message}</span> <button onClick={requestHello}>request</button></div>;
};

const helloConnect = connect(
  ({ message }) => ({ message }),
  (dispatch) => ({ requestHello: () => dispatch({ type: 'requestHello' }) }));

const App = (props) => {
  return <CameraJoystik {...props} />;
};

export default helloConnect(App);