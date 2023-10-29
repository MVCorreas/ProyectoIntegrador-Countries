import React from 'react';
import { Provider } from 'react-redux';//componente de redux que conecta redux con react
import ReactDOM from 'react-dom/client'; //biblioteca de react para interactuar con el DOM
import { BrowserRouter } from 'react-router-dom';//componente que permite la navegacion entre paginas, o enrutamiento
import App from './App.jsx';
import './index.css';
import store from '../src/redux/store'; //componente de redux que administra el estado de la app
import reportWebVitals from '../reportWebVitals.js';// fx que informa sobre métricas web

ReactDOM.createRoot(document.getElementById('root')).render( //renderiza la app en un HTML de id root
  <Provider store={store}> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();


//PROVIDERE STORE --> Permite que los componentes accedan al estado global de la app
//DOM --> DOM is not a JS language, but an API (Applicatiton Programming Interface) to create websites. It is a tree-like representation of a web page. It employs JS, HTML, CSS
//App --> root component of the application