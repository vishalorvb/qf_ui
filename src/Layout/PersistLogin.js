import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxios();
  const token = auth?.token ? auth?.token : localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userInfo = await axiosPrivate.get(
          "/qfauthservice/authentication/userInfo"
        );
        const info = userInfo?.data?.info;
        const user = info?.ssoId;
        const password = info?.password;
        const role = [info?.role];
        setAuth({
          user: user,
          password: password,
          roles: role,
          info: info,
          token: token,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.user ? verifyUser() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <p>...Loading</p> : <Outlet />}</>;
};

export default PersistLogin;
