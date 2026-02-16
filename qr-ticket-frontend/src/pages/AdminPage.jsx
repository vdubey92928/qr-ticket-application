import TicketGenerator from "../components/TicketGenerator";
import TicketTable from "../components/TicketTable";
import EntryLogTable from "../components/EntryLogTable";

function AdminPage() {

    return (
        <div className="container py-4">

            <h1 className="mb-4 text-center">Admin Dashboard</h1>

            {/* QUICK NAV BUTTONS */}
            <div className="d-flex justify-content-center gap-3 mb-5">
                <a href="/gate-scanner" className="btn btn-primary">
                    Open Gate Scanner
                </a>

                <a href="/museum-scanner" className="btn btn-warning">
                    Open Museum Scanner
                </a>
            </div>

            {/* TICKET GENERATION */}
            <section className="mb-5">
                <TicketGenerator />
            </section>

            {/* TICKET TABLE */}
            <section className="mb-5">
                <TicketTable />
            </section>

            {/* ENTRY LOGS */}
            <section>
                <EntryLogTable />
            </section>

        </div>
    );
}

export default AdminPage;
