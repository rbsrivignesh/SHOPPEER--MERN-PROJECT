import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  const [allproducts, setProducts] = useState([]);
  const fetchinfo = async () => {
    await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => { setProducts(data) });

  }
  useEffect(() => {
    fetchinfo()
  }, []);
  const remove_product = async (id) => {
    console.log(id);
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    await fetchinfo();
  }
  return (
    <div className="list-product">
      <h1>ALL PRODUCTS</h1>
      <div className="listproduct-format-main">
        <p>PRODUCTS</p>
        <p>TITLE</p>
        <p>OLD PRICE</p>
        <p>NEW PRICE</p>
        <p>CATEGORY</p>
        <p>REMOVE</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, i) => {
          return <>
            <div key={i} className="listproduct-format-main listproduct-format">
              <img src={product.image} className='listproduct-product-image' alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img className='listproduct-remove-icon' src={remove_icon} onClick={() => {
                remove_product(product.id);
              }} alt="" />

            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct