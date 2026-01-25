import React, { useState } from "react";
import { login } from "../services/authService";
import { saveAuth } from "../util/authStorage";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      setError(err?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root{
          --card-bg: #ffffff;
          --page-bg: #f4f6fb;
          --primary: #0d6efd;
          --muted: #6b7280;
          --danger: #dc3545;
          --radius: 12px;
          --max-width: 420px;
          --transition: 180ms ease;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #f7f9ff 0%, var(--page-bg) 100%);
          padding: 2rem 1rem;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }

        .login-card{
          width: 100%;
          max-width: var(--max-width);
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: 0 10px 30px rgba(15,23,42,0.08);
          padding: 1.5rem;
          box-sizing: border-box;
        }

        .login-header {
          text-align: center;
          margin-bottom: 0.75rem;
        }

        .login-header h2 {
          margin: 0;
          font-size: 1.25rem;
          letter-spacing: -0.2px;
        }

        .login-sub {
          margin-top: 0.35rem;
          color: var(--muted);
          font-size: 0.95rem;
        }

        form { margin-top: 1rem; display: grid; gap: 0.75rem; }

        label {
          display: block;
          font-size: 0.85rem;
          margin-bottom: 0.28rem;
          color: #374151;
          font-weight: 600;
        }

        .input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border-radius: 8px;
          border: 1px solid #e6e9ef;
          outline: none;
          font-size: 0.96rem;
          transition: box-shadow var(--transition), border-color var(--transition);
          box-sizing: border-box;
          background: #fff;
        }

        .input:focus {
          border-color: rgba(13,110,253,0.9);
          box-shadow: 0 6px 18px rgba(13,110,253,0.08);
        }

        .row {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--muted);
          font-size: 0.9rem;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.62rem 0.85rem;
          border-radius: 8px;
          background: var(--primary);
          color: #fff;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: transform 120ms ease, box-shadow 120ms ease;
          width: 100%;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(13,110,253,0.12);
        }

        .error {
          color: var(--danger);
          font-size: 0.92rem;
          margin-top: 0.4rem;
          text-align: center;
        }

        .helper {
          font-size: 0.9rem;
          color: var(--muted);
          text-align: center;
          margin-top: 0.45rem;
        }

        .password-row {
          display:flex;
          gap:0.5rem;
          align-items:center;
        }

        .toggle-pass {
          background: transparent;
          border: 1px solid #e6e9ef;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          color: #374151;
          font-size: 0.9rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: rgba(255,255,255,0.9);
          animation: spin 800ms linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .login-card { padding: 1rem; }
        }
      `}</style>
      <Navbar/>
      <div className="login-page" role="main">
        <div className="login-card" aria-labelledby="login-heading">
          <div className="login-header">
            <h2 id="login-heading">Sign in to QR Ticket</h2>
            <div className="login-sub">Admin / Gate staff login</div>
          </div>

          <form onSubmit={handleLogin} aria-describedby={error ? "login-error" : undefined}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                aria-required="true"
                aria-label="Username"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="password-row">
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  aria-required="true"
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="toggle-pass"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div id="login-error" role="alert" className="error" aria-live="assertive">
                {error}
              </div>
            )}

            <button className="btn" type="submit" disabled={loading}>
              {loading ? <span className="spinner" aria-hidden="true" /> : "Login"}
            </button>

            <div className="helper">
              <small>Need help? Contact system administrator.</small>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;