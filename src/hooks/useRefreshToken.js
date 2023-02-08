import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxios();

  const refresh = async () => {
    const response = await axiosPrivate.get(
      `/qfauthservice/authentication/refreshtoken`,
      {
        header: { isRefreshToken: "true" },
      }
    );
    setAuth((prev) => {
      return { ...prev, token: response?.data?.token };
    });
    return response?.data?.token;
  };
  return refresh;
};

export default useRefreshToken;
