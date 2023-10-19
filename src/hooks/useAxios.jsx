import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth } = useAuth();
  const token = auth?.token ? auth?.token : localStorage.getItem("token");

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return axiosPrivate;
};

export default useAxios;
