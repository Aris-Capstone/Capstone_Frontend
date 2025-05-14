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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await login({ username, password });
            console.log("Login response:", result);
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
            console.error("Login error:", err);
        }
    };

    const handleChange = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        };
    };

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
