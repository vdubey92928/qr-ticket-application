import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { saveAuth } from "../util/authStorage";
import Navbar from "../components/layout/Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- SHORT HANDLER ---
  const handleChange = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);

    try {
      const data = await login(creds.username, creds.password);
      saveAuth(data.token, data.role);
      
      // Redirect Logic
      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "GATE") navigate("/gate");
      else setError("Unknown Role Assigned");
      
    } catch (err) {
      setError(err?.message || "Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <style>{`
        :root {
          --bg-dark: #0f172a;
          --glass-bg: rgba(30, 41, 59, 0.7);
          --accent-grad: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        }
        .login-root {
          min-height: 100vh;
          background: radial-gradient(circle at top center, #1e293b 0%, #020617 100%);
          display: flex; align-items: center; justify-content: center;
          padding-top: 60px; position: relative; overflow: hidden;
        }
        .glow {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
          z-index: 0; pointer-events: none;
        }
        .login-card {
          width: 100%; max-width: 400px; z-index: 10;
          background: var(--glass-bg); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;
          padding: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          animation: fadeUp 0.8s ease-out;
        }
        .inp {
          width: 100%; padding: 12px; margin-bottom: 1rem;
          background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #fff; outline: none; transition: 0.3s;
        }
        .inp:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        .btn-login {
          width: 100%; padding: 12px; border: none; border-radius: 10px;
          background: var(--accent-grad); color: white; font-weight: bold;
          cursor: pointer; transition: 0.3s; margin-top: 0.5rem;
        }
        .btn-login:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(59,130,246,0.3); }
        .btn-login:disabled { opacity: 0.7; cursor: not-allowed; }
        .error-msg { color: #fca5a5; background: rgba(220,38,38,0.1); padding: 10px; border-radius: 8px; font-size: 0.9rem; text-align: center; margin-bottom: 1rem; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="login-root">
        <div className="glow" style={{top:'-10%', left:'-10%'}}></div>
        <div className="glow" style={{bottom:'-10%', right:'-10%', background:'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)'}}></div>

        <div className="login-card">
          <h2 style={{color:'white', textAlign:'center', marginBottom:'0.5rem'}}>Welcome Back</h2>
          <p style={{color:'#94a3b8', textAlign:'center', marginBottom:'2rem', fontSize:'0.9rem'}}>Admin / Staff Access Portal</p>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleLogin}>
            <label style={{color:'#cbd5e1', fontSize:'0.9rem', marginBottom:'5px', display:'block'}}>Username</label>
            <input 
              name="username" type="text" className="inp" 
              placeholder="Enter username" 
              onChange={handleChange} required 
            />

            <label style={{color:'#cbd5e1', fontSize:'0.9rem', marginBottom:'5px', display:'block'}}>Password</label>
            <input 
              name="password" type="password" className="inp" 
              placeholder="••••••••" 
              onChange={handleChange} required 
            />

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>

          <div style={{textAlign:'center', marginTop:'1.5rem', fontSize:'0.9rem', color:'#94a3b8'}}>
            New Staff Member? 
            <Link to="/register" style={{color:'#3b82f6', textDecoration:'none', fontWeight:'bold', marginLeft:'5px'}}>
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;