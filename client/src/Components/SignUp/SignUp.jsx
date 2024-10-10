import React from 'react'
import classes from './signup.module.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import axios from '../../../src/Api/axiosConfig'
import { useNavigate } from 'react-router-dom'

function SignUp() {
const navigate =useNavigate()
const emailDom = useRef(null);
const firstnameDom= useRef(null);
const lastnameDom= useRef(null);
const usernameDom=useRef(null)
const passwordDom= useRef(null);
const messageDom=useRef(null);
async function handlesubmit(e) {
    e.preventDefault();
    const emailvalue = emailDom.current.value;
    const firstnamevalue = firstnameDom.current.value;
    const lastnamevalue = lastnameDom.current.value;
    const usernamevalue = usernameDom.current.value;
    const passwordvalue = passwordDom.current.value;
    
   const userinfo= {
    email:emailvalue,
    firstname:firstnamevalue,
    lastname:lastnamevalue,
    username:usernamevalue,
    password:passwordvalue
   }
    try {
      const response=await axios.post("/users/register",userinfo);
      //  messageDom.current.style.color="green"
      // messageDom.current.innerText=`${response.data.msg} Please sign In to Continue`
      navigate("/")
   
    } catch (error) {
      // alert("someting wrong")
      messageDom.current.style.color="red"
       messageDom.current.innerText=error?.response?.data?.msg
      console.log(error?.response?.data?.msg);
    }
  
}
  return (
    <section className={classes.sign__container}>
    <div className={classes.toptext__container}>
    <div  className={classes.toptext__container__parone}><p >Join the Network</p></div>
    <div  className={classes.toptext__container__partwo}> <p>Already have an account?<Link to="/"> Sign In</Link></p></div>
    </div>
    <div className={classes.form__container}>
     <form action="#"   onSubmit={handlesubmit}   className={classes.signup__form}>
        
          <p ref={messageDom}></p>
         <input ref={emailDom}  type="email" name="email" id="email" required placeholder='Email adress' />
         <div className={classes.signup__flex}>
         <input ref={firstnameDom} type="text" name="firstname" id="firstname" required placeholder='First Name' />
         <input  ref={lastnameDom}    type="text" name="lastname" id="lastname" required placeholder='Last Name' />
         </div>
         <input  ref={usernameDom}     type="text" name="username" id="username" required placeholder='username' />
         <input  ref={passwordDom}    type="password" name="password" id="password" required placeholder='password'/>
        
         <div  className={classes.toptext__container__partwo}>
         <p style={{fontSize:"14px"}}>I agree to the <a href="#">privacy policy</a> and <a href="#">terms of service.</a></p>
         </div><button type="submit">Agree and Join</button>
       
     </form>
     <div  className={classes.toptext__container__partwo}>
     <p><Link to="/">Already have an account?</Link></p>
     </div>
    </div>
    </section>
   )
}

export default SignUp