import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, getCart, initialState, getToken } from "../features/userSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const cart = useSelector(getCart);

    const logout = () => {
        dispatch(setUser({ ...initialState }));
    };

    return (
        <div id="navigation" className="navigation">
            <NavLink to="/">Home</NavLink>
            <div className="right-links">
                {!token && <NavLink to="/login">Login</NavLink>}
                {token && <a onClick={logout}>Logout</a>}
                <NavLink to="/user_cart">Cart {cart.length}</NavLink>
            </div>
        </div>
    );
};