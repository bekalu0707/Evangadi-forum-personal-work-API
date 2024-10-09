import React from 'react'
import SignUp from '../../Components/SignUp/SignUp'
import About from '../../Components/About/About'
import classes from './Signuppage.module.css'
function Signuppage() {
  return (
   <div className={classes.signuppage__flex}>
   <SignUp/>
   <About/>
   </div>
  )
}

export default Signuppage