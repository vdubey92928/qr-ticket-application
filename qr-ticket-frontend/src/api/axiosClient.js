import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8082",
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

export default axiosClient;
