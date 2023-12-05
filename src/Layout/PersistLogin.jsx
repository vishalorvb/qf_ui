import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import PersistingLoading from "./PersistingLoading";
import { authservice } from "../Environment";
import axios from "axios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  const token = auth?.token ? auth?.token : localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userInfo = await axios.get(
          authservice + "/qfauthservice/authentication/userInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
