import './Sidebar.css'
import React from 'react'
import {Link} from 'react-router-dom'
import add_product from '../../assets/Product_Cart.svg'
import list_product from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product} alt="" />
                <p>ADD PRODUCT</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product} alt="" />
                <p>LIST PRODUCT</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar