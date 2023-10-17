import React, { useEffect, useRef, useState } from 'react'
import {  Link ,useLocation } from 'react-router-dom';

function EditProfile() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let PasswordInutRef = useRef();
    let profilePicInputRef = useRef();
    let [profilePic,setProfilePic] = useState("./images/profilepic.jpeg");
    let loc = useLocation();
    console.log(loc);
    console.log("inside edit profile")
    


    useEffect(()=>{
    
        firstNameInputRef.current.value = loc.state.firstName;
        lastNameInputRef.current.value = loc.state.lastName;
       PasswordInutRef.current.value = loc.state.password;
    

    },[]);
    

  

    let sendUpdatedDataToServer = async()=>{
     let dataToSend = new FormData();
      dataToSend.append("fn",firstNameInputRef.current.value);
      dataToSend.append("ln",lastNameInputRef.current.value);
      dataToSend.append("email",loc.state.email);
      dataToSend.append("password",PasswordInutRef.current.value);
            
      for(let i=0;i<profilePicInputRef.current.files.length;i++){
        dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
      }
let reqOptions = {
        method:"PATCH",
        body:dataToSend,
      };

let JSONData = await fetch ("http://localhost:2345/updateDetails",reqOptions);

let JSOData = await JSONData.json();

alert(JSOData.msg);
console.log(JSOData);
    };
  return (
    <div className='App'>
   <form>
    <div><h1>EditProfile</h1></div>

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
        <label>Password:-</label>
        <input ref={PasswordInutRef}></input>
    </div>
   
    
    

    <div>
       <button type='button' onClick={()=>{
        sendUpdatedDataToServer();
       }}>Update</button>
    </div>

   </form>
   <Link to = "/">Login</Link>
    </div>
  )
}

export default EditProfile