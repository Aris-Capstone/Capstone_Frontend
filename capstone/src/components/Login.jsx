import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser, setIsAdmin } from "../features/userSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthenticateMutation } from "../api/storeApi";

export default function Login() {
    const [login] = useAuthenticateMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //login form functionality
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await login({ username, password });
            if (result.data) {
                dispatch(setToken(result.data.token));
                if (result.data.user) {
                    dispatch(setUser({
                        token: result.data.token,
                        user: result.data.user,
                        is_admin: result.data.user?.is_admin
                    }));
                }
                navigate("/");
            }
        } catch (err) {
        }
    };

    //login form functionality
    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        };
    };

    //render the login form
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={username} onChange={handleChange} />
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handleChange} />
            <button className="login-button" type="submit">Login</button>
            <p>
                Don't have an account? <NavLink to="/users">Create Account</NavLink>
            </p>
        </form>
    );
};
