import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProductQuery } from '../api/storeApi';

export default function SingleProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useFetchProductQuery(productId);

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Something went wrong, try back later!</p>
            </div>
        );
    }

    return (
        <div className="single-product">
            <button onClick={() => navigate('/')} className="back-button">
                Back to Products
            </button>
            <div className="product-details">
                <img
                    className="single-product-image"
                    src={product.image_url}
                    alt={product.name}
                />
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="description">{product.description}</p>
                    <p className="price">${product.price}</p>
                </div>
            </div>
            <button onClick={() => navigate('/user_cart')} className="add-to-cart">
                Add to Cart
            </button>
        </div>
    );
}
