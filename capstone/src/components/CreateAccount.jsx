import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../features/userSlice";
import { useCreateUserMutation, useAuthenticateMutation } from "../api/storeApi";

//create account form functionality
export default function CreateAccount() {
    const [createAccount] = useCreateUserMutation();
    const [login] = useAuthenticateMutation();
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

    //create account form functionality
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = { username, password, name, mailing_address: address };

            const result = await createAccount(userData);

            if (result.error) {
                setErrors(result.error.data?.message || "Something went wrong");
                return;
            }

            if (result.data) {
                // After successful account creation, log in to get the token
                const loginResult = await login({ username, password });
                if (loginResult.data?.token) {
                    dispatch(setToken(loginResult.data.token));
                    dispatch(setUser({
                        token: loginResult.data.token,
                        user: loginResult.data.user,
                        is_admin: loginResult.data.user?.is_admin
                    }));
                    navigate("/");
                } else {
                    setErrors("Account created but login failed. Please try logging in manually.");
                }
            } else {
                setErrors("Invalid response from server");
            }
        } catch (err) {
            setErrors("Failed to create account. Please try again.");
        }
    };

    //render the create account form
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
