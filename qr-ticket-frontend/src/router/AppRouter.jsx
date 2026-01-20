import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import GatePage from "../pages/GatePage";
import LoginPage from "../pages/LoginPage";
import BaseLayout from "../components/layout/BaseLayout";
import Home from "../pages/Home";
import TicketGenerator from "../components/TicketGenerator";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gate" element={<GatePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/generate" element={<TicketGenerator />} />
                {/* <Route path="/login" element={<LoginPage />} /> */}

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
