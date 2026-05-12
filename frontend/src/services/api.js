import axios from "axios";

const api = axios.create({
  baseURL: "https://finda-backend-2.onrender.com/api",
});

export default api;