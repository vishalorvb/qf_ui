import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxios();

  const logout = async () => {
    setAuth({});
    localStorage.setItem("token", "");
    try {
      const response = await axiosPrivate.get(
        "qfauthservice/authentication/logout"
      );
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
