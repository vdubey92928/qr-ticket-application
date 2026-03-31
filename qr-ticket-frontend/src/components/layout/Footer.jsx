


import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        :root {
          --footer-bg: #0b1221;
          --footer-text: #94a3b8;
          --footer-title: #f8fafc;
          --accent-glow: #3b82f6;
          --accent-gradient: linear-gradient(90deg, #3b82f6, #8b5cf6);
        }

        .footer-root {
          background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
          color: var(--footer-text);
          padding: 4rem 0 1.5rem 0;
          font-family: 'Inter', sans-serif;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        /* Top Glow Line Effect */
        .footer-root::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        /* --- COLUMNS & TITLES --- */
        .footer-col h5 {
          color: var(--footer-title);
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          position: relative;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Decorative underline for titles */
        .footer-col h5::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: var(--accent-gradient);
        }

        .footer-desc {
          line-height: 1.6;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          opacity: 0.8;
          max-width: 300px;
        }

        /* --- LINKS --- */
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.8rem;
        }

        .footer-link {
          color: var(--footer-text);
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .footer-link:hover {
          color: #38bdf8;
          transform: translateX(5px);
          text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
        }
        
        /* Hover Arrow */
        .footer-link::before {
          content: '›';
          opacity: 0;
          transform: translateX(-10px);
          transition: 0.3s;
          color: var(--accent-glow);
          font-weight: bold;
        }
        .footer-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        /* --- CONTACT / LOCATION --- */
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 1.2rem;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .contact-icon {
          color: var(--accent-glow);
          font-size: 1.2rem;
          margin-top: 2px;
          flex-shrink: 0; /* Icon shrink na ho */
        }

        /* --- SOCIAL ICONS --- */
        .social-icons {
          display: flex;
          gap: 1rem;
        }
        
        .social-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          transition: 0.3s;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .social-btn:hover {
          background: var(--accent-gradient);
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
          border-color: transparent;
        }

        /* --- BOTTOM BAR --- */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright { opacity: 0.7; }

        .legal-links a {
          color: var(--footer-text);
          margin-left: 1.5rem;
          text-decoration: none;
          font-size: 0.85rem;
          transition: 0.2s;
        }
        .legal-links a:hover { color: #fff; text-decoration: underline; }

        @media (max-width: 768px) {
          .footer-bottom { flex-direction: column; text-align: center; }
          .legal-links a { margin: 0 0.8rem; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="container">
          <div className="footer-grid">

            {/* 1. BRAND & DESCRIPTION */}
            <div className="footer-col">
              <h5>QR Ticket Generator</h5>
              <p className="footer-desc">
                Revolutionizing entry management with secure, fast, and eco-friendly QR ticketing for Rashtriya Prerna Sthal.
              </p>
              <div className="social-icons">
                <a href="#" className="social-btn" aria-label="GitHub">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="#" className="social-btn" aria-label="Twitter">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 14.307-14.257 0-.226-.002-.452-.014-.673.969-.694 1.8-1.56 2.462-2.548l-.047-.02z" /></svg>
                </a>
                <a href="#" className="social-btn" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>

            {/* 2. QUICK LINKS */}
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul className="footer-links">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/generate" className="footer-link">Generate Ticket</Link></li>
                <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
              </ul>
            </div>

            {/* 3. LOCATION & CONTACT */}
            <div className="footer-col">
              <h5>Find Us</h5>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>
                  <strong>Rashtriya Prerna Sthal</strong><br />
                  VVWG+WH, Lucknow,<br />
                  Uttar Pradesh 226003
                </span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 123 456 7890</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>helpdesk@prernasthal.com</span>
              </div>
            </div>

          </div>

          {/* BOTTOM COPYRIGHT */}
          <div className="footer-bottom">
            <span className="copyright">© 2026 QR Ticket Generator | All Rights Reserved.</span>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;