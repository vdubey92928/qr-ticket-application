// src/utils/authStorage.js

import axios from "axios";

export const saveAuth = (token, role) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userRole", role);
};

export const validateToken = async () => {
    const token = localStorage.getItem("jwtToken");
    // console.log(token);

    if (!token) return false;
    try {
        await axios.get("/api/auth/validate", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return true;
    } catch (err) {
        console.log(err);

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userRole");
        return false;
    }
};

export const getToken = () => {
    return localStorage.getItem("jwtToken");
};

export const getRole = () => {
    return localStorage.getItem("userRole");
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
};


