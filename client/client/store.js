import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

const messageReducer = (state = '', action) => {
    switch (action.type) {
        case 'requestHello':
            return Math.random();
        default:
            return ''
    }
}

const store = createStore(combineReducers({
    message: messageReducer
}), {});

const StoreProvider = (props) => {
    return <Provider store={store}>{props.children}</Provider>
};

export default StoreProvider;