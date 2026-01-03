import axios from "axios";
import { unauthorizedInterceptor } from "./interceptors";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



// ✅ Unauthorized / rate-limit handler
unauthorizedInterceptor(axiosInstance);

export default axiosInstance;
