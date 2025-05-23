import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProductQuery } from '../api/storeApi';
import { addToCart } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { getToken } from '../features/userSlice';
import { useSelector } from 'react-redux';

export default function SingleProduct() {
    const { productId } = useParams();
    const token = useSelector(getToken);

    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    //render the single product
    return (
        <div className="single-product">
            <button onClick={() => navigate('/')} className="back-button">
                Back to Products
            </button>
            <div className="product-details">
                <h1>{product.name}</h1>
                <img
                    className="single-product-image"
                    src={product.image_url}
                    alt={product.name}
                />
                <p className="description">{product.description}</p>
                <p className="price">${product.price}</p>
                {token &&
                    <button onClick={() => dispatch(addToCart(product))} className="add-to-cart">
                        Add to Cart
                    </button>
                }
            </div>
        </div>
    );
}
