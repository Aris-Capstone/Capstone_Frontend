import { useFetchProductsQuery } from "../api/storeApi";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar"
import { useState } from "react";

export default function Products() {
    const navigate = useNavigate();
    const [searchParamater, setSearchParamater] = useState("");
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

    const productsToDisplay = searchParamater !== "" && data
        ? data.filter((product) =>
            product.name.toUpperCase().includes(searchParamater.toUpperCase())
        )
        : data;

    return (
        <>
            <h1 className="products-title">Happiest Store on Earth</h1>
            <SearchBar searchParamater={searchParamater} setSearchParamater={setSearchParamater} />

            <section className="products-container">
                {productsToDisplay?.map((product) => (
                    <div key={product.id}>
                        <img className="product-image" src={product.image_url} alt={product.name} />
                        <div>
                            <h3>{product.name}</h3>
                            <button className="view-details" onClick={() => navigate(`/products/${product.id}`)}>View Product</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

