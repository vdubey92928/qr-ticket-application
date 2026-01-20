import TicketGenerator from "../components/TicketGenerator";
import TicketTable from "../components/TicketTable";
import EntryLogTable from "../components/EntryLogTable";

function AdminPage() {
    return (
        <div style={{ padding: "20px" }}>
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
