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
export default function ApplicationsList() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);
  const location = useLocation();

  const applicationColumns = [
    {
      field: "module_name",
      headerName: "Application Name",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <Typography
            onClick={() =>
              navigate(`${param?.row?.module_name}`, { state: param?.row })
            }
            variant="p"
            className="nameColumn"
          >
            {param?.row?.module_name}
          </Typography>
        );
      },
    },
    {
      field: "module_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return ApplicationDescriptionCell(param, setApplication, auth);
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
    getApplication(setApplication, auth.info.id);
  }, []);

  console.log(location?.pathname);

  return (
    <div id="apptable">
      <div className="intable">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/createApplication")}
        >
          Create Application
        </Button>
      </div>
      <Table
        rows={
          location?.state === "recentApplication"
            ? application.slice(0, 10)
            : application
        }
        columns={applicationColumns}
        getRowId={(row) => row.module_id}
      />
    </div>
  );
}

const ApplicationDescriptionCell = (param, setApplication, auth) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          onClick={() => navigate("/createApplication", { state: param?.row })}
        >
          <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() =>
            deleteApplication(param.row.module_id, auth.info.id).then((res) => {
              if (res) {
                getApplication(setApplication, auth.info.id);
              }
            })
          }
        >
          <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};
