import React from 'react'
import classes from './about.module.css'
import { Link } from 'react-router-dom'
function About() {
  return (
   <div className={classes.about__container}>
    <div className={classes.about__container__abouttxt}> <p>About</p></div>
   
    <div className={classes.about__container__parone}><p>Evangadi Network Q&A</p></div>
    <div className={classes.about__detail}>
    <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>
    <p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
    </div>
    <div className={classes.about__container__parlast}> <p><Link to="https://www.evangadi.com/explained/" target="_blank" rel="noopener noreferrer">
    How it Works</Link></p></div>
   </div>
  )
}

export default About