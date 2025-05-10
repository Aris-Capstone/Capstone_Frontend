import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../features/userSlice";
import { useCreateUserMutation } from "../api/storeApi";

export default function CreateAccount() {
    const [createAccount] = useCreateUserMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        if (errors) {
            setErrors(null);
        }
        if (event.target.name === "username") {
            setUsername(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        } else if (event.target.name === "name") {
            setName(event.target.value);
        } else if (event.target.name === "address") {
            setAddress(event.target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, data } = await createAccount({ username, password, name, mailing_address: address });
        if (error) {
            setErrors("Something went wrong");
            return;
        }
        dispatch(setToken(data));
        navigate("/");
    };

    return (
        <section className="create-account-section">
            <h2 className="create-account-title">Create Account</h2>
            {errors && <p>Error: {errors}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username: {""}</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                <label>Password: {""}</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <label>Name: {""}</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <label>Address: {""}</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                />
                <button type="submit">Create Account</button>
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    Show Password
                </button>
            </form>
        </section>
    )
}
