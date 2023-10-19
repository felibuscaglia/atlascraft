import { HttpStatusCode } from "axios";
import apiClient from "lib/axios/apiClient";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const useAxiosAuth = () => {
  const navigate = useNavigate();

  const refreshTokens = async () => {
    try {
      await apiClient.post(API_PATHS.REFRESH_TOKENS);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevRequest = err.config;
        if (
          err.reponse?.status === HttpStatusCode.Unauthorized &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          await refreshTokens();
          return apiClient(prevRequest);
        }

        if (err.response?.status === HttpStatusCode.Unauthorized) {
          navigate(UI_PATHS.SIGN_IN);
        } else {
          return Promise.reject(err);
        }

      },
    );

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return apiClient;
};

export default useAxiosAuth;
