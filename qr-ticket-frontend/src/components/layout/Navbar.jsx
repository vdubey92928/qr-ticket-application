import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for sharper transparency
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
          --nav-bg-glass: rgba(11, 18, 32, 0.75);
          --nav-bg-solid: rgba(11, 18, 32, 0.95);
          --text-main: #e2e8f0;
          --accent-glow: #38bdf8; /* Cyan/Blue */
          --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          --border-color: rgba(255, 255, 255, 0.08);
          --nav-height: 70px;
        }

        /* --- CONTAINER & GLASS EFFECT --- */
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 9999;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        /* Blurry glass look when sticky */
        .nav-root.scrolled {
          background: var(--nav-bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Initial transparent look (optional, or keep solid) */
        .nav-root:not(.scrolled) {
           background: rgba(11, 18, 32, 0.5); 
           backdrop-filter: blur(8px);
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

        /* --- LOGO STYLING --- */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          group;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          color: #38bdf8;
          font-size: 1.2rem;
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s ease;
        }

        .brand:hover .brand-icon {
          background: var(--accent-gradient);
          color: #fff;
          transform: rotate(-10deg);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }

        .brand-text {
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(90deg, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* --- DESKTOP NAVIGATION --- */
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
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 5px 0;
        }

        /* Active/Hover state */
        .nav-link:hover, .nav-link.active {
          color: #fff;
          text-shadow: 0 0 8px rgba(255,255,255,0.3);
        }

        /* Animated Underline */
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--accent-glow);
          transition: width 0.3s ease-in-out;
          box-shadow: 0 0 8px var(--accent-glow);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* --- BUTTON STYLING (Admin) --- */
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
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
          filter: brightness(1.1);
        }

        /* --- MOBILE TOGGLE --- */
        .toggler {
          display: none;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 0.5rem;
          transition: 0.3s;
        }
        .toggler:hover { color: var(--accent-glow); }

        /* --- MOBILE MENU PANEL --- */
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
          backdrop-filter: blur(20px);
        }

        .mobile-panel.open {
          max-height: 400px; /* Adjust based on content */
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }

        .mobile-link {
          display: block;
          padding: 1rem 1.5rem;
          color: #cbd5e1;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-weight: 500;
          transition: 0.2s;
        }

        .mobile-link:hover {
          background: rgba(255,255,255,0.05);
          color: var(--accent-glow);
          padding-left: 2rem; /* Slide effect */
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .toggler { display: block; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo Area */}
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <div className="brand-icon">
              {/* Using CSS shape/SVG for icon to avoid FontAwesome dependency issues */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <path d="M3 14h7v7H3z"></path>
              </svg>
            </div>
            <span className="brand-text">QR Ticket</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/generate" className="nav-link">Book Ticket</Link></li>
            <li><Link to="/gallery" className="nav-link">Gallery</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
            <li>
              <Link to="/login" className="nav-btn">
                Admin Panel
              </Link>
            </li>
          </ul>

          {/* Mobile Toggler */}
          <button 
            className="toggler" 
            onClick={() => setOpen(!open)}
            aria-label="Toggle Navigation"
          >
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

        {/* Mobile Dropdown */}
        <div className={`mobile-panel ${open ? "open" : ""}`}>
          <Link to="/" className="mobile-link" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/generate" className="mobile-link" onClick={() => setOpen(false)}>Book Ticket</Link>
          <Link to="/gallery" className="mobile-link" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/about" className="mobile-link" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/login" className="mobile-link" style={{color: '#38bdf8', fontWeight: 'bold'}} onClick={() => setOpen(false)}>
            Admin Login →
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;