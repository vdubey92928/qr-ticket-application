import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import ContactUs from "../pages/ContactUs";

import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";

import TicketGenerator from "../components/TicketGenerator";
import GateScanner from "../components/GateScanner";
import MuseumScanner from "../components/MuseumScanner";

function AppRouter() {
    return (
        <Routes>

            {/* PUBLIC PAGES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* STAFF LOGIN */}
            <Route path="/login" element={<LoginPage />} />

            {/* ADMIN DASHBOARD */}
            <Route path="/admin" element={<AdminPage />} />

            {/* TICKET GENERATION */}
            <Route path="/generate" element={<TicketGenerator />} />

            {/* SCANNER DEVICES */}
            <Route path="/gate-scanner" element={<GateScanner />} />
            <Route path="/museum-scanner" element={<MuseumScanner />} />

        </Routes>
    );
}

export default AppRouter;
