import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function TicketTable() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/api/admin/tickets")
            .then(res => setTickets(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-4">Loading tickets...</p>;

    const getStateColor = (state) => {
        switch (state) {
            case "ACTIVE": return "#0d6efd";
            case "COMPLETED": return "#198754";
            case "EXPIRED": return "#dc3545";
            default: return "#6c757d";
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">All Tickets</h3>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Visit Date</th>
                        <th>Type</th>
                        <th>Valid For</th>
                        <th>Gate Scan</th>
                        <th>Museum Scan</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td style={{ fontSize: 12 }}>{ticket.id}</td>

                            <td>
                                {new Date(ticket.visitDate).toLocaleDateString("en-GB")}
                            </td>

                            <td>{ticket.type}</td>

                            <td>{ticket.ticketValidFor}</td>

                            <td>
                                {ticket.gateScanned
                                    ? "✔️ Scanned"
                                    : "❌ Pending"}
                            </td>

                            <td>
                                {ticket.museumScanned
                                    ? "✔️ Scanned"
                                    : "❌ Pending"}
                            </td>

                            <td>
                                <span
                                    style={{
                                        color: "#fff",
                                        padding: "4px 10px",
                                        borderRadius: "8px",
                                        background: getStateColor(ticket.state)
                                    }}
                                >
                                    {ticket.state}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketTable;
