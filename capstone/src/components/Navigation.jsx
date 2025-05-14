import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, getCart } from "../features/userSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const cart = useSelector(getCart);
    const user = useSelector((state) => state.user.user);

    console.log("Navigation - Current user state:", {
        token,
        user,
        is_admin: user?.is_admin,
        fullState: user
    });

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div id="navigation" className="navigation">
            <NavLink to="/">Home</NavLink>
            <div className="right-links">
                {!token && <NavLink to="/login">Login</NavLink>}
                {token && <NavLink to="/" onClick={handleLogout}>Logout</NavLink>}
                <NavLink to="/user_cart">Cart {cart.length}</NavLink>
                {user?.is_admin && (
                    <Link to="/AdminHome" className="nav-link">
                        Admin
                    </Link>
                )}
            </div>
        </div>
    );
};