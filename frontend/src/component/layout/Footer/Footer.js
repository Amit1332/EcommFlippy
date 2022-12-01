import React from 'react'
import './footer.css'
import appStore from '../../../images/appStore.png'
import playStore from '../../../images/paystoreig.png'


const Footer = () => {
  return (
  <footer id="footer">
   <div className="leftFooter">
    <h4>Download Our App</h4>
    <p>Download App for Android And Ios mobile Phone</p>
    <img id="appstore" src={appStore} alt="App Store" />
    <img id="appstore" src={playStore} alt="play Store" />
   </div>
   <div className="midFooter">
    <h1>Ecommerce</h1>
    <p>High Quality is Our Priority</p>
    <p>Copyrights 2021 &copy; MeAmitSingh</p>
   </div>
   <div className="rightFooter">
    <h4>Follow Us</h4>
    <a href="">Instagram</a>
    <a href="">Youtube</a>
    <a href="">Facebook</a>
   </div>


  </footer>
 


  )
}

export default Footer