import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart, setCart } from '../features/userSlice';

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(getCart);

    const handleRemove = (cartItemId) => {
        dispatch(removeFromCart(cartItemId));
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
                {cart.map((item) => (
                    <div key={item.cartItemId} className="cart-item">
                        <div className="cart-item-details">
                            <img
                                className="cart-item-image"
                                src={item.image_url}
                                alt={item.name}
                            />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: 1</p>
                            </div>
                        </div>
                        <button className="remove-button" onClick={() => handleRemove(item.cartItemId)}>Remove </button>
                    </div>
                ))}
            </div>
            <div>
                <h3> Total Price: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)} </h3>
            </div>
            <button className="checkout" onClick={() => dispatch(setCart([]))}>Checkout</button>
        </section>
    );
};