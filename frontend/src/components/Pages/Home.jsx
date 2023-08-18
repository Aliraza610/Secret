import React from 'react';
import Header from "../Header";
import Footer from "../Footer";
import "./style.css"

const Home = () => {
  return (
    <div className='home'>
        <Header/>
            <div className="centered">
                <i className="key">🔑</i>
                <h1 className='heading'>Secrets</h1>
                <p className="lead">Don't keep your secrets, share them anonymously!</p>
                <hr />
                <button className='register-btn'><a href="/Register">Register</a></button>
                <button className='login-btn'><a href="/Login">Login</a></button>
            </div>
        <Footer/>
    </div>
  )
}

export default Home;