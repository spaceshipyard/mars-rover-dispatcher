import {combineReducers} from 'redux';

const proximityReducer = (state = [], {type, params}) => {
  if (type === 'message' && params.cmd === 'sensor.data') {
    const {type, data} = params.params //fixme it should be destructed somewhere else
    if (type === 'proximity-data') {
      return state = data;
    }
  }

  return state;
};

export default combineReducers({proximity: proximityReducer})
