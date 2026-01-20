// src/pages/LoginPage.jsx

import { useState } from "react";
import { login } from "../services/authService";
import { saveAuth } from "../util/authStorage";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(username, password);


            saveAuth(data.token, data.role);

            // Redirect based on role
            if (data.role === "ADMIN") {
                navigate("/admin");
            } else if (data.role === "GATE") {
                navigate("/gate");
            } else {
                setError("Unknown role");
            }
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginTop: "10px" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {error}
                    </p>
                )}

                <button style={{ marginTop: "15px" }} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
