import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { saveAuth } from "../util/authStorage";

const LoginPage = () => {

  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    username: "",
    password: "",
    role: "ADMIN"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(creds);
      saveAuth(data.token, data.role);

      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "GATE") navigate("/gate-scanner");
      else if (data.role === "MUSEUM") navigate("/museum-scanner");

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid username or password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">

        <h2 className="text-center text-white mb-3">Staff Login</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>

          <label className="text-light">Role</label>
          <select
            name="role"
            className="inp"
            value={creds.role}
            onChange={handleChange}
          >
            <option value="ADMIN">Admin</option>
            <option value="GATE">Gate Scanner</option>
            <option value="MUSEUM">Museum Scanner</option>
          </select>

          <label className="text-light">Username</label>
          <input
            name="username"
            className="inp"
            placeholder="Enter username"
            onChange={handleChange}
            required
          />

          <label className="text-light">Password</label>
          <input
            type="password"
            name="password"
            className="inp"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />

          <button className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
