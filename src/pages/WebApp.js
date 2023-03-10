import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
// import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import CreateApplication from "../Components/CreateApplication";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { getWebApplication } from "../Services/ApplicationService";
import { ApplicationNav } from "./ApplicationNav";
export default function WebApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [msg, setMsg] = useState("");
  const location = useLocation();

  const applicationColumns = [
    {
      field: "module_name",
      headerName: "Application Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "module_desc",
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
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <VisibilityOutlinedIcon
              className="eyeIcon"
              onClick={() => {
                navigate("pages", {
                  state: {
                    id: param.row.module_id,
                    base_url: param.row.base_url,
                  },
                });
              }}
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

  // useEffect(() => {
  //   axios.get(`qfservice/getApplicationDetails`).then((res) => {
  //     console.log(res.data);
  //     // setApplication(res.data);
  //   });
  // }, [msg]);
  useEffect(() => {
    getWebApplication(setApplication, auth.info.id, 2);
  }, []);

  return (
    <>
      <div className="intable">
        <select
          onChange={(e) => {
            navigate(e.target.value);
          }}
        >
          {ApplicationNav.map((el) => (
            <option
              selected={location.pathname == el.url ? true : false}
              value={el.url}
            >
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <SnackbarNotify
        open={msg && true}
        close={setMsg}
        msg={msg}
        severity="success"
      />
      <CreateApplication
        open={openCreate}
        close={setOpenCreate}
        type={2}
        setMsg={setMsg}
      />
      <Table
        rows={application}
        columns={applicationColumns}
        getRowId={(row) => row.module_id}
      />
      <Outlet />
    </>
  );
}
