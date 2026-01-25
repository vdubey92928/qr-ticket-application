import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter from imports
import AdminPage from "../pages/AdminPage";
import GatePage from "../pages/GatePage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import TicketGenerator from "../components/TicketGenerator";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gate" element={<GatePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/generate" element={<TicketGenerator />} />
        </Routes>
    );
}

export default AppRouter;