import React, { useContext } from 'react'
import remove_icon from '../Components/Assets/cart_cross_icon.png'
import {ShopContext}  from '../Context/ShopContext'
import { Link } from 'react-router-dom'

import './CSS/Cart.css'
const Cart = () => {
  
  const { getTotalAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext)
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>PRODUCTS</p>
        <p>TITLE</p>
        <p>PRICE</p>
        <p>QUANTITY</p>
        <p>TOTAL</p>
        <p>REMOVE</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return <div>
        <div className="cartitems-format cartitems-format-main">
        <Link to={`/product/${e.id}`}> <img src={e.image} alt="" className='cartitems-product-icon' /></Link>
            <p>{e.name}</p>
            <p>${e.new_price}</p>
            <button className="cartitems-quantity">{cartItems[e.id]}</button>
            <p>${cartItems[e.id] * e.new_price}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => {
              removeFromCart(e.id)
            }} alt="" />
          </div>
          </div>
        }
        return null;
        
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>CART TOTALS</h1>
          <div className="cartitems-total-item">
            <p>SUBTOTAL</p>
            <p>${getTotalAmount()}</p>
          </div>
            <hr />
          <div className="cartitems-total-item">
            <p>SHIPPING FEE</p>
            <p>FREE</p>
          </div>
            <hr />
          <div className="cartitems-total-item">
            <h3>TOTAL</h3>
            <h3>${getTotalAmount()}</h3>
          </div>
            <hr />
        <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>IF YOU HAVE A PROMO CODE,ENTER IT HERE</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='PROMO CODE ' />
           <button>SUBMIT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart