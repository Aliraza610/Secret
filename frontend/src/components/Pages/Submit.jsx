import React ,{useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import "./style.css";

const Submit = () => {
  const data = {secret: ""};
  const [inputData , setInputData] = useState(data);
  const handleData = (e)=>{
    setInputData({...inputData , [e.target.name]:e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/submit" , inputData)
    .then((response)=>{
      console.log(response);
      if(response.statusText === "OK"){
        window.location="/secret";
      }else{
        alert("Something went wrong please login Again")
      }
    }).catch((err)=>{
      console.log(err);
    });
  }



  return (
    <div className='submit'>
        <Header/>
        <div className="centered">
            <i className="key">🔑</i>
            <h1 className='heading'>Secrets</h1>
            <p className="secret-text">Don't keep your secrets, share them anonymously!</p>

            <form action="/submit" method='POST'>
                <div className="form-group">
                    <input type="text" className='form-control' value={inputData.secret} onChange={handleData} placeholder="what's your secret?" name='secret'/>
                    <button type='submit' onClick={handleSubmit} className='submit-btn'>Submit</button>
                </div>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default Submit;