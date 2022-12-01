import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './home.css'

const options ={
  edit:false,
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",
  size:window.innerWidth<600?20:25,
  value:2.5,
  isHalf:true
}

const Product = ({product}) => {
  return (

   <Link className='card m-2' to="{product._id}" style={{width:"14rem",textDecoration:"none",}}   >
   <div className="card" style={{width:"14rem", background:"linear-Gradient(#fcd4b1)"}}>
   <img src={product.images[0].url} alt={product.name} />
   <div className="card-body">
    <h5 className="card-title">{product.name}</h5>
    <div className="card-body p-0 d-flex justify-content-between">
    <ReactStars  {...options} /><span className='card-text'>(265 Reviews)</span>
    </div>
    <p className="card-text">{product.price}</p>

  </div>
   </div>

  


   </Link>
 
  )
}

export default Product