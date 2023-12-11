import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { getProject, makeProjectFav } from "../../Services/QfService";
import { deleteProject } from "../../Services/QfService";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TableActions from "../../CustomComponent/TableActions";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AppleIcon from "@mui/icons-material/Apple";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import useHead from "../../hooks/useHead";
function ProjectTable({ location }) {
  console.log(process.env.REACT_APP_authservice);

  let [popup, setPopup] = useState(false);
  let [pid, setPid] = useState();
  const navigate = useNavigate();
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  const { auth } = useAuth();
  const loggedInId = auth.info.id;
  const { projectsList, setProjectList, setSnackbarData } = useHead();

  function handleDeletePopup(pid) {
    setPopup(true);
    setPid(pid);
  }
  function DeleteProjectFromUser(projectId) {
    deleteProject(projectId, loggedInId).then((res) => {
      if (res === "SUCCESS") {
        setSnackbarsuccess(true);
        getProject(setProjectList, loggedInId);
      }
    });

    setPopup(false);
  }

  const columns = [
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 3,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <Stack direction="row" spacing={1}>
            {{
              1: (
                <Tooltip title="Selenium">
                  <img src="../selenium.png" alt="no" className="logoimage" />
                </Tooltip>
              ),
              2: (
                <Tooltip title="BBD">
                  <img src="../bbd.png" alt="no" className="logoimage" />
                </Tooltip>
              ),
              3: (
                <Tooltip title="Cucumber Automation">
                  <img src="../cucumber.png" alt="no" className="logoimage" />
                </Tooltip>
              ),
              6: (
                <Tooltip title="Link Project">
                  <img src="../link.png" alt="no" className="logoimage" />
                </Tooltip>
              ),
              4: (
                <Tooltip title="Mobile">
                  <AdUnitsIcon sx={{ color: "green" }} />
                </Tooltip>
              ),
            }[param?.row?.automation_framework_type] ?? (
              <AppleIcon sx={{ color: "white" }} />
            )}
            <Typography variant="p" className="nameColumn">
              {param?.row?.project_name}
            </Typography>
          </Stack>
        );
      },
    },

    {
      field: "fav",
      headerName: "Favourite",
      flex: 1,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return param.row.favourite === true ? (
          <div
            onClick={(e) => {
              makeProjectFav(loggedInId, param.row.project_id, false).then(
                (res) => {
                  getProject(setProject, loggedInId);
                }
              );
            }}
          >
            <StarIcon></StarIcon>
          </div>
        ) : (
          <div
            onClick={(e) => {
              makeProjectFav(loggedInId, param.row.project_id, true).then(
                (res) => {
                  getProject(setProject, loggedInId);
                }
              );
            }}
          >
            <StarBorderIcon></StarBorderIcon>
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 6,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <TableActions heading={param.row?.description}>
            <MenuItem
              onClick={() => {
                navigate("CopyProject", {
                  state: {
                    name: param?.row?.project_name,
                    id: param?.row?.project_id,
                  },
                });
              }}
            >
              <ContentCopyOutlinedIcon sx={{ color: "green", mr: 1 }} />
              Copy
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/Projects/Create", {
                  state: {
                    id: param?.row?.project_id,
                  },
                });
              }}
            >
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleDeletePopup(param.row.project_id);
              }}
            >
              <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
              Delete
            </MenuItem>
          </TableActions>
        );
      },
    },
  ];

  useEffect(() => {
    projectsList?.length < 0 && getProject(setProjectList, loggedInId);
  }, [loggedInId]);

  useEffect(() => {
    if (projectsList?.length <= 0) {
      setSnackbarData({
        status: true,
        message: "Projects Not Found!",
        severity: "warning",
      });
    }
  }, [projectsList]);
  return (
    <>
      <SnackbarNotify
        open={snackbarsuccess}
        close={setSnackbarsuccess}
        msg="Project deleted Succesfully"
        severity="success"
      />
      <div className="apptable">
        <div className="intable">
          <div style={{ float: "right" }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/Projects/Create", {
                  state: {
                    id: undefined,
                  },
                });
              }}
            >
              Create Project
            </Button>
          </div>
        </div>
        <Table
          searchPlaceholder="Search Projects"
          rows={
            location?.state === "recentProjects"
              ? projectsList?.filter(
                  (p) => p.is_deleted === false && p.favourite === true
                )
              : projectsList?.filter((p) => p.is_deleted === false)
          }
          columns={columns}
          hidefooter={true}
          getRowId={(row) => row.project_id}
        ></Table>
      </div>

      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={"Delete Project"}
        message={"Are you sure you want to delete this project"}
        onConfirm={() => DeleteProjectFromUser(pid)}
      ></ConfirmPop>
    </>
  );
}

export default ProjectTable;
