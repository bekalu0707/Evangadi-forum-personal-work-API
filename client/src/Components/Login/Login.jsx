// Assigned to EDO
import React, { useContext, useRef } from 'react'
import classes from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../src/Api/axiosConfig'
import { AppState } from '../../App';
function Login() {
  const navigate =useNavigate()
const emailDom = useRef(null);
const passwordDom= useRef(null);
const messageDom=useRef(null);
const {user,setuser,logedin,setlogedin}=useContext(AppState);
async function handlesubmit(e) {
    e.preventDefault();
    const emailvalue = emailDom.current.value;
    const passwordvalue = passwordDom.current.value;
    
   const logininfo= {
    email:emailvalue,                                             //frontend request email and password
    password:passwordvalue
   }
    try {
      const response=await axios.post("/users/login",logininfo);    //backend response token and username
      localStorage.setItem("token",response?.data?.token);
       setuser(response.data.username);
      navigate("/home")
   
    } catch (error) {
      messageDom.current.style.color="red"
       messageDom.current.innerText=error?.response?.data?.msg
      console.log(error?.response?.data?.msg);
    }
  
}
  return (
   <section className={classes.login__container}>
   <div className={classes.toptext__container}>
   <div  className={classes.toptext__container__parone}><p >Login to your account</p></div>
   <div  className={classes.toptext__container__partwo}> <p>Don’t have an account?<Link to="/signup"> Create a new account</Link></p></div>
   </div>
   <div className={classes.form__container}>
    <form action="#" onSubmit={handlesubmit}   className={classes.signin__form}>
       
       <p ref={messageDom}></p>
        <input ref={emailDom} type="email" name="email" id="email" required placeholder='Email adress' />
        <input ref={passwordDom} type="password" name="password" id="password" required placeholder='password'/>
       
        <button type="submit">Login</button>
      
    </form>
   </div>
   </section>
  )
}

export default Login