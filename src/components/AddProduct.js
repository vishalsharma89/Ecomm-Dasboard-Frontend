import React, { useState } from 'react';

const AddProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [cateogry, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    const addProduct = async () => {
        console.warn(!name);
        if (!name || !price || !cateogry || !company) {
            setError(true)
            return false;
        }

        // console.warn(name, price, cateogry, company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, cateogry, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json();
        console.warn(result);
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                className='inputBox' placeholder='Enter Product Name*' />
            {error && !name && <span className='invalid-input'>*Enter valid name</span>}
            <input type="text"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }} className='inputBox' placeholder='Enter Product Price*' />
            {error && !price && <span className='invalid-input'>*Enter valid price</span>}

            <input type="text" className='inputBox'
                value={cateogry}
                onChange={(e) => { setCategory(e.target.value) }} placeholder='Enter Product Category*' />
            {error && !cateogry && <span className='invalid-input'>*Enter valid category</span>}

            <input type="text" className='inputBox'
                value={company}
                onChange={(e) => { setCompany(e.target.value) }} placeholder='Enter Product Company*' />
            {error && !company && <span className='invalid-input'>*Enter valid company name</span>}

            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}
export default AddProduct;