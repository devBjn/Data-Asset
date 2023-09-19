import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://625bc0d450128c5702070768.mockapi.io/api/",
});

export default axiosClient;
