import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../components/layout/Navbar";
import p1 from "../assets/gallery/p1.avif";
import p2 from "../assets/gallery/p2.jpeg";
import p3 from "../assets/gallery/p3.jpg";
import p4 from "../assets/gallery/p4.webp";
import p5 from "../assets/gallery/p5.avif";
import p6 from "../assets/gallery/p6.webp";
import About from "./About";

const Home = () => {
  return (
    <>
      <style>{`
        :root {
          --accent-1: #ff5f6d;
          --accent-2: #ffc371;
          --accent-3: #7f7fd5;
          --accent-4: #86a8e7;
          --text-color: #e6eefc;
          --text-muted: #cbd8f5;
          --card-bg: rgba(255, 255, 255, 0.04);
          --max-width: 1180px;
        }

        .home-root {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #fff;
          background: linear-gradient(180deg, #0f1724 0%, #071029 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        .container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 1rem;
        }

        /* --- HERO SLIDER --- */
        .hero-wrap {
          position: relative;
          height: 85vh; /* Increased height for better impact */
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        /* SLIDES ANIMATION */
        .slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0; 
          transform: scale(1.08);
          animation: slideFade 36s linear infinite; 
        }

        .slide.s1 { background-image: url("${p1}"); animation-delay: 0s; }
        .slide.s2 { background-image: url("${p2}"); animation-delay: 6s; }
        .slide.s3 { background-image: url("${p3}"); animation-delay: 12s; }
        .slide.s4 { background-image: url("${p4}"); animation-delay: 18s; }
        .slide.s5 { background-image: url("${p5}"); animation-delay: 24s; }
        .slide.s6 { background-image: url("${p6}"); animation-delay: 30s; }

        @keyframes slideFade {
          0%   { opacity: 0; transform: scale(1.08); }
          2%   { opacity: 1; transform: scale(1.04); }
          14%  { opacity: 1; transform: scale(1.0); }
          16%  { opacity: 0; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.08); }
        }

        /* Overlay */
        .carousel-dim {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 80%);
          z-index: 1;
        }

        /* --- MAJEDAR ANIMATED TEXT (CENTER) --- */
        .hero-title-wrap {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 0 1rem;
            /* Absolute Center */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%; 
            padding-bottom: 80px; /* Offset to make room for bottom button */
        }

        .animated-title {
            font-size: 4rem; /* Big Text */
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            /* Gradient Text */
            background: linear-gradient(to right, #fff 20%, #ffc371 40%, #ff5f6d 60%, #fff 80%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            /* Shine Animation */
            animation: shine 3s linear infinite, floatText 4s ease-in-out infinite;
            text-shadow: 0 0 30px rgba(255, 95, 109, 0.4);
            margin: 0;
            line-height: 1.1;
        }
        
        .animated-subtitle {
            font-size: 1.2rem;
            color: #cbd8f5;
            margin-top: 1rem;
            letter-spacing: 4px;
            font-weight: 500;
            text-transform: uppercase;
            opacity: 0;
            animation: fadeIn 1s ease-out 0.5s forwards;
        }

        @keyframes shine {
            to { background-position: 200% center; }
        }
        @keyframes floatText {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
            to { opacity: 1; transform: translateY(0); }
        }

        /* --- BUTTON (MIDDLE-BOTTOM) --- */
        .hero-button-wrap {
          position: absolute;
          z-index: 10;
          bottom: 15%; /* Positioned at bottom area */
          left: 50%;
          transform: translateX(-50%);
          width: auto;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 50px; /* Pill shape */
          font-weight: 800;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid rgba(255,255,255,0.2);
          
          /* Glassy Gradient */
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: #fff;
          
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          font-size: 1.1rem;
          overflow: hidden;
          position: relative;
        }
        
        /* Button Hover Glow */
        .hero-button:hover {
          transform: translateY(-5px) scale(1.05);
          background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
          color: #071029;
          box-shadow: 0 20px 50px rgba(255, 95, 109, 0.4);
          border-color: transparent;
        }

        /* --- SHAPES --- */
        .shape {
          position: absolute;
          z-index: 2;
          filter: blur(25px);
          opacity: 0.3;
        }
        .shape.sA {
          width: 150px; height: 150px; 
          background: var(--accent-1);
          top: 15%; left: 10%;
          animation: floatA 8s ease-in-out infinite;
        }
        .shape.sB {
          width: 200px; height: 200px; 
          background: var(--accent-3);
          bottom: 20%; right: 10%;
          animation: floatB 10s ease-in-out infinite;
        }

        @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px, -20px); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px, 20px); } }

        /* Responsive */
        @media (max-width: 768px) {
            .animated-title { font-size: 2.2rem; }
            .hero-button-wrap { bottom: 12%; width: 90%; text-align: center; }
            .hero-button { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="home-root">
        <Navbar />

        <main>
          {/* HERO */}
          <section className="hero-wrap" aria-label="Hero">
            
            {/* 1. SLIDER BACKGROUND */}
            <div className="slide s1" />
            <div className="slide s2" />
            <div className="slide s3" />
            <div className="slide s4" />
            <div className="slide s5" />
            <div className="slide s6" />

            <div className="carousel-dim" />

            {/* 2. DECORATIVE SHAPES */}
            <div className="shape sA" />
            <div className="shape sB" />

            {/* 3. CENTERED ANIMATED TEXT */}
            <div className="hero-title-wrap">
                <h1 className="animated-title">
                    RASHTRIYA<br />PRERANA STHAL
                </h1>
                <p className="animated-subtitle">Lucknow's Pride • Symbol of Justice</p>
            </div>

            {/* 4. BUTTON (MIDDLE-BOTTOM) */}
            <div className="hero-button-wrap">
              <Link to="/generate" className="hero-button" role="button" aria-label="Book Ticket">
                <span>🎫 Book Your Ticket</span>
              </Link>
            </div>

          </section>

          {/* HOW IT WORKS */}
          <div id="about-section">
            <About/>
          </div>
          {/* <section className="section-padding">
            <div className="container">
              <h2 className="section-title">How It Works</h2>
              <div className="grid-cards">
                <div className="card">
                  <h4>1. Enter Details</h4>
                  <p>Fill out the ticket form with attendee information and submit the request securely.</p>
                </div>
                <div className="card">
                  <h4>2. Generate QR</h4>
                  <p>A unique, encrypted QR code is instantly created and assigned to the specific ticket.</p>
                </div>
                <div className="card">
                  <h4>3. Scan & Validate</h4>
                  <p>Staff scan the QR code at entry points to validate access and log attendance in real-time.</p>
                </div>
              </div>
            </div>
          </section> */}

          {/* FEATURES */}
          <section className="section-padding">
            <div className="container">
              <h2 className="section-title">Key Features</h2>
              <div className="grid-cards">
                <div className="card">
                  <h4>Secure QR</h4>
                  <p>Advanced encryption payloads prevent forgery and ensure ticket authenticity.</p>
                </div>
                <div className="card">
                  <h4>Real-time Tracking</h4>
                  <p>Live dashboard logs for every scan, giving you instant attendee insights.</p>
                </div>
                <div className="card">
                  <h4>Easy Integrations</h4>
                  <p>Compatible with handheld scanners and standard mobile camera browsers.</p>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "3rem" }}>
                <Link to="/generate" className="hero-button" style={{ fontSize: "1rem", padding: "12px 24px" }}>
                  Get Started — It's Free
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;