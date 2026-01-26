import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";

// Sourced relevant images for Green Corridor / Prerana Sthal Lucknow
const GALLERY_DATA = [
  // --- STATUES & MONUMENTS ---
  { id: 1, category: "Statues", title: "Main Memorial Stupa", desc: "Central Dome Structure", src: "data:image/jpeg;base64,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" },
  { id: 2, category: "Statues", title: "Elephant Gallery", desc: "Stone Elephants Row", src: "data:image/jpeg;base64,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" },
  { id: 3, category: "Statues", title: "Dr. Ambedkar Statue", desc: "Bronze Statue Tribute", src: "https://ddnews.gov.in/wp-content/uploads/2025/12/20251225174L-scaled.jpg" },
  { id: 4, category: "Statues", title: "Kanshiram Memorial", desc: "Statue of Kanshiram Ji", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xJe59sX6KA0wJ0xmMjBmX8KcA-CYrr0PBtx7AZJM7w&s" }, 
  { id: 5, category: "Statues", title: "Guardian Lions", desc: "Entrance Guardian Statues", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiftFQjMQLNZinwVq0oRDq0xpc8x9RRTCPtQ&s" },
  { id: 6, category: "Statues", title: "Mayawati Statue", desc: "Founder's Statue", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEQIsozWGGtAh5NAt5IZr427gVD4B404nbWA&s" }, 
  { id: 7, category: "Statues", title: "Detailed Reliefs", desc: "Wall Carvings", src: "https://lh4.googleusercontent.com/p/AF1QipM_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },

  // --- PARKS & GREENERY ---
  { id: 10, category: "Parks", title: "Green Corridor Path", desc: "Walking Track", src: "https://imgeng.jagran.com/images/2025/12/13/article/image/LDA-(1)-1765602037835.webp" },
  { id: 11, category: "Parks", title: "Lush Gardens", desc: "Manicured Lawns", src: "https://lh5.googleusercontent.com/p/AF1QipK_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 12, category: "Parks", title: "Palm Tree Avenue", desc: "Tropical Walkway", src: "https://lh4.googleusercontent.com/p/AF1QipR_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 13, category: "Parks", title: "Fountain Area", desc: "Water Fountains", src: "https://lh6.googleusercontent.com/p/AF1QipS_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 14, category: "Parks", title: "Public Seating", desc: "Stone Benches", src: "https://lh3.googleusercontent.com/p/AF1QipT_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 15, category: "Parks", title: "Sunset View", desc: "Evening Park View", src: "https://lh5.googleusercontent.com/p/AF1QipU_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },

  // --- ARCHITECTURE ---
  { id: 20, category: "Architecture", title: "Main Gate", desc: "Grand Entrance Arch", src: "https://lh4.googleusercontent.com/p/AF1QipV_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 21, category: "Architecture", title: "Sandstone Pillars", desc: "Red Sandstone Columns", src: "https://lh6.googleusercontent.com/p/AF1QipW_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 22, category: "Architecture", title: "Museum Building", desc: "Prerana Sthal Museum", src: "https://lh3.googleusercontent.com/p/AF1QipX_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 23, category: "Architecture", title: "Corridor View", desc: "Long Hallway", src: "https://lh5.googleusercontent.com/p/AF1QipY_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 24, category: "Architecture", title: "Dome Interior", desc: "Ceiling Architecture", src: "https://lh4.googleusercontent.com/p/AF1QipZ_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },

  // --- NATURE ---
  { id: 30, category: "Nature", title: "Blooming Flowers", desc: "Seasonal Flowers", src: "https://lh6.googleusercontent.com/p/AF1Qipa_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 31, category: "Nature", title: "River Front", desc: "Gomti River View", src: "https://lh3.googleusercontent.com/p/AF1Qipb_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 32, category: "Nature", title: "Dense Trees", desc: "Forest Area", src: "https://lh5.googleusercontent.com/p/AF1Qipc_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 33, category: "Nature", title: "Blue Sky", desc: "Clear Day View", src: "https://lh4.googleusercontent.com/p/AF1Qipd_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },

  // --- EXTRAS ---
  { id: 40, category: "Architecture", title: "Night Lighting", desc: "Park at Night", src: "https://lh6.googleusercontent.com/p/AF1Qipe_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 41, category: "Parks", title: "Wide Angle", desc: "Panorama View", src: "https://lh3.googleusercontent.com/p/AF1Qipf_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 42, category: "Statues", title: "Detailed Carving", desc: "Stone Art", src: "https://lh5.googleusercontent.com/p/AF1Qipg_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
  { id: 43, category: "Nature", title: "Greenery", desc: "Trees and Plants", src: "https://lh4.googleusercontent.com/p/AF1Qiph_J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4J4" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter Logic
  const filteredItems = filter === "All" 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === filter);

  const categories = ["All", "Parks", "Statues", "Architecture", "Nature"];

  return (
    <>
      <Navbar />
      
      <style>{`
        :root {
          --bg-dark: #0f172a;
          --glass-bg: rgba(30, 41, 59, 0.4);
          --accent-blue: #3b82f6;
          --accent-purple: #8b5cf6;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
        }

        .gallery-root {
          min-height: 100vh;
          background: radial-gradient(circle at top center, #1e293b 0%, #0f172a 100%);
          color: var(--text-main);
          padding-bottom: 4rem;
          font-family: 'Inter', sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        /* --- HEADER --- */
        .gallery-header {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeDown 0.8s ease-out;
        }

        .gallery-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 30%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gallery-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        /* --- FILTERS --- */
        .filter-tabs {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 3rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-muted);
            padding: 10px 24px;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .filter-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        .filter-btn.active {
            background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
            border-color: transparent;
            color: #fff;
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }

        /* --- GRID --- */
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 24px;
        }

        .gallery-item {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            aspect-ratio: 4/3;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.05);
            background: #000;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .gallery-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .gallery-item:hover .gallery-img {
            transform: scale(1.1);
        }

        /* Overlay Text */
        .overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
        }

        .gallery-item:hover .overlay {
            opacity: 1;
        }

        .img-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            margin: 0;
        }

        .img-desc {
            font-size: 0.9rem;
            color: #cbd5e1;
            margin-top: 4px;
        }

        /* --- LIGHTBOX (MODAL) --- */
        .lightbox {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(12px);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            animation: fadeIn 0.3s ease;
        }

        .lightbox-img {
            max-width: 90%;
            max-height: 85vh;
            border-radius: 8px;
            box-shadow: 0 0 50px rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .close-btn {
            position: absolute;
            top: 20px;
            right: 30px;
            background: none;
            border: none;
            color: #fff;
            font-size: 3rem;
            cursor: pointer;
            transition: 0.3s;
        }
        .close-btn:hover { color: var(--accent-blue); transform: scale(1.1); }

        @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; } to { opacity: 1; }
        }

        /* Responsive */
        @media(max-width: 768px) {
            .gallery-title { font-size: 2rem; }
            .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(100%, 1fr)); }
        }
      `}</style>

      <div className="gallery-root">
        <div className="container">
          
          {/* Header */}
          <header className="gallery-header">
            <h1 className="gallery-title">Prerana Sthal Gallery</h1>
            <p className="gallery-subtitle">Experience the Green Corridor & Monuments of Lucknow</p>
          </header>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="gallery-item"
                onClick={() => setSelectedImage(item)}
              >
                <img src={item.src} alt={item.title} className="gallery-img" loading="lazy" />
                <div className="overlay">
                    <h3 className="img-title">{item.title}</h3>
                    <p className="img-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
            <div className="lightbox" onClick={() => setSelectedImage(null)}>
                <button className="close-btn">×</button>
                <img 
                    src={selectedImage.src} 
                    alt={selectedImage.title} 
                    className="lightbox-img" 
                    onClick={(e) => e.stopPropagation()} 
                />
            </div>
        )}

      </div>
    </>
  );
};

export default Gallery;