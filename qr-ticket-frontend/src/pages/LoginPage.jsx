import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { saveAuth } from "../util/authStorage";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#2a5298",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    transition: "0.3s"
  },
  error: {
    background: "#ffe6e6",
    color: "#d8000c",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "14px"
  }
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(creds);
      saveAuth(data.token, data.role);

      switch (data.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "GATE":
          navigate("/gate-scanner");
          break;
        case "MUSEUM":
          navigate("/museum-scanner");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Staff Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              name="username"
              value={creds.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={creds.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;