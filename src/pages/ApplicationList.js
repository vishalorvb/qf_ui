import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CreateApplication from "../Components/Application/CreateApplication";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { getApplication } from "../Services/ApplicationService";
import { ApplicationNav } from "../Components/Application/ApplicationNav";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { moduledata } from "../Components/Application/CreateApplication";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteApplication } from "../Services/ApplicationService";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Stack } from "@mui/system";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ApiIcon from "@mui/icons-material/Api";
import JoinInnerRoundedIcon from "@mui/icons-material/JoinInnerRounded";
import ConfirmPop from "../CustomComponent/ConfirmPop";
export default function ApplicationsList() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);
  const location = useLocation();
  const [snack, setSnack] = useState(false);
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);

  const handleDelete = () => {};

  const applicationColumns = [
    {
      field: "module_name",
      headerName: "Application Name",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <Stack direction="row" spacing={1}>
            {{
              1: (
                <Tooltip title="API">
                  <ApiIcon sx={{ color: "#ffd700 " }} />
                </Tooltip>
              ),
              2: (
                <Tooltip title="Web">
                  <LanguageIcon sx={{ color: "#0fadc8" }} />
                </Tooltip>
              ),
              3: (
                <Tooltip title="Android">
                  <AndroidIcon sx={{ color: "#a4c639" }} />
                </Tooltip>
              ),
              4: (
                <Tooltip title="Ios">
                  <AppleIcon sx={{ color: "#A2AAAD" }} />
                </Tooltip>
              ),
              13: (
                <Tooltip title="Mobile-Web">
                  <AdUnitsIcon sx={{ color: "green" }} />
                </Tooltip>
              ),
              19: (
                <Tooltip title="Link-Project">
                  <JoinInnerRoundedIcon sx={{ color: "gray" }} />
                </Tooltip>
              ),
            }[param?.row?.module_type] ?? <AppleIcon sx={{ color: "white" }} />}
            <Typography
              onClick={() => {
                if (param?.row.module_type == "19") {
                  setSnack(true);
                  setTimeout(() => {
                    setSnack(false);
                  }, 3000);
                } else {
                  navigate(`${param?.row?.module_name}`, { state: param?.row });
                }
              }}
              variant="p"
              className="nameColumn"
            >
              {param?.row?.module_name}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "sub_modules_list",
      headerName: "Sub Applications",
      flex: 1,
      renderCell: (param) => {
        // return <div>abhi</div>;
        const subModules = param?.row?.sub_modules_list;
        const createSubModule = (
          <Button
            variant="contained"
            onClick={() => {
              moduledata.module_name = param.row.module_name;
              moduledata.base_url = param.row.base_url;
              moduledata.module_desc = param.row.module_desc;
              moduledata.module_type = param.row.module_type;
              moduledata.is_sub_module = true;
              moduledata.parent_module_id = param.row.module_id;
              navigate("CreateSubApplication", { state: param?.row });
            }}
          >
            create submodule
          </Button>
        );
        return subModules?.length > 0 ? (
          <Select fullWidth size="small">
            {subModules?.map((module) => (
              <MenuItem
                onClick={() => {
                  if (module.module_type == "19") {
                    setSnack(true);
                    setTimeout(() => {
                      setSnack(false);
                    }, 3000);
                  } else {
                    navigate(`${module}`, {
                      state: module,
                    });
                  }
                }}
              >
                {module?.module_name}
              </MenuItem>
            ))}

            {createSubModule}
          </Select>
        ) : (
          createSubModule
        );
      },
    },
    {
      field: "module_desc",
      headerName: "Description",
      flex: 6,
      sortable: false,
      renderCell: (param) => {
        return ApplicationDescriptionCell(
          param,
          setApplication,
          auth,
          setSnackbarsuccess
        );
      },
    },
  ];
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name:
          location?.state === "recentApplication"
            ? "Recent Applications"
            : "Search Applications",
      };
    });
  }, [location?.state]);

  useEffect(() => {
    getApplication(setApplication, auth?.info?.id);
  }, []);

  return (
    <div className="apptable">
      <div className="intable">
        <div style={{ float: "right" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/Application/Create")}
          >
            Create Application
          </Button>
        </div>
      </div>
      <Table
        rows={
          location?.state === "recentApplication"
            ? application.slice(0, 10)
            : application
        }
        columns={applicationColumns}
        getRowId={(row) => row?.module_id}
        searchPlaceholder="Search Applications"
        rowHeight={60}
      />
      {snack && (
        <SnackbarNotify
          open={snack}
          close={setSnack}
          msg={"Link Project don't have Pages and Screens"}
          severity="error"
        />
      )}
      <SnackbarNotify
        open={snackbarsuccess}
        close={setSnackbarsuccess}
        msg="Application deleted succesfully"
        severity="success"
      />
    </div>
  );
}

const ApplicationDescriptionCell = (
  param,
  setApplication,
  auth,
  setSnackbarsuccess
) => {
  const navigate = useNavigate();
  let [popup, setPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handledeleteApplication = (module_id, id) => {
    deleteApplication(module_id, id).then((res) => {
      if (res) {
        getApplication(setApplication, auth?.info?.id);
        setSnackbarsuccess(true);
      }
    });
    setPopup(false);
  };
  return (
    <div className="descColumn">
      <Typography variant="p">{param?.row?.module_desc}</Typography>
      <MoreVertIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="descOption"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            moduledata.module_name = param.row.module_name;
            moduledata.base_url = param.row.base_url;
            moduledata.module_desc = param.row.module_desc;
            moduledata.module_type = param.row.module_type;
            moduledata.module_id = param.row.module_id;
            navigate("Update", { state: param?.row });
          }}
        >
          <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => setPopup(true)}>
          <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={"Delete Application"}
        message={"Are you sure you want to delete this application"}
        onConfirm={() =>
          handledeleteApplication(param?.row?.module_id, auth?.info?.id)
        }
      ></ConfirmPop>
    </div>
  );
};
