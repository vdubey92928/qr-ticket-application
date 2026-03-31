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

import { isAuthenticated, getRole } from "./../util/authStorage";
import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { validateToken } from "./../util/authStorage";

const HomeRedirect = () => {

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const check = async () => {
            const isValid = await validateToken();
            setValid(isValid);
            setLoading(false);

            if (!isValid) {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("userRole");
            }
        };


        check();


    }, []);



    if (loading) return <div>Loading...</div>;

    if (!valid) return <Home />;

    const role = localStorage.getItem("userRole");

    if (role === "ADMIN") return <Navigate to="/admin" />;
    if (role === "GATE") return <Navigate to="/gate-scanner" />;
    if (role === "MUSEUM") return <Navigate to="/museum-scanner" />;

    return <Home />;
};


const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
};

function AppRouter() {
    return (
        <Routes>

            {/* PUBLIC PAGES */}
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* STAFF LOGIN */}
            <Route path="/login" element={<LoginPage />} />

            {/* ADMIN DASHBOARD */}
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route path="/admin" element={
                <PrivateRoute>
                    <AdminPage />
                </PrivateRoute>
            }
            />

            <Route path="/gate-scanner" element={
                <PrivateRoute>
                    <GateScanner />
                </PrivateRoute>
            } />
            <Route path="/museum-scanner" element={
                <PrivateRoute>
                    <MuseumScanner />
                </PrivateRoute>
            } />

            {/* TICKET GENERATION */}
            <Route path="/generate" element={<TicketGenerator />} />

            {/* SCANNER DEVICES */}


        </Routes>
    );
}

export default AppRouter;
