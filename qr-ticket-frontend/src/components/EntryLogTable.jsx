import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function EntryLogTable() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/api/admin/entry-logs")
            .then((res) => setLogs(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading entry logs...</p>;

    return (
        <div style={{ marginTop: "30px" }}>
            <h3>Entry Logs</h3>

            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Scan Result</th>
                        <th>Scanned At</th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.ticket.id}</td>
                            <td>{log.scanResult}</td>
                            <td>{log.scannedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EntryLogTable;
