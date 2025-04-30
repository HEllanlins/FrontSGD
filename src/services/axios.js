import axios from "axios";
import { api_url } from "../environment";

const api = axios.create({
  baseURL: api_url,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
