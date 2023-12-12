import useAuth from "./useAuth";
import axios from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`/authentication/refreshtoken`, {
      header: { isRefreshToken: "true" },
    });
    setAuth((prev) => {
      return { ...prev, token: response?.data?.token };
    });
    return response?.data?.token;
  };
  return refresh;
};

export default useRefreshToken;
