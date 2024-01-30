import React, { useContext, useRef, useState } from "react"
import './Navbar.css';
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { Link } from "react-router-dom";
import dropdown_icon from '../Assets/dropdown_icon.png'
import { ShopContext } from "../../Context/ShopContext";



const Navbar = () => {
    const {getTotalCartItems}=useContext(ShopContext)
    const menuRef=useRef();
    const menuRefs=useRef();
    const [menu, setmenu] = useState("shop");
    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
    const dropdown_toggles=()=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        menuRefs.current.classList.toggle('open');

        // e.target.classList.toggle('open');
    }
   
    return (<div className="navbar">
        <div className="nav-logo">
           <Link to={"/"}> <img src={logo} alt="" /></Link>
            <p>SHOPPER</p>
        </div>
        <div className="nav-dropdown-div"><img ref={menuRefs} className="nav-dropdown" onClick={dropdown_toggle} src={dropdown_icon} alt="" /></div>
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setmenu("shop");dropdown_toggles()} }><Link style={{textDecoration:'none'}} to='/'>SHOP</Link> {menu==="shop"? <hr/> :<></>}</li>
            <li onClick={()=>{setmenu("men");dropdown_toggles()}}><Link style={{textDecoration:'none'}} to='/men'>MEN</Link> {menu==="men"? <hr/> :<></>}</li>
            <li onClick={()=>{setmenu("women");dropdown_toggles()}}><Link style={{textDecoration:'none'}}to='/women'>WOMEN</Link> {menu==="women"? <hr/> :<></>}</li>
            <li onClick={()=>{setmenu("kids");dropdown_toggles()}}><Link style={{textDecoration:'none'}}to='/kids'>KIDS</Link> {menu==="kids"? <hr/> :<></>}</li>
        </ul>
        <div className="nav-login-cart">

            {localStorage.getItem('auth-token')?<button onClick={()=>{
                localStorage.removeItem('auth-token');
                window.location.replace('/');
            }}>LOGOUT</button> :  <Link to='/login'> <button>LOGIN</button></Link>}
          
           <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
            <div className="nav-cart-count">
              {getTotalCartItems()}
            </div>
        </div>
    </div>);
}
export default Navbar

