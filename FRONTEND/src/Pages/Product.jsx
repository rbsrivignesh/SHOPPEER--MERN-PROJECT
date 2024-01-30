import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import Loading from '../Components/Loading/Loading';
// import all_product from '../Components/Assets/all_product'

const Product = () => {
  const [isloading,setloading]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{setloading(false)},250);
  },[])

  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  console.log(productId);
  console.log(all_product);
  const product=all_product?.find((e)=> e.id === Number(productId));
  console.log(product);
  
    return <div> {!isloading ? <div><Breadcrum product={product}/>
    <ProductDisplay product={product}/>
    <DescriptionBox/>
     <RelatedProducts product={product}/></div> : <Loading/> }</div>
}

export default Product