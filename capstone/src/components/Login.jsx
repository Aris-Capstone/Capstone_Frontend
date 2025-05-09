import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/userSlice";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthenticateMutation } from "../api/storeApi";

export default function Login({ data, setData }) {
    const [login] = useAuthenticateMutation();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await login(data);
            if (result.data) {
                dispatch(setToken(result.data.token));
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" name="username" value={data.username} onChange={handleChange} />
            <label>Password:</label>
            <input type="password" name="password" value={data.password} onChange={handleChange} />
            <button className="login-button" type="submit">Login</button>
            <p>
                Don't have an account? <NavLink to="/users">Create Account</NavLink>
            </p>
        </form>
    );
};


