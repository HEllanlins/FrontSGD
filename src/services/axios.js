import axios from "axios";

const api = axios.create({
  baseURL: "https://sgdapi-production.up.railway.app", // Ajuste conforme necessário
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
