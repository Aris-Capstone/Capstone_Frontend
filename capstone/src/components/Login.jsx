import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useAuthenticateMutation } from "../api/storeApi";
import { useCreateUserMutation } from "../api/storeApi";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticate, { isLoading, error }] = useAuthenticateMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        authenticate({ username, password });
        navigate("/");
    };

    return (
        <form className="login-form" onSubmit={handleChange}>
            <label>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className="login-button" type="submit">Login</button>
            {/* <p>
                Don't have an account? <Link to="/users">Register</Link>
            </p> */}
        </form>
    );
};

