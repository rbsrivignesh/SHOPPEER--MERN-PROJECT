import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
// import { set } from 'mongoose'
const RelatedProducts = (props) => {
  const { product } = props


  const [data_product, setdataproduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/relatedproducts", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category: product.category })
    }).then((res) => res.json()).then((data) => { setdataproduct(data) });
  }, [])
  return (
    <div className="relatedproducts">
      <h1>RELATED PRODUCTS</h1>
      <hr />
      <div className="relatedproducts-items">
        {data_product.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts