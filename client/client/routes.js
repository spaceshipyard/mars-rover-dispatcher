// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'
import App from './views/app';
import StoreProvider from './store';

export default () => {
  return <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>;
}