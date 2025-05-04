import { useFetchProductsQuery } from "../api/storeApi";
import { useNavigate } from 'react-router-dom';
//import SearchBar from "./SearchBar"

export default function Products() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useFetchProductsQuery();

    if (isLoading) {
        return (
            <section>
                <h2> Loading...</h2>
            </section>
        );
    }
    if (error) {
        return (
            <section>
                <h2> It's not you, it's us. Come back to the happiest store on earth later </h2>
            </section>
        );
    }
    return (
        <div>
            <h1 className="products-title">Happiest Store on Earth</h1>
            <div className="products-container">
                {data?.map((product) => {
                    return (
                        <section>
                            <div key={product.id}>
                                <img className="product-image" src={product.image_url} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>${product.price}</p>
                            </div>
                            <div>
                                <button onClick={() => navigate(`/products/${product.id}`)}>View Product</button>
                            </div>
                        </section>

                    );
                })}
            </div>
        </div>
    );
}
