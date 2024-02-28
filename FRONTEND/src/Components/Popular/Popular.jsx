import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'

const Popular = () => {
  const [data_product, setdataproduct] = useState([]);
  // console.log(data_product);
  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen").then((res) => res.json()).then((data) => { setdataproduct(data) })
  }, [])
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-items">
        {data_product.map((item, i) => {


          return (<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />)
        })}
      </div>

    </div>
  )
}

export default Popular