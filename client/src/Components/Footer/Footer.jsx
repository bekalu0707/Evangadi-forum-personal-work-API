import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faInstagram, faYoutube  } from '@fortawesome/free-brands-svg-icons';
import classes from "./footer.module.css";
function Footer() {
  return (
   <section className={classes.footerouter__container}>
    <section className={classes.footer__container}>
    <div className={classes.footer__left}>
          <div><a href="/"><img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png" alt="footer logo" /></a> </div>
                {/* social media */}
              <div className="circle-icon">
                  <div className={classes.footer__icons}>
                        <a href="#" target="_blank" >
                          <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="#" target="_blank" >
                          <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                        <a href="#" target="_blank" >
                          <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                  </div>
          </div>
    </div>
     <div className={classes.footer__middle}>
          <div className={classes.footer__title}>  Useful Link </div>
          <div> <a href="#">How it Works</a> </div>
          <div> <a href="#">Terms of Service</a> </div>
          <div> <a href="#">Privacy policy</a> </div>
    </div>

    <div className={classes.footer__right}>
      <div className={classes.footer__title}>  Contact Info </div>
      <div> support@evangadi.com </div>
      <div>+1-202-386-2702 </div>
    </div>
   
   </section>
   </section>
  )
}

export default Footer