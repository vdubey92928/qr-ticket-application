import React, { useState, useRef } from "react";
import axiosClient from "../api/axiosClient";
import TicketQrView from "./TicketQrView";
import Navbar from "./layout/Navbar";
import img from "../assets/gallery/p1.avif"

const GenerateTicket = () => {
    const ticketRefs = useRef({});

    const [formData, setFormData] = useState({
        adults: 0,
        kids: 0,
    });

    const [tickets, setTickets] = useState(null);
    const [loading, setLoading] = useState(false);

    // ---------------- HANDLE INPUT ----------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validation: Negative number allow mat karo
        const val = Number(value);
        if (val < 0) return;

        setFormData({
            ...formData,
            [name]: val,
        });
    };

    // ---------------- PRINT SINGLE TICKET ----------------
    const printTicket = (ticketId) => {
        const ref = ticketRefs.current[ticketId];
        if (!ref) return;

        const printContent = ref.outerHTML;
        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
            <head>
              <title>Print Ticket #${ticketId}</title>
              <style>
                @page { size: auto; margin: 0; }
                body { margin: 20px; display: flex; justify-content: center; }
              </style>
            </head>
            <body>
              ${printContent}
              <script>
                const img = document.querySelector("img");
                if(img) {
                    img.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); };
                    img.onerror = () => { setTimeout(() => { window.print(); window.close(); }, 500); };
                } else {
                    setTimeout(() => { window.print(); window.close(); }, 500);
                }
              </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    // ---------------- GENERATE TICKETS ----------------
    const handleGenerate = async (e) => {
        e.preventDefault();

        // 1. Validation Logic
        if (Number(formData.adults) === 0 && Number(formData.kids) === 0) {
            alert("Please select at least 1 Adult or Kid.");
            return;
        }

        setLoading(true);
        setTickets(null); // Reset purane tickets

        const generatedTickets = {
            adult: [],
            kid: [],
        };

        try {

            const payload = {
                adult: Number(formData.adults),
                kid: Number(formData.kids),
            };

            // API CALL
            const response = await axiosClient.post("/api/ticket/generate", payload);

            console.log(response.data[0].qrImage);

            // 2. Data Extraction Logic (Safe Parsing)
            let apiData = [];
            if (Array.isArray(response.data)) {
                apiData = response.data;
            } else if (response.data && Array.isArray(response.data.data)) {
                apiData = response.data.data;
            } else if (response.data && Array.isArray(response.data.tickets)) {
                apiData = response.data.tickets;
            }

            // 3. Mapping API Data
            if (apiData.length > 0) {
                let index = 0;
                for (let i = 0; i < payload.adult; i++) {
                    if (apiData[index]) {
                        generatedTickets.adult.push({ ...apiData[index++], type: 'ADULT' });

                    }
                }
                for (let i = 0; i < payload.kid; i++) {
                    if (apiData[index]) {
                        generatedTickets.kid.push({ ...apiData[index++], type: 'KID' });

                    }
                }
                setTickets(generatedTickets);
            } else {
                throw new Error("Empty Data");
            }

        } catch (error) {
            console.warn("API Issue, using Demo Data.", error);
            window.alert("Ticket Generation failed");

            setTickets(null);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-root">
            <Navbar />
            <style>{`
                :root { --bg-dark: #0f172a; --text-primary: #f1f5f9; }
                .page-root { min-height: 100vh; background: radial-gradient(circle at top center, #1e293b 0%, #0f172a 100%); color: white; padding-bottom: 4rem; }
                .container { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }
                .form-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 15px; max-width: 500px; margin: 2rem auto; }
                .custom-input { width: 100%; padding: 10px; background: rgba(0,0,0,0.3); border: 1px solid #444; color: white; border-radius: 5px; margin-bottom: 1rem; }
                .btn-generate { width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
                .ticket-grid { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 20px; }
                .section-title { font-size: 1.5rem; margin: 2rem 0 1rem; border-left: 5px solid #3b82f6; padding-left: 10px; }
                .print-btn { background: #fff; color: black; border: none; padding: 5px 10px; width: 100%; margin-top: 5px; cursor: pointer; font-weight: bold; }
            `}</style>

            <div className="container">
                {/* FORM */}
                {!tickets && (
                    <div className="form-card">
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Ticket Counter</h2>
                        <form onSubmit={handleGenerate}>
                            <label>Adults (12+)</label>
                            <input type="number" name="adults" min="0" className="custom-input" value={formData.adults} onChange={handleChange} />

                            <label>Kids (5-11)</label>
                            <input type="number" name="kids" min="0" className="custom-input" value={formData.kids} onChange={handleChange} />

                            <button type="submit" className="btn-generate" disabled={loading}>
                                {loading ? "Processing..." : "Generate Tickets"}
                            </button>
                        </form>
                    </div>
                )}

                {/* RESULTS */}
                {tickets && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <h2>Generated Tickets</h2>
                            <button onClick={() => setTickets(null)} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 15px', cursor: 'pointer' }}>Back</button>
                        </div>

                        {/* ADULT SECTION */}
                        {tickets.adult.length > 0 && (
                            <div>
                                <h3 className="section-title">Adult Tickets</h3>
                                <div className="ticket-grid">
                                    {tickets.adult.map((ticket, i) => (

                                        <div key={i}>
                                            <TicketQrView ref={(el) => (ticketRefs.current[ticket.id] = el)} ticketData={ticket} count={i + 1} />
                                            <button className="print-btn" onClick={() => printTicket(ticket.id)}>Print</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* KID SECTION */}
                        {tickets.kid.length > 0 && (
                            <div>
                                <h3 className="section-title" style={{ borderColor: 'pink' }}>Kids Tickets</h3>
                                <div className="ticket-grid">
                                    {tickets.kid.map((ticket, i) => (
                                        <div key={i}>
                                            <TicketQrView ref={(el) => (ticketRefs.current[ticket.id] = el)} ticketData={ticket} count={i + 1} />
                                            <button className="print-btn" onClick={() => printTicket(ticket.id)}>Print</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateTicket;