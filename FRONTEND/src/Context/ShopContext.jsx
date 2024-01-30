import React, { createContext, useEffect, useState } from 'react'
// import all_product from '../Components/Assets/all_product'
export const ShopContext= createContext(null);
const getDefaultCart=()=>{
    let cart={};
    for (let index = 0; index < 300; index++) {
        cart[index]=0;
        
    }
    return cart;
}
const ShopContextProvider=(props)=>{
    const [all_product,setAllProduct]=useState([])
    const [cartItems,setCartItems]=useState(getDefaultCart)
    useEffect(()=>{
      fetch("http://192.168.120.221:4000/allproducts").then((res)=>res.json()).then((data)=>setAllProduct(data))
      
      
    if(localStorage.getItem('auth-token')){
        fetch('http://192.168.120.221:4000/getcart',{
            method:'POST',
            headers:{
                Accept:"application/json",
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:""
        }).then((res)=>res.json()).then((data)=>setCartItems(data))
    }
},[])

    console.log(all_product);

    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://192.168.120.221:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body:JSON.stringify({"id":itemId})
            }).then((res)=>res.json()).then((data)=>console.log(data));
        }
        // console.log(cartItems)
        
    }
    // console.log(cartItems)
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://192.168.120.221:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-type':'application/json'
                },
                body:JSON.stringify({"id":itemId})
            }).then((res)=>res.json()).then((data)=>console.log(data));
        }
        
    }
    const getTotalAmount=()=>{
        // console.log("working");
       let totalAmount=0;
       for( const item in cartItems){
      
        if(cartItems[item]>0){
            let itemInfo=all_product.find((product)=>
                product.id===Number(item)
            )
            totalAmount+=itemInfo.new_price* cartItems[item];
            // console.log(totalAmount)
        }
    }
    return totalAmount;
    }
    // console.log(cartItems)
    const getTotalCartItems=()=>{
        let cartitem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
              cartitem+=cartItems[item];
            }
        }
        return cartitem;
    }
    const contextValue={getTotalCartItems,getTotalAmount,all_product,cartItems,addToCart,removeFromCart}
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

