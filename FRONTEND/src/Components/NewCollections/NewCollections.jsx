import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collections from '../Assets/new_collections'
import Item from '../Item/Item'
const NewCollections = () => {
    const [new_collections,setnewcollections] =useState([]);
    useEffect(()=>{
        fetch('http://192.168.120.221:4000/newcollections').then((res)=>res.json()).then((data)=>{setnewcollections(data)})
    },[])
    return (
        <div className="new_collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
     
            <div className="new_collections-items">
                {new_collections.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections