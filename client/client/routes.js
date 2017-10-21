// react-dom (what we'll use here)
import { BrowserRouter } from 'react-router-dom'
import Home from './views/home';

export default () => {
  return <BrowserRouter>
    <Home />
  </BrowserRouter>;
}