import useAxios from "./useAxios";
import useAuth from "./useAuth";
import axios from "axios";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.setItem("token", "");
    try {
      await axios.get("qfauthservice/authentication/logout");
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
