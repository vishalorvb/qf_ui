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
import { Stack } from "@mui/system";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ApiIcon from "@mui/icons-material/Api";
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
          <Stack direction="row" spacing={1}>
            {{
              1: (
                <Tooltip title="API">
                  <ApiIcon sx={{ color: "yellow" }} />
                </Tooltip>
              ),
              2: (
                <Tooltip title="Web">
                  <LanguageIcon sx={{ color: "lightblue" }} />
                </Tooltip>
              ),
              3: (
                <Tooltip title="Android">
                  <AndroidIcon sx={{ color: "green" }} />
                </Tooltip>
              ),
              4: (
                <Tooltip title="Ios">
                  <AppleIcon sx={{ color: "pink" }} />
                </Tooltip>
              ),
              5: (
                <Tooltip title="Mobile-Web">
                  <AdUnitsIcon sx={{ color: "green" }} />
                </Tooltip>
              ),
            }[param?.row?.module_type] ?? "ICON"}
            <Typography
              onClick={() =>
                navigate(`${param?.row?.module_name}`, { state: param?.row })
              }
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
    <div className="apptable">
      <div className="intable" style={{ width: "80%" }}>
        <div style={{ float: "right" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/createApplication")}
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
        getRowId={(row) => row.module_id}
        searchPlaceholder="Search Applications"
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
