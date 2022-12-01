import React from 'react'
import {Link} from 'react-router-dom'
import './home.css'

import { CgMouse} from "react-icons/cg"
import Product from './Product'

const Home = () => {

    const product = {
        name:"Amitesh",
        images:[{ url:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"}],
        email:"amitsjn./r",
        price:"80000",
        mob:8602632652,
        _id:"12345abhi"

    }
  return <>
    <div className="banner">
        <p>Welcome to Ecommerrce</p>
        <h1>Find Amazing Product Below</h1>
        <Link to="#container">
            <button>
                scroll <CgMouse/>
            </button>
        </Link>
    </div>

<div className="homeheading">Featured Products</div>

<div className="container-fluid p-0 d-flex flex-wrap justify-content-center mt-2" id='container' style={{width:"100vw"}}>
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />
    <Product product = {product} />


</div>


    </>
}

export default Home