import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

const cameraReducer = (state = { x:0, y:0 }, action) => {
    switch (action.type) {
        case 'camUpdate':
            return state = action.value;
        default:
            return state
    }
}

const store = createStore(combineReducers({
    camera: cameraReducer
}), {});

const StoreProvider = (props) => {
    return <Provider store={store}>{props.children}</Provider>
};

store.dispatch({ type: 'INIT' });


export default StoreProvider;