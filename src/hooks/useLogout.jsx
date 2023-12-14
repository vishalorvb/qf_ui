import useAuth from "./useAuth";
import axios from "axios";
import { authservice } from "../Environment";

const useLogout = () => {
  const { setAuth, auth } = useAuth();
  const token = auth?.token ? auth?.token : localStorage.getItem("token");

  const logout = async () => {
    setAuth({});
    localStorage.setItem("token", "");
    try {
      await axios.get(`${authservice}/authentication/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
