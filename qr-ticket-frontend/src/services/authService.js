// src/services/authService.js

import axios from "axios";

const API_URL = "http://localhost:8082/api/auth";

export const login = async (username, password) => {
    console.log(username, password);

    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });


    return response.data;
};
