import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from '../../../images/logo.png'
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";


const Header = () => {
  return   <ReactNavbar 
  burgerColor="#1d1003"
  burgerColorHover ="crimson"
  navColor1 ="#d4f6fb"
  logo ={logo}
  logoWidth ="200px"
  logoHoverSize ="15px"
  logoHoverColor ="#ee30ed"
  link1Text = "Home"
  link2Text = "Product"
  link3Text = "Contact"
  link4Text ="About"
  link1Url= "/"
  link2Url= "/product"
  link3Url= "/contact"
  link4Url= "/about"
  link1Size = "1.4vmax"
  link1Color = "#052f46"
  link1ColorHover= "#ee30ed"
  link1Margin ="2.2vmax"
  link1Family ="sans-serif"
  nav1justifyContent ="flex-end"
  nav2justifyContent ="flex-end"
  nav3justifyContent ="flex-start"
  nav4justifyContent ="flex-start"
  profileIcon={true}
  profileIconColor= "rgba(35, 35, 35,0.8)"
  ProfileIconElement={MdAccountCircle}
  searchIcon={true}
  searchIconColor ="rgba(35, 35, 35,0.8)"
  SearchIconElement= {MdSearch}
  cartIcon={true}
  cartIconColor= "rgba(35, 35, 35,0.8)"
  CartIconElement={MdAddShoppingCart}
  searchIconMargin ="10px"
  cartIconMargin ="10px"
  profileIconMargin = "10px"



 
  /> 

  
}

export default Header