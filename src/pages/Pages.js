import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getPages } from "../Services/ApplicationService";
export default function Pages() {
  const { setHeader } = useHead();
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

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pages",
        plusButton: true,
        plusCallback: () => console.log("hurray"),
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
  getPages(setPage,location.state.id)
  console.log(location.state.id)
}, [])
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
