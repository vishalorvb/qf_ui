import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { getPages } from "../Services/ApplicationService";
import useAuth from "../hooks/useAuth";
export default function Screens() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  let [page, setPage] = useState([]);

  const pageColumns = [
    {
      field: "name",
      headerName: "Screens",
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
        name: "Screens",
        plusButton: true,
        plusCallback: "",
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

  useEffect(() => {
    axios
      .get(`/qfservice/screen/getScreensList?module_id=1025`)
      .then((resp) => {
        console.log(resp?.data?.info);
        setPage(resp?.data?.info);
      });
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
