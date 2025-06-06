import axios, { AxiosHeaders } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Si config.headers est une instance d'AxiosHeaders, on peut utiliser `set`
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // Sinon, on recrée les headers avec AxiosHeaders
      config.headers = new AxiosHeaders({
        Authorization: `Bearer ${token}`,
      });
    }
  }

  return config;
});

export default api;
