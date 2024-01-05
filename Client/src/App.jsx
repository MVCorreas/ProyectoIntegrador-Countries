//?COMPONENTE RAIZ DE LA APP

import React from 'react'
import './App.css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Landing from '../src/Views/Landing/Landing';
import CountryActivities from './components/Activities/CountryActivities';
import NavBar from './components/NavBar/NavBar';
import Detail from './Views/Detail/Detail';
import Home from './Views/Home/Home';
import CreateActivity from './components/CreateActivity/CreateActivity';
import BGImage from './assets/GloboLibros.jpeg';
import Favorites from './components/Favorites/Favorites';

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    navigate('/'); 
    // window.location.reload(); //fx que recarga la pagina y borra los cambios que hayan hecho, puede ser una operacion pesada, y puedo borrar cambios no guardados
  };
  
  if (location.pathname !== '/') {
    document.body.style.backgroundImage = `url(${BGImage})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.height = '100vh';
    document.body.style.boxSizing = 'border-box';
    document.body.style.overflowY = 'scroll';
  } 
 



  return (
    <div >
          {location.pathname !== "/" &&  <NavBar  onLogout={logout}/>}
        <Routes >
          <Route path='/' element={<Landing/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/activities' element={<CreateActivity/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/countries/:id/activities' element={<CountryActivities/>}/>
        </Routes>
    </div>
  )
}

export default App