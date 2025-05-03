import { useFetchProductsQuery } from "../api/storeApi";
//import SearchBar from "./SearchBar"

export default function Products() {
    const { data, isLoading, error } = useFetchProductsQuery();
    console.log("Product data:", data);

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
                    console.log("Image URL for", product.name, ":", product.image_url);
                    return (
                        <div key={product.id}>
                            <img className="product-image" src={product.image_url} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
