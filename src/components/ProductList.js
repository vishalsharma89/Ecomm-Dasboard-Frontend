import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="" className='search-product-box' placeholder='Search Product'
                onChange={searchHandle}
            />
            <ul >
                <li className='list'>S. No.</li>
                <li className='list'>Name</li>
                <li className='list'>Price</li>
                <li className='list'>Category</li>
                <li className='list'>Operation</li>

            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button>
                                <Link className='update' to={"/update/" + item._id} >Update </Link>
                            </button>
                        </li
                        >

                    </ul>
                )
                    : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;