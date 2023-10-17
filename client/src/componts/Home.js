import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';


function Home() {
    let loc = useLocation();
    let navigate = useNavigate();
    console.log(loc);

    let deleteAccount  = async()=>{
  
     let dataToSend = new FormData();
     dataToSend.append("email",loc.state.data.email);

      let reqOptions = {
        method:"DELETE",
        body:dataToSend
      };

     let JSONData = await fetch("http://localhost:2345/deleteUser",reqOptions);

     let JSOData = await JSONData.json();
     if(JSOData.status == "success"){
      localStorage.clear();
      alert(JSOData.msg)
      navigate("/")
     }else{
      alert("some Technical Error,unable to delete");
     }

    }
  return (
    <div>

    <Link to = "/">LogOut</Link>

        <button 
        onClick={()=>{
           navigate("/EditProfile",{state:loc.state.data });
        }}
        > Edit Profile</button>
        <br></br>
        <br></br>
        <button onClick={()=>{
          deleteAccount();
        }}>Delete Account</button>

        <h1>{loc.state.data.firstName}{loc.state.data.lastName} </h1>
        <img src={`http://localhost:2345/${loc.state.data.profilePic}`}></img>
        
        

    </div>
  )
}

export default Home