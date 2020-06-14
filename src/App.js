import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Controller from './components/Controller/Controller'

import BarSort from './components/BarSort/BarSort'

const App = () => [
  <div>
    <NavBar />
  </div>,
  <div className='outerContainer'>
    <Controller/>
  </div>
]

export default App;
