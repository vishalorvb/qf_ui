import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
// import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import CreateApplication from "../Components/CreateApplication";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";

export default function WebApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [msg, setMsg] = useState("");

  const applicationColumns = [
    {
      field: "application_name",
      headerName: "Application Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "application_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "base_url",
      headerName: "Base URL",
      flex: 3,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <VisibilityOutlinedIcon
              className="eyeIcon"
              onClick={() =>
                navigate("pages", { state: { id: param.row.application_id } })
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
        name: "Web",
        plusButton: true,
        plusCallback: () => setOpenCreate(true),
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
    axios.get(`qfservice/getApplicationDetails`).then((res) => {
      console.log(res.data);
      setApplication(res.data);
    });
  }, [msg]);

  return (
    <>
      <SnackbarNotify
        open={msg && true}
        close={setMsg}
        msg={msg}
        severity="success"
      />
      <CreateApplication
        open={openCreate}
        close={setOpenCreate}
        type={1}
        setMsg={setMsg}
      />
      <Table
        rows={application}
        columns={applicationColumns}
        getRowId={(row) => row.application_id}
      />
      <Outlet />
    </>
  );
}
