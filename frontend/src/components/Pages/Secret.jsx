import React , {useState, useEffect}from 'react';
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import "./style.css";

const Secret = () => {
  const [data , setData] = useState([]); 
  
  useEffect(()=>{
      axios.get("http://localhost:5000/secret")
      .then((response)=>{
            const dataArray = Object.values(response.data.foundUsers);
            setData(dataArray);
      }).catch((err)=> console.log(err));
  },[])

      console.warn(data);
  return (
    <div className="secret">
        <Header/>
        <div className="centered">
            <i className="key">🔑</i>
            <h1 className='heading'>All Secrets List!</h1>
            <p className="secret-text" >
              {data.map((item)=>(
                 <li key={item._id}>{item.secret}</li>
              ))}
            </p>
            <hr />
            <button className='register-btn'><a href="/">Logout</a></button>
            <button className='login-btn'><a href="/Submit">Submit Secret</a></button>
        </div>
        <Footer/>
    </div>
  )
}

export default Secret;