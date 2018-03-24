import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import { addEvents as addSocketEvents } from './reducers/socket'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(
  sagaMiddleware
)))

sagaMiddleware.run(saga)

const StoreProvider = (props) => {
  return <Provider store={store}>{props.children}</Provider>
}

const dispatch = (type, params = {}) => store.dispatch({ type, params })

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default StoreProvider
