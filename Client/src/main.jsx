import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import store from '../src/redux/store'; 
import reportWebVitals from '../reportWebVitals.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
