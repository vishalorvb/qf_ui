import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Button, Chip, Menu, MenuItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ConfirmPop from "../../CustomComponent/ConfirmPop";

import { getProject } from "../../Services/ProjectService";
import { deleteProject } from "../../Services/ProjectService";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";
import { createformData } from "./ProjectData";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
    // console.log(projectId);
    deleteProject(projectId, loggedInId).then((res) => {
      // console.log(res);
      if (res === "SUCCESS") {
        // console.log("dletred");
        setSnackbarsuccess(true);
        getProject(setProject, loggedInId);
      }
    });

    setPopup(false);
  }

  function handleEdit(project) {
    console.log(project)
    createformData.projectName = project.project_name;
    createformData.projectDesc = project.description;
    createformData.jira_project_id = project.jira_project_key;
    createformData.sqeProjectId = project.project_id;
    createformData.userId = auth.info.id;
    createformData.orgId = 1;
    createformData.jenkins_token = project.jenkins_token;
    createformData.jenkins_user_name = project.jenkins_user_name;
    createformData.jenkins_password = project.jenkins_password;
    createformData.jenkins_url = project.jenkins_url;
    createformData.automation_framework_type =
    project.automation_framework_type;
    createformData.gitOps = true;
    createformData.repository_url = project.repository_url;
    createformData.repository_branch = project.repository_branch;
    createformData.repository_token = project.repository_token;

    // console.log(project);
    navigate("Update");
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
          <span style={{ color: "rgb(0, 159, 238)" }}>
            {param.row?.project_name}
          </span>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return ProjectDescriptionCell(param, handleEdit, handleDeletePopup);
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
              onClick={() => navigate("/Projects/Create")}
            >
              Create Project
            </Button>
          </div>
        </div>
        <Table
          searchPlaceholder="Search Projects"
          rows={
            location?.state === "recentProjects"
              ? project.filter((p) => p.is_deleted == false).slice(0, 11)
              : project.filter((p) => p.is_deleted == false)
            // project
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

const ProjectDescriptionCell = (param, handleEdit, handleDeletePopup) => {
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
      <Typography variant="p">{param?.row?.description}</Typography>
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
            handleEdit(param.row);
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
      </Menu>
    </div>
  );
};
