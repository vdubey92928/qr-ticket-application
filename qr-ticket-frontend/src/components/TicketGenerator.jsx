import { useState, useRef } from "react";
import axiosClient from "../api/axiosClient";
import TicketQrView from "./TicketQrView";

const GenerateTicket = () => {
    const [formData, setFormData] = useState({
        adults: 0,
        kids: 0,
        vehicleType: "",
    });
    const printRef = useRef();


    const [tickets, setTickets] = useState(null);

    // ---------------- HANDLE INPUT ----------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === "adults" || name === "kids"
                    ? Number(value)
                    : value,
        });
    };

    // ---------------- PRINT SINGLE TICKET ----------------
    const printTicket = () => {
        const printContent = printRef.current.outerHTML;
        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
        <html>
        <head>
            <title>Print Ticket</title>
            <style>
                @page {
                    margin: 0;
                }
                body {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 50vh;
                }
            </style>
        </head>
        <body>
            ${printContent}

            <script>
                const img = document.querySelector("img");

                // WAIT for QR image to load
                if (img.complete) {
                    triggerPrint();
                } else {
                    img.onload = triggerPrint;
                }

                function triggerPrint() {
                    setTimeout(() => {
                        window.print();
                        window.onafterprint = () => window.close();
                    }, 100);
                }
            </script>
        </body>
        </html>
    `);

        printWindow.document.close();
    };




    // ---------------- GENERATE MULTIPLE TICKETS ----------------
    const handleGenerate = async (e) => {
        e.preventDefault();

        const generatedTickets = {
            adult: [],
            kid: [],
            vehicle: null,
        };

        const time = Date.now();

        // Adult tickets
        for (let i = 0; i < formData.adults; i++) {
            const response = await axiosClient.post("/api/ticket/generate");
            generatedTickets.adult.push({
                id: response.data.id,
                type: "ADULT",
            });
        }

        // Kid tickets
        for (let i = 0; i < formData.kids; i++) {
            const response = await axiosClient.post("/api/ticket/generate");
            generatedTickets.kid.push({
                id: response.data.id,
                type: "KID",
            });
        }

        // Vehicle ticket (only one)
        if (formData.vehicleType) {
            const response = await axiosClient.post("/api/ticket/generate");
            generatedTickets.vehicle = {
                id: response.data.id,
                type: formData.vehicleType,
            };
        }

        setTickets(generatedTickets);

        // ✅ JSON PAYLOAD (for backend)
        const payload = {
            adult: formData.adults,
            kid: formData.kids,
            vehicle: formData.vehicleType || null,
        };

        console.log("JSON SENT TO BACKEND:", payload);
    };

    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-4">
                Generate QR Tickets
            </h2>

            {/* ================= FORM ================= */}
            {!tickets && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <form onSubmit={handleGenerate}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            No. of Adults (12+)
                                        </label>
                                        <input
                                            type="number"
                                            name="adults"
                                            min="0"
                                            className="form-control"
                                            value={formData.adults}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            No. of Kids (5+)
                                        </label>
                                        <input
                                            type="number"
                                            name="kids"
                                            min="0"
                                            className="form-control"
                                            value={formData.kids}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Vehicle Type (if any)
                                        </label>
                                        <select
                                            className="form-select"
                                            name="vehicleType"
                                            value={formData.vehicleType}
                                            onChange={handleChange}
                                        >
                                            <option value="">None</option>
                                            <option value="BIKE">Bike</option>
                                            <option value="CAR">Car</option>
                                            <option value="BUS">Bus</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={
                                            formData.adults + formData.kids === 0 &&
                                            !formData.vehicleType
                                        }
                                    >
                                        Generate Tickets
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= GENERATED TICKETS ================= */}
            {tickets && (
                <div className="mt-5">

                    {/* ADULT TICKETS */}
                    {tickets.adult.length > 0 && (
                        <>
                            <h4 className="fw-bold mb-3">
                                Adult Tickets ({tickets.adult.length})
                            </h4>
                            <div className="row g-3">

                                {tickets.adult.map((ticket) => (
                                    <div key={ticket.id} className="col-md-4">
                                        <div className="card text-center shadow-sm">
                                            <div className="card-body">
                                                {/* <h6>{ticket.type} Ticket </h6> */}
                                                {/* <p className="small">{ticket.id}</p> */}
                                                <div
                                                    className="d-flex align-items-center justify-content-center mb-2"
                                                    style={{ border: "1px dashed #ccc" }}
                                                >
                                                    <TicketQrView
                                                        ref={printRef}
                                                        ticket={ticket.id}
                                                        type={ticket.type}
                                                    />


                                                </div>
                                                <button
                                                    className="btn btn-outline-dark btn-sm"
                                                    onClick={() => printTicket(ticket)}
                                                >
                                                    Print
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* KID TICKETS */}
                    {tickets.kid.length > 0 && (
                        <>
                            <h4 className="fw-bold mt-5 mb-3">
                                Kid Tickets ({tickets.kid.length})
                            </h4>
                            <div className="row g-3">
                                {tickets.kid.map((ticket) => (
                                    <div key={ticket.id} className="col-md-4">
                                        <div className="card text-center shadow-sm">
                                            <div className="card-body">
                                                {/* <h6>{ticket.type} Ticket </h6> */}
                                                {/* <p className="small">{ticket.id}</p> */}
                                                <div
                                                    className="d-flex align-items-center justify-content-center mb-2"
                                                    style={{ border: "1px dashed #ccc" }}
                                                >
                                                    <TicketQrView
                                                        ref={printRef}
                                                        ticket={ticket.id}
                                                        type={ticket.type}
                                                    />


                                                </div>
                                                <button
                                                    className="btn btn-outline-dark btn-sm"
                                                    onClick={() => printTicket(ticket)}
                                                >
                                                    Print
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* VEHICLE TICKET */}
                    {tickets.vehicle && (
                        <>
                            <h4 className="fw-bold mt-5 mb-3">
                                Vehicle Ticket
                            </h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card text-center shadow-sm">
                                        <div className="card-body">
                                            <h6>{tickets.vehicle.type}</h6>
                                            <p className="small">{tickets.vehicle.id}</p>
                                            <div
                                                className="d-flex align-items-center justify-content-center mb-2"
                                                style={{ border: "1px dashed #ccc" }}
                                            >
                                                <TicketQrView
                                                    ref={printRef}
                                                    ticket={tickets.vehicle.id}
                                                    type={tickets.vehicle.type}
                                                />


                                            </div>
                                            <button
                                                className="btn btn-outline-dark btn-sm"
                                                onClick={() => printTicket(tickets.vehicle)}
                                            >
                                                Print
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            )
            }
        </div >
    );
};

export default GenerateTicket;





// import { useState } from "react";
// import axiosClient from "../api/axiosClient";
// import TicketQrView from "./TicketQrView";

// function TicketGenerator() {
//     const [ticketId, setTicketId] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const generateTicket = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axiosClient.post("/api/ticket/generate");
//             setTicketId(response.data.id);
//         } catch (err) {
//             setError("Failed to generate ticket");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h3>Generate Park Entry Ticket</h3>

//             <button onClick={generateTicket} disabled={loading}>
//                 {loading ? "Generating..." : "Generate Ticket"}
//             </button>

//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {/* {console.log("Ticket id", ticketId)} */}

//             {ticketId && <TicketQrView ticket={ticketId} />}
//         </div>
//     );
// }

// export default TicketGenerator;
