import axios from "axios";
import { RefreshToken } from "./RefreshToken";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("Interceptor error:", error);
    console.log(error);
    console.log(error.response);
    console.log(error.response.status);
    if (error.response && error.response.status === 401) {
      try {
        await RefreshToken();

        const newAccessToken = sessionStorage.getItem("accessToken");
        error.config.headers["X-FNS-ACCESSTOKEN"] = newAccessToken;

        return axiosInstance(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
