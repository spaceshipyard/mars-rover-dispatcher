import _ from 'lodash';
import {combineReducers} from 'redux';

const inLobbyReducer = (state = true, {type}) => {
    switch (type) {
        case 'inLobby' :
            return true;
        case 'leaveLobby':
            return false;
        default:
            return state;
    }
};

export default combineReducers({inLobby: inLobbyReducer});