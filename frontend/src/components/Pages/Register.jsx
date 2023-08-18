import React ,{useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

const Register = () => {
  const data = {email: "" , password:""};
  const [inputData , setInputData] = useState(data);
  const handleData = (e)=>{
    setInputData({...inputData , [e.target.name]:e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/register" , inputData)
    .then((response)=>{
      console.log(response)
      if(response.statusText === "OK"){
        alert('Registration Successful');
        window.location="/login";
      }
    }).catch((err)=>{
      alert('This Email Already exists!')
      console.log(err)
    });
  }


  return (
    <div className='register'>
        <Header/>
        <div className="centered">
        <h1 className="heading">Register</h1>
        <form action="/register" method='POST'>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' value={inputData.email} onChange={handleData} name='email'/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' value={inputData.password} onChange={handleData} name='password'/>
            </div>
            <button type='submit' onClick={handleSubmit} className='login-btn'>Register</button>
        </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Register;