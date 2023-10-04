import axios from "axios";
import { RefreshToken } from "./RefreshToken"; // RefreshToken 함수를 가져옵니다.
import { useDispatch } from "react-redux";

const axiosInstance = axios.create();

// Request Interceptor: 요청을 보내기 전에 실행됩니다.
axiosInstance.interceptors.request.use(
  async (config) => {
    // 여기서 요청(config)을 수정하거나 특별한 처리를 수행할 수 있습니다.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 응답을 받은 후에 실행됩니다.
axiosInstance.interceptors.response.use(
  (response) => {
    // 성공적인 응답 처리
    return response;
  },
  async (error) => {
    console.error("Interceptor error:", error);
    console.log(error.response);
    console.log(error.response.status);
    if (error.response && error.response.status === 401) {
      const dispatch = useDispatch();
      // 401 에러가 발생하면 RefreshToken을 실행합니다.
      try {
        await RefreshToken(dispatch);
        // RefreshToken이 성공하면 다시 원래 요청을 재시도할 수 있습니다.
        return axiosInstance(error.config);
      } catch (refreshError) {
        // RefreshToken이 실패하면 에러 처리
        return Promise.reject(refreshError);
      }
    }
    // 다른 에러는 그대로 반환합니다.
    return Promise.reject(error);
  }
);

export default axiosInstance;
