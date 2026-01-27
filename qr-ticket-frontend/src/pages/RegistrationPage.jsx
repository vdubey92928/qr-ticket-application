import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",          // New: Phone Number
    role: "GATE",       // New: Default Role
    secretKey: "",      // New: Security Code
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Security Check (Frontend Simulation)
    // Real app mein ye check Backend par hona chahiye
    if (formData.role === "ADMIN" && formData.secretKey !== "PRERNA2026") {
       setError("Invalid Secret Key for Admin Role!");
       return;
    }

    setLoading(true);

    try {
      // Mock API Call
      console.log("Registering User:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     
      <style>{`
        :root { --bg-dark: #0f172a; --glass-bg: rgba(30, 41, 59, 0.7); --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); }
        .auth-root { min-height: 100vh; background: radial-gradient(circle at top center, #1e293b 0%, #020617 100%); display: flex; align-items: center; justify-content: center; padding-top: 80px; padding-bottom: 40px; }
        .auth-card { width: 100%; max-width: 500px; background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        
        .form-group { margin-bottom: 1rem; }
        .label { display: block; color: #cbd5e1; font-size: 0.9rem; margin-bottom: 0.4rem; margin-left: 4px; }
        
        .custom-input { width: 100%; padding: 12px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; outline: none; transition: 0.3s; }
        .custom-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
        
        /* Dropdown Style */
        select.custom-input { appearance: none; cursor: pointer; }
        
        .btn-auth { width: 100%; padding: 14px; border-radius: 12px; border: none; background: var(--accent-gradient); color: white; font-weight: bold; cursor: pointer; margin-top: 1rem; transition: 0.2s; }
        .btn-auth:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }
        
        .auth-link { color: #3b82f6; text-decoration: none; font-weight: bold; margin-left: 5px; }
        .helper-text { font-size: 0.8rem; color: #64748b; margin-top: 4px; margin-left: 4px; }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">
          <h1 style={{color:'white', textAlign:'center', marginBottom:'0.5rem'}}>Create ID</h1>
          <p style={{color:'#94a3b8', textAlign:'center', marginBottom:'2rem'}}>For Staff & Administration</p>
          
          {error && <div style={{color:'#fca5a5', background:'rgba(255,0,0,0.2)', border:'1px solid rgba(255,0,0,0.2)', padding:'10px', borderRadius:'8px', marginBottom:'1.5rem', textAlign:'center', fontSize:'0.9rem'}}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            
            {/* Full Name */}
            <div className="form-group">
                <label className="label">Full Name</label>
                <input type="text" name="fullName" className="custom-input" placeholder="e.g. Adarsh Pal" onChange={handleChange} required />
            </div>

            {/* Email & Phone Row */}
            <div style={{display:'flex', gap:'15px'}}>
                <div className="form-group" style={{flex:1}}>
                    <label className="label">Email</label>
                    <input type="email" name="email" className="custom-input" placeholder="admin@lda.com" onChange={handleChange} required />
                </div>
                <div className="form-group" style={{flex:1}}>
                    <label className="label">Phone</label>
                    <input type="tel" name="phone" className="custom-input" placeholder="9876543210" onChange={handleChange} required />
                </div>
            </div>

            {/* Role Selection */}
            <div className="form-group">
                <label className="label">Select Role</label>
                <select name="role" className="custom-input" onChange={handleChange} value={formData.role}>
                    <option value="GATE">Gate Keeper (Scanner Access)</option>
                    <option value="ADMIN">Administrator (Full Access)</option>
                    <option value="MANAGER">Manager (View Reports)</option>
                </select>
            </div>

            {/* Secret Key (Security Layer) */}
            <div className="form-group">
                <label className="label">Secret Organization Code</label>
                <input type="password" name="secretKey" className="custom-input" placeholder="Enter secret key to join" onChange={handleChange} required />
                <div className="helper-text">* Ask your supervisor for the code.</div>
            </div>

            {/* Passwords */}
            <div style={{display:'flex', gap:'15px'}}>
                <div className="form-group" style={{flex:1}}>
                    <label className="label">Password</label>
                    <input type="password" name="password" className="custom-input" placeholder="••••••" onChange={handleChange} required />
                </div>
                <div className="form-group" style={{flex:1}}>
                    <label className="label">Confirm</label>
                    <input type="password" name="confirmPassword" className="custom-input" placeholder="••••••" onChange={handleChange} required />
                </div>
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
                {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <div style={{textAlign:'center', marginTop:'2rem', color:'#94a3b8'}}>
            Already have an ID? <Link to="/login" className="auth-link">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;