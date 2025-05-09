import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, getCart, initialState, getUserId } from "../features/userSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const cart = useSelector(getCart);

    const logout = () => {
        dispatch(setUser({ ...initialState }));
    };

    return (
        <div id="navigation" className="navigation">
            <NavLink to="/">Home</NavLink>
            <div className="right-links">
                {!userId && <NavLink to="/login">Login</NavLink>}
                {userId && <a onClick={logout}>Logout</a>}
                <NavLink to="/user_cart">Cart</NavLink>
            </div>
        </div>
    );
};