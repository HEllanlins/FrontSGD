import axios from "axios";

const api = axios.create({
  baseURL: "https://sgd-api-6983.onrender.com", // Ajuste conforme necessário
  timeout: 5000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador de requisição (caso precise adicionar token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Exemplo de autenticação
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador de resposta (caso queira tratar erros globalmente)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error);
    return Promise.reject(error);
  }
);

export default api;
