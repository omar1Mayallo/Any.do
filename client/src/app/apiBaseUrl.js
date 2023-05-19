import axios from "axios";

// ServerBase URL
const axiosBaseUrl = axios.create({baseURL: "http://127.0.0.1:5000/api"});

export default axiosBaseUrl;
