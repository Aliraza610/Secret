import React from 'react';
import {BrowserRouter as Router , Routes ,Route } from "react-router-dom";
import './App.css';
import Home from './components/Pages/Home';
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Secret from './components/Pages/Secret';
import Submit from "./components/Pages/Submit";

function App() {
  return (
    <Router>
      <div className='App'>
          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/register' Component={Register}/>
            <Route path='/secret' Component={Secret}/>
            <Route path='/submit' Component={Submit}/>
          </Routes>
    </div>
    </Router>
  );
}

export default App;
