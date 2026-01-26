import { useState, useRef } from "react";
import axiosClient from "../api/axiosClient";
import TicketQrView from "./TicketQrView";
import './../assets/css/ticket.css'
import Navbar from "./layout/Navbar";

const GenerateTicket = () => {

    const ticketRefs = useRef({});


    const [formData, setFormData] = useState({
        adults: 0,
        kids: 0,
    });



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
    const printTicket = (ticketId) => {
        const ref = ticketRefs.current[ticketId];
        if (!ref) return;

        const printContent = ref.outerHTML;
        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
    <html>
    <head>
      <title>Print Ticket</title>
      <style>
        @page { margin: 0; }
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

        const payload = {
            adult: formData.adults,
            kid: formData.kids,
        };

        const response = await axiosClient.post("/api/ticket/generate", payload);
        const data = response.data; // ARRAY

        const generatedTickets = {
            adult: [],
            kid: [],
        };

        let index = 0;

        for (let i = 0; i < formData.adults; i++) {
            generatedTickets.adult.push(data[index++]);
        }

        for (let i = 0; i < formData.kids; i++) {
            generatedTickets.kid.push(data[index++]);
        }

        setTickets(generatedTickets);
    };


    return (
        <div className="container-fluid py-5">
            <Navbar />


            {/* ================= FORM ================= */}
            {!tickets && (
                <div className="row justify-content-center">
                    <h2 className="text-center fw-bold mb-4">
                        Generate QR Tickets
                    </h2>
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
                                            className="form-control"
                                            value={formData.kids}
                                            onChange={handleChange}
                                        />
                                    </div>


                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={
                                            formData.adults + formData.kids === 0
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
                    {tickets.adult.map((ticket) => (
                        <div className="row">
                            <div key={ticket.id} className="col-md-4 mx-auto">
                                <div className="card text-center shadow-sm">
                                    <div className="card-body">

                                        <div
                                            className="d-flex align-items-center justify-content-center mb-2"
                                            style={{ border: "1px dashed #ccc" }}
                                        >
                                            <TicketQrView
                                                ref={(el) => (ticketRefs.current[ticket.id] = el)}
                                                ticketData={ticket}
                                            />
                                        </div>

                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() => window.alert("Abhi implement krna h iska logic")}
                                        >
                                            Print
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    {/* KID TICKETS */}
                    {tickets.kid.map((ticket) => (
                        <div className="row">
                            <div key={ticket.id} className="col-md-4 mx-auto">
                                <div className="card text-center shadow-sm">
                                    <div className="card-body">

                                        <div
                                            className="d-flex align-items-center justify-content-center mb-2"
                                            style={{ border: "1px dashed #ccc" }}
                                        >
                                            <TicketQrView
                                                ref={(el) => (ticketRefs.current[ticket.id] = el)}
                                                ticketData={ticket}
                                            />
                                        </div>

                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() => window.alert("Abhi implement krna h iska logic")}
                                        >
                                            Print
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    {/* VEHICLE TICKET */}


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
