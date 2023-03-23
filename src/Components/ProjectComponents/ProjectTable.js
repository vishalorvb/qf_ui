import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import ConfirmPop from "../../CustomComponent/ConfirmPop";

import { getProject } from "../../Services/ProjectService";
import { deleteProject } from "../../Services/ProjectService";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";
import { createformData } from "./ProjectData";

function ProjectTable() {
  let [popup, setPopup] = useState(false);
  let [pid, setPid] = useState();
  const navigate = useNavigate();
  let [project, setProject] = useState([]);
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  const { auth } = useAuth();
  const loggedInId = auth.info.id;

  function handleDeletePopup(pid) {
    console.log(pid);
    setPopup(true);
    setPid(pid);
  }
  function DeleteProjectFromUser(projectId) {
    console.log(projectId);
    deleteProject(projectId, loggedInId).then((res) => {
      console.log(res);
      if (res == "SUCCESS") {
        console.log("dletred");
        setSnackbarsuccess(true);
        getProject(setProject, loggedInId);
      }
    });

    setPopup(false);
  }

  function handleEdit(project) {
    createformData.projectName = project.project_name;
    createformData.projectDesc = project.description;
    createformData.jira_project_id = project.jira_project_key;
    createformData.sqeProjectId = project.project_id;
    createformData.userId = auth.info.id;
    createformData.orgId = 1;
    createformData.jenkins_token = project.jenkins_token;
    createformData.jenkins_user_name = project.jenkins_user_name;
    createformData.jenkins_password = project.jenkins_password;
    createformData.automation_framework_type =
      project.automation_framework_type;
    createformData.gitOps = true;
    navigate("createProject");
  }

  const columns = [
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: " ",
      headerName: "Type",
      renderCell: (param) => {
        if (param.row.automation_framework_type == 1) {
          return (
            <Stack direction="row" spacing={1}>
              <Chip
                label="Selenium"
                variant="outlined"
                color="warning"
                size="small"
              />
            </Stack>
          );
        } else {
          return (
            <Stack direction="row" spacing={1}>
              <Chip label="Other" variant="outlined" color="primary" />
            </Stack>
          );
        }
      },
      flex: 2,
      sortable: false,
      align: "flex-start",
    },

    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <div>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  handleEdit(param.row);
                }}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  handleDeletePopup(param.row.project_id);
                }}
              >
                <DeleteOutlined></DeleteOutlined>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 1,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    getProject(setProject, loggedInId);
  }, []);

  return (
    <div>
      <SnackbarNotify
        open={snackbarsuccess}
        close={setSnackbarsuccess}
        msg="Deleted Succesfully"
        severity="success"
      />
      <Table
        rows={project}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.project_id}
      ></Table>
      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={"Delete Project"}
        message={"Are you sure you want to delete this project"}
        onConfirm={() => DeleteProjectFromUser(pid)}
      ></ConfirmPop>
    </div>
  );
}

export default ProjectTable;
