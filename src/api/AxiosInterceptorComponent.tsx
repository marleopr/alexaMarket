import React, { useEffect } from "react";
import API from "./index";
import API_MULTI_PART from "./api-multi-part";
import { useNavigate } from "react-router-dom";

const AxiosInterceptorComponent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResponseError = (error: any) => {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        window.location.reload();
      }
      return Promise.reject(error);
    };

    const responseInterceptor1 = API.interceptors.response.use(
      (response) => response,
      handleResponseError
    );

    const responseInterceptor2 = API_MULTI_PART.interceptors.response.use(
      (response) => response,
      handleResponseError
    );

    return () => {
      API.interceptors.response.eject(responseInterceptor1);
      API_MULTI_PART.interceptors.response.eject(responseInterceptor2);
    };
  }, [navigate]);

  return null;
};

export default AxiosInterceptorComponent;
