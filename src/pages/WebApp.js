import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CreateApplication from "../Components/CreateApplication";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { getApplication } from "../Services/ApplicationService";
import { ApplicationNav } from "./ApplicationNav";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { moduledata } from "../Components/CreateApplication";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteApplication } from "../Services/ApplicationService";
export default function WebApp() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);

  let [popup, setPopup] = useState(false);
  let [type, setType] = useState(2);
  let [name, setName] = useState("WEB");
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);

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
            {type == 2 && (
              <Tooltip title="Screen">
                <IconButton
                  onClick={(e) =>
                    navigate("screen", { state: { id: param.row.module_id } })
                  }
                >
                  <ScreenshotMonitorIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit">
              <IconButton
                onClick={(e) => {
                  console.log(param.row);
                  moduledata.module_id = param.row.module_id;
                  moduledata.module_name = param.row.module_name;
                  moduledata.module_desc = param.row.module_desc;
                  moduledata.base_url = param.row.base_url;
                  if (param.row.apk_name != null) {
                    moduledata.apk_name = param.row.apk_name;
                  }
                  setPopup(true);
                }}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="View">
              <IconButton>
                <VisibilityOutlinedIcon
                  className="eyeIcon"
                  onClick={() => {
                    let url = ApplicationNav.filter((ele) => {
                      if (ele.type == type) {
                        return ele.url;
                      }
                    });
                    navigate(url[0].url, {
                      state: { id: param.row.module_id },
                    });
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  console.log(param.row.module_id);
                  deleteApplication(param.row.module_id, auth.info.id).then(
                    (res) => {
                      if (res) {
                        getApplication(setApplication, auth.info.id);
                      }
                    }
                  );
                }}
              >
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  function handleSelect(e) {
    setType(e.target.value);
    let n = ApplicationNav.filter((el) => {
      if (el.type == e.target.value) {
        return el.name;
      }
    });
    setName(n[0].name);
  }
  function handleSnackbar() {
    setSnackbarsuccess(true);
    getApplication(setApplication, auth.info.id);
    setSnackbarsuccess(true);
  }
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: name,
        plusButton: true,
        plusCallback: () => setPopup(true),
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
  }, [name]);

  useEffect(() => {
    getApplication(setApplication, auth.info.id);
  }, []);

  return (
    <>
      <div className="intable">
        <select onChange={handleSelect}>
          {ApplicationNav.map((el) => (
            <option selected={el.type == type ? true : false} value={el.type}>
              {el.name}
            </option>
          ))}
        </select>
      </div>
      <SnackbarNotify
        open={snackbarsuccess}
        close={setSnackbarsuccess}
        msg="Opration Succesfull"
        severity="success"
      />
      {popup && (
        <CreateApplication
          close={setPopup}
          type={type}
          handleSnackbar={handleSnackbar}
        />
      )}
      <Table
        rows={application.filter((e) => {
          if (e.module_type == type) {
            return e;
          }
        })}
        columns={applicationColumns}
        getRowId={(row) => row.module_id}
      />
      <Outlet />
    </>
  );
}
