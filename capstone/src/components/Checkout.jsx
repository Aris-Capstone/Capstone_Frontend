import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const navigate = useNavigate();

    return (
        <section>
            <h2 className="checkout-title">Checkout Complete</h2>
            <p>Thank you for your purchase with the Happiest Store on Earth!</p>
            <button className="return-shopping" onClick={() => navigate('/')}>Return to Shopping</button>
        </section>
    );
}