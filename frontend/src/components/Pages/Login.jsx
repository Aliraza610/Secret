import React , {useState} from 'react'
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import "./style.css"

const Login = () => {
  const data = {email: "" , password:""};
  const [inputData , setInputData] = useState(data);
  const handleData = (e)=>{
    setInputData({...inputData , [e.target.name]:e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/login" , inputData)
    .then((response)=>{
      console.log(response)
      if(response.statusText === "OK"){
        alert('Login Successful');
        window.location="/secret";
      }
    }).catch((err)=>{
      console.log(err.response.status)
      if(err.response.status === 400){
        alert("Incorrect Password");
      }else if(err.response.status === 404){
        alert("User Not Found");
        window.location = "/register";
      }  
    });
  }


  return (
    <div className='login'>
      <Header/>
      <div className="centered">
        <h1 className="heading">Login</h1>
        <form action="/login" method='POST'>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' value={inputData.email} onChange={handleData} name='email'/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' value={inputData.password} onChange={handleData} name='password'/>
            </div>
            <button type='submit' onClick={handleSubmit} className='login-btn'>Login</button>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login;