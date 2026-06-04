import axios from "axios";

//  setting default
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://nafta886-kopi-capstone-backend.hf.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request: otomatis kirim token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor response: kalau 401 (token expired), auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // redirect ke login (kalau bukan di halaman publik)
      const path = window.location.pathname;
      if (!["/", "/login", "/register"].includes(path)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
