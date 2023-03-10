import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getPages } from "../Services/ApplicationService";
import useAuth from "../hooks/useAuth";
export default function Pages() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  let [page, setPage] = useState([]);

  const pageColumns = [
    {
      field: "name",
      headerName: "Pages",
      flex: 3,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <NearMeOutlinedIcon
              onClick={() =>
                navigate("PageElements", {
                  state: { id: param.row.web_page_id },
                })
              }
            />
          </div>
        );
      },
    },
  ];

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

  // useEffect(() => {
  //   (async () => {
  //     const modules = await axios.get(
  //       `/qfservice/getprojectmodules/${location.state.id}`
  //     );
  //     const webModule = modules?.data?.data?.find(
  //       (module) => module?.module_type === 2
  //     );
  //     webModule &&
  //       axios
  //         .get(
  //           `qfservice/webpages/getWebPagesList?module_id=${webModule?.module_id}`
  //         )
  //         .then((res) => {
  //           res?.data?.info && setPage(res?.data?.info);
  //         });
  //   })();
  // }, []);
  useEffect(() => {
    getPages(setPage, location.state.id);
    console.log(location.state);
  }, []);
  return (
    <>
      <Table
        rows={page}
        columns={pageColumns}
        getRowId={(row) => row.web_page_id}
      />
      <Outlet />
    </>
  );
}
