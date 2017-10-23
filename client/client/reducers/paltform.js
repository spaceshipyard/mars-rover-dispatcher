import _ from 'lodash';
import { combineReducers } from 'redux';

const offsetReducer = (state = { x: 0, y: 0 }, action) => {
    switch (action.type) {
        case 'platformMove':
            return state = action.value;
        default:
            return state
    }
}


export default combineReducers({ offset: offsetReducer })
