import _ from 'lodash';
import { combineReducers } from 'redux';

const connectedReducer = (state = false, action) => {
    const { type, params } = action;
    switch (type) {
        case 'connect':
            return true;
        case 'reconnect_error':
        case 'disconnect':
        case 'error':
            return false;
    }

    return state;
};

const errorsReducer = (state = [], action) => {
    const {type, params} = action;
    switch (type) {
        case 'reconnect_error':
        case 'error':
        console.log(params);
            return [...state, params];
    }

    return state;    
}


export const reducer = combineReducers({ connected: connectedReducer, errors:errorsReducer });


