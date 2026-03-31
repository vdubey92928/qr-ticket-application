import React, { useState, useRef } from "react";
import axiosClient from "../api/axiosClient";
import TicketQrView from "./TicketQrView";

const GenerateTicket = () => {

    const ticketRefs = useRef({});

    const [formData, setFormData] = useState({
        adults: 0,
        kids: 0,
        validFor: "BOTH",
        visitDate: ""
    });

    const [tickets, setTickets] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "adults" || name === "kids") {
            const val = Number(value);
            if (val < 0) return;
            setFormData(prev => ({ ...prev, [name]: val }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const printTicket = (ticketId) => {
        const ref = ticketRefs.current[ticketId];
        if (!ref) return;

        const printWindow = window.open("", "_blank");
        printWindow.document.write(ref.outerHTML);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 500);
    };

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (!formData.visitDate) {
            alert("Please select visit date");
            return;
        }

        if (formData.adults === 0 && formData.kids === 0) {
            alert("Select at least 1 Adult or Kid");
            return;
        }

        setLoading(true);
        setTickets(null);

        try {
            const payload = {
                adult: Number(formData.adults),
                kid: Number(formData.kids),
                validFor: formData.validFor,
                visitDate: formData.visitDate   // 🔥 NEW
            };

            const response = await axiosClient.post("/api/ticket/generate", payload);
            const apiData = response.data;

            const generatedTickets = { adult: [], kid: [] };
            let index = 0;

            for (let i = 0; i < payload.adult; i++)
                generatedTickets.adult.push(apiData[index++]);

            for (let i = 0; i < payload.kid; i++)
                generatedTickets.kid.push(apiData[index++]);

            setTickets(generatedTickets);

        } catch (err) {
            console.error(err);
            alert("Ticket generation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark min-vh-100 py-5">
            <div className="container">

                {!tickets && (
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">

                            <div className="card bg-dark text-light shadow-lg border-secondary">
                                <div className="card-body p-4">

                                    <h3 className="text-center mb-4 text-info fw-bold">
                                        🎟 Generate Ticket
                                    </h3>

                                    <form onSubmit={handleGenerate}>

                                        <div className="mb-3">
                                            <label>Adults</label>
                                            <input type="number" name="adults"
                                                className="form-control"
                                                onChange={handleChange} />
                                        </div>

                                        <div className="mb-3">
                                            <label>Kids</label>
                                            <input type="number" name="kids"
                                                className="form-control"
                                                onChange={handleChange} />
                                        </div>

                                        {/* 🔥 NEW DATE FIELD */}
                                        <div className="mb-3">
                                            <label>Visit Date</label>
                                            <input
                                                type="date"
                                                name="visitDate"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.visitDate}
                                                required
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label>Ticket Valid For</label>
                                            <select
                                                name="validFor"
                                                className="form-select"
                                                value={formData.validFor}
                                                onChange={handleChange}
                                            >
                                                <option value="GATE">Gate Only</option>
                                                <option value="MUSEUM">Museum Only</option>
                                                <option value="BOTH">Gate + Museum</option>
                                            </select>
                                        </div>

                                        <button className="btn btn-info w-100" disabled={loading}>
                                            {loading ? "Generating..." : "Generate Tickets"}
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {tickets && (
                    <div className="text-white">
                        <h2 className="mb-4">Generated Tickets</h2>
                        <button className="btn btn-outline-light mb-4" onClick={() => setTickets(null)}>← Back</button>

                        <div className="row g-4">
                            {[...tickets.adult, ...tickets.kid].map((ticket, i) => (
                                <div className="col-md-4" key={i}>
                                    <div className="card shadow">
                                        <div className="card-body text-center">
                                            <TicketQrView
                                                ref={(el) => (ticketRefs.current[ticket.id] = el)}
                                                ticketData={ticket}
                                                count={i + 1}
                                            />
                                            <button
                                                className="btn btn-dark w-100 mt-3"
                                                onClick={() => printTicket(ticket.id)}
                                            >
                                                🖨 Print Ticket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default GenerateTicket;
