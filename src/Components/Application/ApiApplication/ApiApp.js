import { useEffect, useState } from "react";
import useHead from "../../../hooks/useHead";
import Table from "../../../CustomComponent/Table";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import CreateApplication from "../CreateApplication";
import { ApplicationNav } from "../ApplicationNav";
import { getWebApplication } from "../../../Services/ApplicationService";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { moduledata } from "../CreateApplication";
export default function ApiApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const location = useLocation();
  let [application, setApplication] = useState([]);
  let [popup, setPopup] = useState(false);

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
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={(e) => {
                  moduledata.module_id = param.row.module_id;
                  moduledata.module_name = param.row.module_name;
                  moduledata.module_desc = param.row.module_desc;
                  moduledata.base_url = param.row.base_url;
                  setPopup(true);
                }}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Tooltip>
            <VisibilityOutlinedIcon
              className="eyeIcon"
              onClick={() =>
                navigate("apiRequests", { state: { id: param.row.project_id } })
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
        name: "API",
        plusButton: true,
        buttonName: "Create API",
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
    getWebApplication(setApplication, auth.info.id, 1);
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
      {"aaaa"}
      {popup && <CreateApplication close={popup} type={1} />}
      <Table
        rows={application}
        columns={pageColumns}
        getRowId={(row) => row.module_id}
      />
      <Outlet />
    </>
  );
}
