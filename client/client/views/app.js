import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let store = createStore((state = [], action) => {

});


const App = (props) => {
  return (
    <Provider store={store}>
      <h1>Hello App!</h1>
    </Provider>
  );
};

export default App;