import { useLocation } from "react-router-dom";
import PagesTable from "../PagesTable";
import useAuth from "../../../hooks/useAuth";
import useHead from "../../../hooks/useHead";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";

export default function Pages() {
  const { setHeader, header } = useHead();
  const { auth } = useAuth();
  const location = useLocation();

  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [remoteAPiFails, setRemoteAPiFails] = useState(false);

  const createPage = () => {
    console.log(header?.browser);
    axios
      .postForm(`/qfservice/webpages/LaunchJNLPToCreateWebPage`, {
        user_id: auth?.userId,
        module_id: location?.state?.id,
        web_page_url: location.state.base_url,
        user_name: auth?.user,
        mobile_os: "",
        diff_page_id: 0,
        browser_name: header?.browser,
      })
      .then((resp) => {
        console.log(resp?.data?.info);
        resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
        const localFormData = new FormData();
        localFormData.append("data", resp?.data?.info);
        localFormData.append("jarName", `webpage`);
        resp?.data?.status === "SUCCESS" &&
          axios
            .postForm(`http://127.0.0.1:8765/connect`, {
              data: resp?.data?.info,
              jarName: `webpage`,
            })
            .then((resp) => {
              console.log(resp);
              setJarConnected(true);
            })
            .catch((err) => {
              console.log(err.message);
              err.message === "Network Error" && setClientInactive(true);
            });
      });
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pages",
        plusButton: true,
        buttonName: "Create Page",
        plusCallback: createPage,
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, [header?.browser]);

  return (
    <>
      <SnackbarNotify
        open={clientInactive}
        close={setClientInactive}
        msg={"Local Client Jar is not running!"}
        severity="error"
      />
      <SnackbarNotify
        open={remoteAPiFails}
        close={setRemoteAPiFails}
        msg={"Somthing went wrong , Info Null "}
        severity="error"
      />
      <SnackbarNotify
        open={jarConnected}
        close={setJarConnected}
        msg={"Local Client Jar Launched!"}
        severity="success"
      />
      <PagesTable location={location} />
    </>
  );
}
