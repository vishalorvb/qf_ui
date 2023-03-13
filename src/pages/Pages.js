import { useLocation } from "react-router-dom";
import PagesTable from "../Components/Application/PagesTable";
import useAuth from "../hooks/useAuth";
import useHead from "../hooks/useHead";
import axios from "../api/axios";
import { useEffect } from "react";

export default function Pages() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const location = useLocation();

  const createPage = () => {
    const bodyFormData = new FormData();
    bodyFormData.append("user_id", 52);
    bodyFormData.append("module_id", 96);
    bodyFormData.append("web_page_url", location.state.base_url);
    bodyFormData.append("user_name", auth?.user);
    bodyFormData.append("mobile_os", "");
    bodyFormData.append("diff_page_id", 0);
    bodyFormData.append("browser_name", `custom`);
    bodyFormData.append("project_id", 80);
    axios({
      method: "post",
      url: `http://10.11.12.243:8083/qfservice/webpages/LaunchJNLPToCreateWebPage`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((resp) => {
      const localFormData = new FormData();
      localFormData.append(
        "data",
        '{"web_page_name":"","web_page_description":"","diff_page_id":0,"jar_type":1,"module_id":96,"browser_name":"custom","user_id":52,"web_page_url":"https://fleetcor.okta.com/signin","automation_path":"null","save_web_page_and_elements_url":"http://10.11.12.243:8083/webpages/CreateWebPage"}'
      );
      localFormData.append("jarName", `webpage`);
      axios({
        method: "post",
        url: `http://127.0.0.1:8765/connect`,
        data: localFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    });
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pages",
        plusButton: true,
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
  }, []);

  return <PagesTable location={location} />;
}
