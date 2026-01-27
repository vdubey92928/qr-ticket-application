import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Helper function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        :root {
          /* Updated to a deeper, richer dark background */
          --nav-bg-glass: rgba(2, 6, 23, 0.85); /* Very Dark Slate */
          --nav-bg-solid: #020617; 
          --text-main: #94a3b8;
          --text-active: #38bdf8; /* Cyan for Active State */
          --accent-glow: #38bdf8;
          --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          --border-color: rgba(255, 255, 255, 0.08);
          --nav-height: 70px;
        }

        .nav-root {
          position: sticky;
          top: 0;
          z-index: 9999;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .nav-root.scrolled {
          background: var(--nav-bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
        
        .nav-root:not(.scrolled) {
           background: rgba(2, 6, 23, 0.6); 
           backdrop-filter: blur(5px);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* --- LOGO --- */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          color: var(--accent-glow);
          font-size: 1.2rem;
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s ease;
        }

        .brand:hover .brand-icon {
          background: var(--accent-gradient);
          color: #fff;
          transform: rotate(-10deg);
        }

        .brand-text {
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          color: #f8fafc;
        }

        /* --- DESKTOP NAV --- */
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nav-link {
          position: relative;
          color: var(--text-main);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 5px 0;
        }

        /* Hover Effect */
        .nav-link:hover {
          color: #f1f5f9;
        }

        /* ACTIVE STATE STYLING (The Key Change) */
        .nav-link.active {
          color: var(--text-active); /* Cyan Color */
          font-weight: 600;
          text-shadow: 0 0 15px rgba(56, 189, 248, 0.4); /* Glow effect */
        }

        /* Underline Animation */
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: var(--accent-glow);
          transition: width 0.3s ease-in-out;
          box-shadow: 0 0 8px var(--accent-glow);
          border-radius: 2px;
        }

        /* Show underline on Hover OR if Active */
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* --- BUTTON --- */
        .nav-btn {
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          color: white;
          background: var(--accent-gradient);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
        }

        /* --- MOBILE --- */
        .toggler {
          display: none;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
        }

        .mobile-panel {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          width: 100%;
          background: var(--nav-bg-solid);
          border-bottom: 1px solid var(--border-color);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-panel.open { max-height: 400px; }

        .mobile-link {
          display: block;
          padding: 1rem 1.5rem;
          color: var(--text-main);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-weight: 500;
          transition: 0.2s;
        }

        /* Mobile Active State */
        .mobile-link.active {
          color: var(--text-active);
          background: rgba(56, 189, 248, 0.05);
          border-left: 3px solid var(--text-active);
          padding-left: calc(1.5rem - 3px);
        }

        @media (max-width: 900px) {
          .nav-links { display: none; }
          .toggler { display: block; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <path d="M3 14h7v7H3z"></path>
              </svg>
            </div>
            <span className="brand-text">QR Ticket</span>
          </Link>

          {/* Desktop Links with Active Logic */}
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${isActive("/")}`}>Home</Link>
            </li>
            <li>
              <Link to="/generate" className={`nav-link ${isActive("/generate")}`}>Book Ticket</Link>
            </li>
            <li>
              <Link to="/gallery" className={`nav-link ${isActive("/gallery")}`}>Gallery</Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive("/about")}`}>About</Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive("/contact")}`}>Contact</Link>
            </li>
            <li>
              <Link to="/login" className="nav-btn">Admin Dashboard</Link>
            </li>
          </ul>

          <button className="toggler" onClick={() => setOpen(!open)}>
            {open ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown with Active Logic */}
        <div className={`mobile-panel ${open ? "open" : ""}`}>
          <Link to="/" className={`mobile-link ${isActive("/")}`} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/generate" className={`mobile-link ${isActive("/generate")}`} onClick={() => setOpen(false)}>Book Ticket</Link>
          <Link to="/gallery" className={`mobile-link ${isActive("/gallery")}`} onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/about" className={`mobile-link ${isActive("/about")}`} onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" className={`mobile-link ${isActive("/contact")}`} onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/login" className="mobile-link" style={{color: '#38bdf8', fontWeight: 'bold'}} onClick={() => setOpen(false)}>
            Admin Login →
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;