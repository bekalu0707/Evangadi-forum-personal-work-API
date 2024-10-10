import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Header.module.css";
import { AppState } from '../../App';

function Header() {
  const navigate =useNavigate()
  const {user,setuser}=useContext(AppState);
  function handleclick(e) {
        setuser(null);
        localStorage.removeItem("token");
        navigate("/")
       
  }
  return (
 <section className={classes.fixed}>
      <section className={classes.header__container}>
      <div className={classes.logo__container}>
      <Link to="https://www.evangadi.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
                alt="Evangadi logo"
              />
      </Link>
      </div>
      <div className={classes.menu__container}>
     
        <ul>
          <li><Link className={classes.menu__container__link} to="/home" >Home</Link></li>
          <li><Link className={classes.menu__container__link} to="https://www.evangadi.com/explained/" target="_blank" rel="noopener noreferrer">
          How it Works</Link></li>
          <li><Link  onClick={handleclick} className={classes.menu__container__btn} to="/" >
          { user?(<span>LOGOUT</span>):(<span>SIGNIN</span>)}
           </Link></li>
        </ul>
      </div>
    </section>
 </section>
  )
}

export default Header