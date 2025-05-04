import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation() {
    const dispatch = useDispatch();

    return (
        <div id="navigation" className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/cart">Cart</NavLink>
        </div>
    );
};