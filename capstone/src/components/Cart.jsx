import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart } from '../features/userSlice';

export default function Cart() {
    const cart = useSelector(getCart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    if (!cart || cart.length === 0) {
        return (
            <section>
                <h2>Your cart is empty</h2>
            </section>
        );
    }

    return (
        <section>
            <h2>Your Shopping Cart</h2>
            <div className="cart-items">
                {cart.map((product) => (
                    <div className="cart-item" key={product.id}>
                        <img
                            className="cart-item-image"
                            src={product.image_url}
                            alt={product.name}
                        />
                        <div className="cart-item-details">
                            <h3>{product.name}</h3>
                            <p> Price: ${product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <button className="remove-button" onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};