import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Chip, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { getProject, makeProjectFav } from "../../Services/ProjectService";
import { deleteProject } from "../../Services/ProjectService";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import TableActions from "../../CustomComponent/TableActions";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LanguageIcon from "@mui/icons-material/Language";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ApiIcon from "@mui/icons-material/Api";
import JoinInnerRoundedIcon from "@mui/icons-material/JoinInnerRounded";
function ProjectTable({ location }) {
  let [popup, setPopup] = useState(false);
  let [pid, setPid] = useState();
  const navigate = useNavigate();
  let [project, setProject] = useState([]);
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  const { auth } = useAuth();
  const loggedInId = auth.info.id;

  function handleDeletePopup(pid) {
    setPopup(true);
    setPid(pid);
  }
  function DeleteProjectFromUser(projectId) {
    deleteProject(projectId, loggedInId).then((res) => {
      if (res === "SUCCESS") {
        setSnackbarsuccess(true);
        getProject(setProject, loggedInId);
      }
    });

    setPopup(false);
  }

  const columns = [
    {
        field: "pro",
        headerName: " ",
        flex: 3,
        sortable: false,
        align: "left",
        renderCell: (param) => {
          return (
            <Stack direction="row" spacing={1}>
            {{
              1: (
                <Tooltip title="Selenium">
                  <img src="../selenium.png" alt="no" className="logoimage"/>
                </Tooltip>
              ),
              2: (
                <Tooltip title="BBD">
                  <img src="../bbd.png" alt="no" className="logoimage"/>
                </Tooltip>
              ),
              3: (
                <Tooltip title="Cucumber Automation">
                  <img src="../cucumber.png" alt="no" className="logoimage"/>
                </Tooltip>
              ),
              6: (
                <Tooltip title="Link Project">
                    <img src="../link.png" alt="no" className="logoimage"/>
                </Tooltip>
              ),
              4: (
                <Tooltip title="Mobile">
                  <AdUnitsIcon sx={{ color: "green" }} />
                </Tooltip>
              ),
            }[param?.row?.automation_framework_type] ?? <AppleIcon sx={{ color: "white" }} />}
            <Typography
              variant="p"
              className="nameColumn"
            >
              {param?.row?.project_name}
            </Typography>
          </Stack>
          );
        },
      },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 3,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <span style={{ color: "rgb(0, 159, 238)" }}>
            {param.row?.project_name}
          </span>
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
        return param.row.favourite == true ? (
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
    getProject(setProject, loggedInId);
  }, [loggedInId]);

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
              ? project.filter(
                  (p) => p.is_deleted == false && p.favourite == true
                )
              : project.filter((p) => p.is_deleted == false)
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
