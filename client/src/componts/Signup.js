import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let emailInputRef=  useRef();
    let PasswordInutRef = useRef();
    let profilePicInputRef = useRef();
    let [profilePic,setProfilePic] = useState("./images/profilepic.jpeg");
    



  

    let sendSignupDataToServerFormData = async()=>{

    

      let dataToSend = new FormData();
      dataToSend.append("fn",firstNameInputRef.current.value);
      dataToSend.append("ln",lastNameInputRef.current.value);
      dataToSend.append("email",emailInputRef.current.value);
      dataToSend.append("password",PasswordInutRef.current.value);

      
      
      for(let i=0;i<profilePicInputRef.current.files.length;i++)
      {
        dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
      }

      let reqOptions = {
        method:"POST",
        body:dataToSend,
      };

      let JSONData = await fetch("/signup",reqOptions);

      let JSOData =  await JSONData.json();

      console.log(JSOData);


    };


  return (
    <div className='App'>
   <form>
    <div><h1>Signup</h1></div>

    <div>
        <label>Profile Pic:-</label>
        <input ref={profilePicInputRef} type='file'
        onChange={()=>{
         let selectedFileURL = URL.createObjectURL
         (profilePicInputRef.current.files[0])
         setProfilePic(selectedFileURL);

        }}
        ></input>
    </div>
    <div>
      <img className='profilepicpreview' src ={profilePic}></img>
    </div>
    <div>
        <label>First Name:-</label>
        <input ref={firstNameInputRef}></input>
    </div>
    <div>
        <label>Last Name:-</label>
        <input ref={lastNameInputRef}></input>
    </div>
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
     sendSignupDataToServerFormData();
       }}>Signup(Form Data)</button>
    </div>

   </form>
   <Link to = "/">Login</Link>
    </div>
  )
}

export default Signup