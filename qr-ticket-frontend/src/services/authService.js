import axiosClient from "../api/axiosClient";

// ================= LOGIN =================
export const login = async (credentials) => {
    try {
        const response = await axiosClient.post(
            "/api/auth/login",
            credentials   // { username, password, role }
        );

        return response.data;

    } catch (error) {
        // Pass backend error message to UI
        throw error;
    }
};
