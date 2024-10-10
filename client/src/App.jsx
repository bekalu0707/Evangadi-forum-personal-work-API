import React, { createContext, useEffect, useState } from 'react'
import { Routes,Route, useNavigate} from "react-router-dom";


import Landing from './pages/Landing/Landing'
import HeaderFooter from './pages/HeaderFooter/HeaderFooter'
import Signuppage from './pages/Signuppage/Signuppage'
import Home from './pages/Home/Home'
import Questionsdetail from './pages/Questionsdetail/Questionsdetail';
import Askquestions from './pages/Askquestion/Askquestions'
import axios from './Api/axiosConfig';
import './App.css'

export const AppState = createContext();


function App() {
  const [user,setuser]=useState(null);
  const token=localStorage.getItem('token')
  const navigate =useNavigate()
  async function checkuser() {
    try {
      const {data} = await axios.get("/users/check",{
        headers:{
          authorization:"Bearer " + token,
        }
      });
      console.log(data.username)
      setuser(data.username);
    } catch (error) {
      console.log(error?.response?.data?.msg);
      navigate("/")
    }
  }
useEffect(()=>{
 
     checkuser();
    
},[])
  return (
  
    <AppState.Provider value={{user,setuser}}>
   
        <Routes>
            <Route path="/" element={<HeaderFooter />} >
                <Route path="/" element={<Landing/>} />
                <Route path="/signup" element={<Signuppage/>} />
                <Route path="/home" element={< Home/>} />
                <Route path="/askquestions" element={< Askquestions/>} />
                <Route path="/home/questionsdetail/:questionid" element={< Questionsdetail/>} />
            </Route>
          
        </Routes>
    </AppState.Provider>
    

  )
}

export default App
