import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getProject } from "../Services/ProjectService";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import CreateApplication from "../Components/CreateApplication";
import { ApplicationNav } from "./ApplicationNav";
import { getWebApplication } from "../Services/ApplicationService";
export default function ApiApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const location = useLocation();
  let [application, setApplication] = useState([]);


  const pageColumns = [
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
          <VisibilityOutlinedIcon
            className="eyeIcon"
            onClick={() =>
              navigate("apiRequests", { state: { id: param.row.project_id } })
            }
          />
        );
      },
    },
  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "API",
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
    getWebApplication(setApplication, auth.info.id,1)
  }, [])

  return (
    <>
      <div className="intable">
        <select onChange={e => {
          navigate(e.target.value)
        }}>
          {ApplicationNav.map(el => <option selected={location.pathname == el.url?true:false} value={el.url}>{el.name}</option>)}
        </select>
      </div>
      <CreateApplication open={openCreate} close={setOpenCreate} type="api" />
      <Table
        rows={application}
        columns={pageColumns}
        getRowId={(row) => row.module_id}
      />
      <Outlet />
    </>
  );
}
