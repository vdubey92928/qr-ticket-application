import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function EntryLogTable() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/api/admin/entry-logs")
            .then(res => setLogs(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-4">Loading entry logs...</p>;

    const getResultColor = (result) => {
        switch (result) {
            case "VALID": return "#198754";
            case "EXPIRED": return "#dc3545";
            case "ALREADY_SCANNED": return "#6c757d";
            case "WRONG_LOCATION": return "#fd7e14";
            case "GATE_FIRST_REQUIRED": return "#0d6efd";
            default: return "#6c757d";
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Entry Logs</h3>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Ticket ID</th>
                        <th>Ticket Type</th>
                        <th>Location</th>
                        <th>Scan Result</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map(log => (
                        <tr key={log.id}>
                            <td style={{ fontSize: 12 }}>{log.ticket.id}</td>
                            <td>{log.ticketType}</td>
                            <td>{log.location}</td>

                            <td>
                                <span
                                    style={{
                                        color: "#fff",
                                        padding: "4px 10px",
                                        borderRadius: "8px",
                                        background: getResultColor(log.scanResult)
                                    }}
                                >
                                    {log.scanResult}
                                </span>
                            </td>

                            <td>
                                {new Date(log.scannedAt).toLocaleString("en-GB")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EntryLogTable;
