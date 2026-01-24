import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import TicketQrView from "./TicketQrView";
// import TicketQrView from "../components/TicketQrView";

function TicketTable() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/api/admin/tickets")
            .then((res) => setTickets(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading tickets...</p>;

    return (
        <div>
            <h3>Tickets</h3>

            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Visit Date</th>
                        <th>Type</th>
                        <th>Used</th>
                        {/* <th>View QR</th> */}
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.visitDate}</td>
                            <td>{ticket.type}</td>
                            <td>{ticket.used ? "YES" : "NO"}</td>
                            {/* <td><TicketQrView tick={ticket.id} /> </td> */}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketTable;
