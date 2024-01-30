import React, { useState } from 'react'
import './CSS/LoginSignup.css'
const LoginSignUp = () => {
  const [state,setState]=useState("LOGIN");
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });
  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login=async ()=>{
    console.log("login working",formData);
    let responseData;
    await fetch("http://192.168.120.221:4000/login",{
      method:'POST',
      headers:{
        Accept:"application/json",
        'Content-Type':"application/json"
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData=data})
    console.log(responseData)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  

  }
  const signup=async ()=>{
    console.log("signup working",formData);
    let responseData;
   await fetch("http://192.168.120.221:4000/signup",{
      method:'POST',
      headers:{
        Accept:"application/json",
        'Content-Type':"application/json"
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData=data})
    console.log(responseData);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }
  return (
  <div className="loginsignup">
    <div className="loginsignup-container">
      <h1>{state}</h1>
      <div className="loginsignup-fields">
       {state==="SIGN UP"? <input name="name" value={formData.username} onChange={changeHandler} type="text" placeholder='Your name'/> :<></>}
        <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address'/>
        <input name="password" value={formData.password} onChange={changeHandler}  type="password" placeholder='Password'/>
      </div>
      <button onClick={()=>{state==="LOGIN"?login():signup()}}>Continue</button>
      
      {state==="SIGN UP"?<p className="loginsignup-login">ALREADY HAVE AN ACCOUNT? <span onClick={()=>{setState("LOGIN")}}>LOGIN HERE!</span></p> :<p className="loginsignup-login">CREATE AN ACCOUNT? <span onClick={()=>{setState("SIGN UP")}}>SIGN UP HERE!</span></p>}
      <div className="loginsignup-agree">
        <input type="checkbox" name='' id='' />
        <p>BY CONTINUING ,I AGREE TO THE TERMS OF USE & PRIVACY POLICY</p>
      </div>
    </div>

  </div>
  )
}

export default LoginSignUp