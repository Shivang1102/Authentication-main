import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// import  { AuthContextProvider } from './Store/auth-context';
import { Provider } from 'react-redux';
import store from './Store/index'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider  store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  
);
