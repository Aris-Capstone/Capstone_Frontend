import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart, setCart } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    };

    const handleCheckout = () => {
        navigate('/checkout');
        dispatch(setCart([]));
    };

    //handle quantity change- still need to do


    //render the cart & functionality with checkout button
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
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(item.cartItemId, -1)}>-</button>
                                    <span>Qty: {item.quantity || 1}</span>
                                    <button onClick={() => handleQuantityChange(item.cartItemId, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <button className="remove-button" onClick={() => handleRemove(item.cartItemId)}>Remove</button>
                    </div>
                ))}
            </div>
            <div>
                <h3>Total Price: ${cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)}</h3>
            </div>
            <button className="checkout" onClick={handleCheckout}>Checkout</button>
        </section>
    );
};