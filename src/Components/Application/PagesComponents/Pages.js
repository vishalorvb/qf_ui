import { useLocation } from "react-router-dom";
import PagesTable from "../PagesTable";
import useAuth from "../../../hooks/useAuth";
import useHead from "../../../hooks/useHead";
import axios from "../../../api/axios";
import { useEffect } from "react";

export default function Pages() {
  const { setHeader, header } = useHead();
  const { auth } = useAuth();
  const location = useLocation();

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
        const localFormData = new FormData();
        localFormData.append("data", resp?.data?.info);
        localFormData.append("jarName", `webpage`);
        axios.postForm(`http://127.0.0.1:8765/connect`, {
          data: resp?.data?.info,
          jarName: `webpage`,
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

  return <PagesTable location={location} />;
}
