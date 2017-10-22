// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'
import App from './views/app';

export default () => {
  return <BrowserRouter>
    <App />
  </BrowserRouter>;
}