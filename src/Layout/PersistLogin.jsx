import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import PersistingLoading from "./PersistingLoading";
import { authservice } from "../Environment";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxios();
  const token = auth?.token ? auth?.token : localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userInfo = await axiosPrivate.get(
          authservice + "/qfauthservice/authentication/userInfo"
        );
        const info = userInfo?.data?.info;
        const user = info?.ssoId;
        const password = info?.password;
        const role = info?.role;
        const userId = info?.id;
        setAuth({
          user: user,
          password: password,
          roles: role,
          userId: userId,
          info: info,
          token: token,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.user ? verifyUser() : setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <PersistingLoading /> : <Outlet />}</>;
};

export default PersistLogin;
