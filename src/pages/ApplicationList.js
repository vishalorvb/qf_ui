import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { getApplication } from "../Services/ApplicationService";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { moduledata } from "../Components/Application/CreateApplication";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteApplication } from "../Services/ApplicationService";
import { Stack } from "@mui/system";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ApiIcon from "@mui/icons-material/Api";
import JoinInnerRoundedIcon from "@mui/icons-material/JoinInnerRounded";
import ConfirmPop from "../CustomComponent/ConfirmPop";
import TableActions from "../CustomComponent/TableActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ApplicationsList() {
  const { setHeader, setSnackbarData } = useHead();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState([]);
  const location = useLocation();
  const [snack, setSnack] = useState(false);
  let [popup, setPopup] = useState({ moduleId: 0, status: false });

  const handledeleteApplication = (module_id, id) => {
    deleteApplication(module_id, id).then((res) => {
      if (res) {
        getApplication(setApplication, auth?.info?.id);
        setSnackbarData({
          status: true,
          message: "Application Deleted Successfully",
          severity: "success",
        });
      }
    });
    setPopup({ moduleId: 0, status: false });
  };

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
                  setSnackbarData({
                    status: true,
                    message: "Link Project don't have Pages and Screens",
                    severity: "info",
                  });
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
      flex: 2,
      renderCell: (param) => {
        const subModules = param?.row?.sub_modules_list;
        const createSubModule = (
          <Tooltip title="Create SubModule">
            <IconButton
              variant="contained"
              size="small"
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
              <AddCircleOutlineIcon color="primary" />
            </IconButton>
          </Tooltip>
        );
        return subModules?.length > 0 ? (
          <>
            {createSubModule}
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
            </Select>
          </>
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
        return (
          <>
            <TableActions heading={param?.row?.module_desc}>
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
              <MenuItem
                onClick={() =>
                  setPopup({ moduleId: param?.row?.module_id, status: true })
                }
              >
                <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
                Delete
              </MenuItem>
            </TableActions>
          </>
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
        rowHeight={65}
      />
      <ConfirmPop
        open={popup?.status}
        handleClose={() => setPopup({ moduleId: 0, status: false })}
        heading={"Delete Application"}
        message={"Are you sure you want to delete this application"}
        onConfirm={() =>
          handledeleteApplication(popup?.moduleId, auth?.info?.id)
        }
      ></ConfirmPop>
    </div>
  );
}
