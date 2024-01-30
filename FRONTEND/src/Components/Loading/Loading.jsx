import React from 'react'
import loading from '../Assets/loading-gif.gif'
import './Loading.css'
const Loading = () => {
  return (
    <div className="loading">
        <h1>LOADING</h1>
        <img src={loading} alt="" />
        
    </div>
  )
}

export default Loading