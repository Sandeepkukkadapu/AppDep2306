import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";

function Login() {

   
  
    let emailInputRef=  useRef();
    let PasswordInutRef = useRef();
    let navigate = useNavigate();

    useEffect(()=>{
      axios.defaults.baseURL = '';
      axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
      emailInputRef.current.value = localStorage.getItem("email");
   PasswordInutRef.current.value = localStorage.getItem("password");
  //  validateCredentials();
    // validateToken();
    },[])
  

    let validateCredentials = async()=>{

    

      let dataToSend = new FormData();
    
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",PasswordInutRef.current.value);


      let reqOptions = {
        method:"POST",
        body:dataToSend,
      };

      let JSONData = await fetch("/validateLogin",reqOptions);

      let JSOData =  await JSONData.json();

      

      if(JSOData.status === "success"){
        console.log(JSOData);
        // localStorage.setItem("email",emailInputRef.current.value);
        // localStorage.setItem("password",PasswordInutRef.current.value);
        localStorage.setItem("token",JSOData.token);
        navigate("/home",{state:JSOData})
      } else{
        alert(JSOData.msg)
      }

     


    };

    let validateCredentialsThruAxios = async()=>{

    

      let dataToSend = new FormData();
    
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",PasswordInutRef.current.value);

     let responce = await axios.post("/validateLogin",dataToSend)
   
     console.log(responce);
      

      if(responce.data.status === "success"){
        console.log(responce.data);
        // localStorage.setItem("email",emailInputRef.current.value);
        // localStorage.setItem("password",PasswordInutRef.current.value);
        localStorage.setItem("token",responce.data.token);
        navigate("/home",{state:responce.data})
      } else{
        alert(responce.data.msg)
      }

     };

    let validateToken =async()=>{
      let dataToSend = new FormData();
      dataToSend.append("token",localStorage.getItem("token"))

      let reqOptions ={
        method:"POST",
        body:dataToSend
      }

      let JSONData = await fetch("/validateToken",reqOptions);

      let JSOData =await JSONData.json();

      console.log(JSOData);

    }

  return (
    <div className='App'>
   <form>
    <div><h1>login</h1></div>

    <div>
        <label>Email:-</label>
        <input ref={emailInputRef}></input>
    </div>
    <div>
        <label>Password:-</label>
        <input ref={PasswordInutRef}></input>
    </div>
   
  

    <div>
       <button type='button' onClick={()=>{
    //  validateCredentials();
    validateCredentialsThruAxios();
       }}>login</button>
    </div>

   </form>
   <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login