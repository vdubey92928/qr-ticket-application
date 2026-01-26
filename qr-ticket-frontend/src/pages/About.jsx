import React, { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <>
      
      <style>{`
        :root {
          --bg-dark: #0f172a;
          --glass-bg: rgba(30, 41, 59, 0.4);
          --glass-border: rgba(255, 255, 255, 0.08);
          --accent-blue: #3b82f6;
          --accent-purple: #8b5cf6;
          --accent-gradient: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --max-width: 1200px;
        }

        .about-root {
          font-family: 'Inter', sans-serif;
          color: var(--text-main);
          background: radial-gradient(circle at top center, #1e293b 0%, #0f172a 100%);
          min-height: 100vh;
          padding-bottom: 4rem;
          overflow-x: hidden;
        }

        .container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        /* --- HERO SECTION --- */
        .hero-section {
          text-align: center;
          padding: 4rem 0;
          animation: fadeDown 1s ease-out;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }

        .hero-tagline {
          font-size: 1.25rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.6;
        }

        .hero-image-wrap {
          width: 100%;
          height: 350px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 4rem;
          border: 1px solid var(--glass-border);
          box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5);
          position: relative;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .hero-image-wrap:hover .hero-img { transform: scale(1.03); }

        .overlay-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #0f172a 0%, transparent 100%);
        }

        /* --- BUTTONS --- */
        .btn-group { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; }

        .btn {
          padding: 12px 28px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn.primary {
          background: var(--accent-gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }
        .btn.primary:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6); }

        .btn.outline {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
        }
        .btn.outline:hover { background: rgba(255,255,255,0.1); border-color: white; }


        /* --- CONTENT SECTIONS --- */
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          transition: transform 0.3s;
        }

        .glass-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.15); }

        .section-title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #fff;
          border-left: 5px solid var(--accent-blue);
          padding-left: 1rem;
        }

        .two-col {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-list li {
          margin-bottom: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .feature-list li::before {
          content: '✓';
          color: var(--accent-blue);
          font-weight: bold;
        }

        /* --- ATTRACTIONS GRID --- */
        .attractions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .attraction-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--glass-border);
          padding: 1.5rem;
          border-radius: 12px;
          transition: 0.3s;
        }
        .attraction-card:hover {
          background: rgba(255,255,255,0.06);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .attraction-card h4 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #fff; }
        .attraction-card p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; }

        /* --- VISIT INFO --- */
        .visit-box {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 16px;
          padding: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .info-item h3 { color: #fff; margin-bottom: 0.5rem; font-size: 1.1rem; }
        .info-item p { color: #cbd5e1; font-size: 0.9rem; }

        /* --- FAQ SECTION --- */
        .faq-container { max-width: 800px; margin: 0 auto 4rem auto; }
        
        .faq-item {
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 1rem;
        }

        .faq-btn {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 1.2rem 0;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: color 0.3s;
        }
        .faq-btn:hover { color: var(--accent-blue); }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          color: var(--text-muted);
          line-height: 1.6;
          transition: max-height 0.3s ease-out, padding 0.3s ease;
        }
        
        .faq-answer.open {
          max-height: 200px; /* limit */
          padding-bottom: 1.5rem;
        }

        /* --- CTA BOTTOM --- */
        .cta-bottom {
          text-align: center;
          padding: 3rem;
          background: var(--glass-bg);
          border-radius: 20px;
          border-top: 2px solid var(--accent-blue);
        }

        @keyframes fadeDown { from { opacity:0; transform: translateY(-20px); } to { opacity:1; transform:translateY(0); } }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.2rem; }
          .two-col { grid-template-columns: 1fr; }
          .hero-image-wrap { height: 220px; }
        }
      `}</style>

      <div className="about-root">
        <div className="container">

          {/* HERO */}
          <header className="hero-section">
            <h1 className="hero-title">About Rashtriya Prerna Sthal</h1>
            <p className="hero-tagline">
              A monumental tribute to social justice, history, and architectural brilliance on the banks of the Gomti River.
            </p>

            <div className="btn-group">
              <Link className="btn primary" to="/generate">🎫 Plan Your Visit</Link>
              <Link className="btn outline" to="/gallery">📸 View Gallery</Link>
            </div>

            <div className="hero-image-wrap">
              {/* Using a high-quality Unsplash image as placeholder for the park */}
              <img 
                src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop" 
                alt="Prerna Sthal View" 
                className="hero-img" 
              />
              <div className="overlay-grad"></div>
            </div>
          </header>

          {/* MAIN CONTENT SPLIT */}
          <section className="two-col">
            <div className="glass-card">
              <h2 className="section-title">History & Significance</h2>
              <p style={{ lineHeight: '1.8', color: '#cbd5e1', marginBottom: '1rem' }}>
                Conceived as a landmark public space, <strong>Rashtriya Prerna Sthal</strong> transformed reclaimed land into a cultural park that blends art, history, and environmental renewal. 
                It stands as a symbol of pride for Lucknow, honoring the ideals and legacy of national leaders through monumental sculptures and iconic architecture.
              </p>
              <p style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
                The site serves as both a memorial and a vibrant public space, hosting exhibitions, educational programs, and community events that celebrate our rich heritage.
              </p>
            </div>

            <div className="glass-card">
              <h3 style={{fontSize:'1.3rem', marginBottom:'1rem', color:'#fff'}}>Key Highlights</h3>
              <ul className="feature-list">
                <li>Monumental Bronze Sculptures</li>
                <li>Interactive Museum Galleries</li>
                <li>Lush Green Walking Trails</li>
                <li>Evening Light & Sound Show</li>
                <li>Riverside Sunset Views</li>
              </ul>
            </div>
          </section>

          {/* ATTRACTIONS */}
          <section>
            <h2 className="section-title text-center">Visitor Experience</h2>
            <div className="attractions-grid">
              <div className="attraction-card">
                <h4>🏛 The Museum</h4>
                <p>Explore multimedia galleries featuring biographies, historical archives, and interactive digital exhibits.</p>
              </div>
              <div className="attraction-card">
                <h4>🐘 Statue Gallery</h4>
                <p>Walk through the grand corridor lined with majestic stone elephants and bronze statues of leaders.</p>
              </div>
              <div className="attraction-card">
                <h4>🌳 Green Corridor</h4>
                <p>Relax in the manicured gardens, open-air plazas, and water features designed for peace and reflection.</p>
              </div>
            </div>
          </section>

          {/* VISIT INFO BOX */}
          <section className="visit-box">
            <div className="info-item">
              <h3>🕒 Opening Hours</h3>
              <p>11:00 AM – 8:00 PM (Daily)</p>
              <p style={{fontSize:'0.8rem', opacity:0.7}}>(Closed on Mondays)</p>
            </div>
            <div className="info-item">
              <h3>📍 Location</h3>
              <p>Gomti Riverfront, Near Hardoi Road</p>
              <p>Lucknow, Uttar Pradesh</p>
            </div>
            <div className="info-item">
              <h3>💡 Travel Tip</h3>
              <p>Best time to visit is evening (4 PM - 7 PM) to witness the sunset and lighting effects.</p>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="faq-container">
            <h2 className="section-title" style={{textAlign:'center', border:'none'}}>Frequently Asked Questions</h2>

            {[
              {
                q: "Are guided tours available?",
                a: "Yes, official guided tours are available for groups and schools. Please check the ticket counter for daily schedules."
              },
              {
                q: "Is photography allowed?",
                a: "Photography is allowed in all outdoor areas and the main plaza. However, flash photography is restricted inside the museum galleries."
              },
              {
                q: "Is the park wheelchair accessible?",
                a: "Absolutely. The entire complex, including ramps, restrooms, and museum entry, is designed to be wheelchair friendly."
              },
              {
                q: "Is there parking facility?",
                a: "Yes, there is a dedicated parking lot for both two-wheelers and four-wheelers near the main entrance gate."
              }
            ].map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-btn"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <span style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }}>
                    ▼
                  </span>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  {item.a}
                </div>
              </div>
            ))}
          </section>

          {/* BOTTOM CTA */}
          <section className="cta-bottom">
            <h3 style={{fontSize:'1.8rem', marginBottom:'1rem'}}>Ready to Experience History?</h3>
            <p style={{color:'var(--text-muted)', marginBottom:'2rem'}}>Book your tickets online to skip the queue and get direct access.</p>
            <Link to="/generate" className="btn primary" style={{padding:'16px 40px', fontSize:'1.1rem'}}>
              Book Tickets Now
            </Link>
          </section>

        </div>
      </div>
    </>
  );
};

export default About;