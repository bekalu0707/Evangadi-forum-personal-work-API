import React from 'react'
import Login from '../../Components/Login/Login'

import classes from './landing.module.css'
import About from '../../Components/About/About'
function Landing() {
  return (
       <div className={classes.Landing__flex}>
              <Login/>
              <About/>
     </div> 
  )
}

export default Landing
