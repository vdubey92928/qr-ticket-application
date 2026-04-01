import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import Home from "../pages/Home";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import ContactUs from "../pages/ContactUs";

import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";

import TicketGenerator from "../components/TicketGenerator";
import GateScanner from "../components/GateScanner";
import MuseumScanner from "../components/MuseumScanner";

import { isTokenValid, getRole } from "../util/authStorage";


const HomeRedirect = () => {

    if (!isTokenValid()) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole");
        return <Home />;
    }

    const role = getRole();

    if (role === "ADMIN") return <Navigate to="/admin" />;
    if (role === "GATE") return <Navigate to="/gate-scanner" />;
    if (role === "MUSEUM") return <Navigate to="/museum-scanner" />;

    return <Home />;
};


// PRIVATE ROUTE 
const PrivateRoute = ({ children }) => {
    return isTokenValid() ? children : <Navigate to="/" />;
};


function AppRouter() {
    //auto logout on token expiry
    useEffect(() => {

        const token = localStorage.getItem("jwtToken");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);

            const expiryTime = decoded.exp * 1000;
            const timeout = expiryTime - Date.now();

            console.log("⏳ Auto logout in:", timeout);

            if (timeout > 0) {
                setTimeout(() => {
                    console.log("🔥 Auto logout triggered");
                    localStorage.clear();
                    window.location.href = "/";
                }, timeout);
            } else {
                localStorage.clear();
                window.location.href = "/";
            }

        } catch (error) {
            localStorage.clear();
            window.location.href = "/";
        }

    }, []);


    return (
        <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* LOGIN */}
            <Route path="/login" element={<LoginPage />} />

            {/* PROTECTED ROUTES */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminPage />
                    </PrivateRoute>
                }
            />

            <Route
                path="/gate-scanner"
                element={
                    <PrivateRoute>
                        <GateScanner />
                    </PrivateRoute>
                }
            />

            <Route
                path="/museum-scanner"
                element={
                    <PrivateRoute>
                        <MuseumScanner />
                    </PrivateRoute>
                }
            />


            <Route
                path="/generate" element={<TicketGenerator />}
            />

        </Routes>
    );
}

export default AppRouter;