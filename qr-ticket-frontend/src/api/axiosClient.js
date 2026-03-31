import axios from "axios";

// const axiosClient = axios.create({
//     baseURL: "http://localhost:8081",
//     // headers: {
//     //     "Content-Type": "application/json",
//     // },
// });

const axiosClient = axios.create({
    baseURL: "http://localhost:8081"
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export default axiosClient;
