import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth()

  const requestInterceptor = (config) => {
    const authToken = auth?.authToken;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  };

  const responseInterceptor = async (error) => {
    const originalRequest = error.config;
  
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
  
      try {
        const response = await api.post(`/auth/refresh-token`, {
          refreshToken: auth?.refreshToken,
        });
  
        const { token } = response.data;
        console.log(token);
        setAuth({ ...auth, authToken: token });
  
        // Modify the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
  
        // Retry the original request with the modified headers
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
  
    return Promise.reject(error);
  };
  

  useEffect(() => {
    const requestInterceptorId = api.interceptors.request.use(
      requestInterceptor,
      (error) => Promise.reject(error)
    );

    const responseInterceptorId = api.interceptors.response.use(
      (response) => response,
      responseInterceptor
    );

    return () => {
      api.interceptors.request.eject(requestInterceptorId);
      api.interceptors.response.eject(responseInterceptorId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.authToken]);

  return { api };
};

export { useAxios };

