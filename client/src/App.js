
import{BrowserRouter,Routes,Route} from "react-router-dom"


import './App.css';
import Signup from './componts/Signup';
import Login from './componts/Login';
import Home from "./componts/Home";
import EditProfile from "./componts/EditProfile";

function App() {
  return (
  
  <BrowserRouter>
 <Routes>
  <Route path = "/" element = {<Login/>}></Route>
  <Route path = "/Signup" element = {<Signup/>}></Route>
  <Route path = "/Home" element = {<Home/>}></Route>
  <Route path = "/EditProfile" element = {<EditProfile/>}></Route>
  </Routes>
   </BrowserRouter>

  );
}

export default App;
