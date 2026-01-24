import TicketGenerator from "../components/TicketGenerator";
import TicketTable from "../components/TicketTable";
import EntryLogTable from "../components/EntryLogTable";
import { useState } from "react";
import GateScanner from "../components/GateScanner";

function AdminPage() {
    const [isvalidating, setIsValidateing] = useState(false);
    return (
        <div style={{ padding: "20px" }}>
            {isvalidating && (
                <>
                    <button onClick={() => setIsValidateing(false)}>stop validate Ticket</button>
                    <GateScanner />
                </>
            )}
            {!isvalidating &&
                <button onClick={() => setIsValidateing(true)}>ticket validation </button>
            }

            <h2>Admin Dashboard</h2>

            {/* SECTION 1: Ticket Generation */}
            <section style={{ marginBottom: "40px" }}>
                <TicketGenerator />
            </section>

            {/* SECTION 2: Tickets Table */}
            <section style={{ marginBottom: "40px" }}>
                <TicketTable />
            </section>

            {/* SECTION 3: Entry Logs */}
            <section>
                <EntryLogTable />
            </section>
        </div>
    );
}

export default AdminPage;
