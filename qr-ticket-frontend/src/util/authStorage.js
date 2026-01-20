// src/utils/authStorage.js

export const saveAuth = (token, role) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userRole", role);
};

export const getToken = () => {
    return localStorage.getItem("jwtToken");
};

export const getRole = () => {
    return localStorage.getItem("userRole");
};

export const clearAuth = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
};
