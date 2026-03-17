import axios from "axios";

export const BASE_URL = "https://ai-chat-aqd9.onrender.com";
// export const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data.data,
  (error) => Promise.reject(error)
);

export default api;