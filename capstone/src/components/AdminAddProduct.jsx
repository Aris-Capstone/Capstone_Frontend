import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../api/storeApi';

export default function AdminAddProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(null);
    const { data: products, isLoading, error: fetchError } = useFetchProductsQuery();
    const [createProduct] = useCreateProductMutation();

    //form functionality    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const productData = {
                name,
                description,
                price: parseFloat(price),
                image_url: image
            };

            const result = await createProduct(productData);
            if (result.error) {
                setError(result.error.data?.message || 'Failed to create product');
            } else {
                // Clear form 
                setName('');
                setDescription('');
                setPrice('');
                setImage('');
            }
        } catch (err) {
            setError('Failed to create product. Please try again.');
        }
    };

    //delete product functionality

    //edit product functionality

    if (isLoading) {
        return (
            <section>
                <h2>Loading...</h2>
            </section>
        );
    }
    if (fetchError) {
        return (
            <section>
                <h2>Error loading products</h2>
            </section>
        );
    };

    //return contents   
    return (
        <>
            <section className="admin-add-product">
                <button className="back-button" onClick={() => navigate('/AdminHome')}>Back</button>
                <h2 className="manage-products-title">Manage Products</h2>

                <div className="form-group">
                    <h3>Add New Product</h3>
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-field">
                            <label htmlFor="name">Product Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="price">Price ($):</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="image">Image URL:</label>
                            <input
                                type="url"
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">Add Product</button>
                    </form>
                </div>

                <div className="admin-products-list">
                    <h3 className="current-products-title">Current Products</h3>
                    <div className="products-container">
                        {products?.map((product) => (
                            <div key={product.id} className="product-card">
                                <img className="product-image" src={product.image_url} alt={product.name} />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                    <p>{product.description}</p>
                                    <div className="admin-buttons-container">
                                        <button
                                            className="admin-delete-button"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete Product
                                        </button>
                                        <button
                                            className="admin-edit-button"
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            Edit Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
