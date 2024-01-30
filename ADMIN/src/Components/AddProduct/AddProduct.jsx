import React, { useState } from 'react'
import './Addproduct.css'
import uploadAreaImage from '../../assets/upload_area.svg'
const AddProduct = () => {
    const [image, setImage] = useState(false);
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
    const addProduct = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);
        await fetch('http://192.168.120.221:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData
        }).then((res) => res.json()).then((data) => { responseData = data });
        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://192.168.120.221:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                if (data.success) {
                    alert('product added');
                }
                else {
                    alert('failed');
                }
            })
        }
    }

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>PRODUCT NAME</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='TYPE HERE' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>PRICE</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='ENTER THE PRICE' />
                </div>
                <div className="addproduct-itemfield">
                    <p>OFFER PRICE</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='ENTER THE OFFER PRICE' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>PRODUCT CATEGORY</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector' >
                    <option value="women">WOMEN</option>
                    <option value="men">MEN</option>
                    <option value="kid">KID</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : uploadAreaImage} className="addproduct-thumbnail-img" alt="" />
                </label>
                <input onChange={imageHandler} type="file" id='file-input' name='image' hidden />
            </div>
            <button onClick={() => {
                addProduct()
            }} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct