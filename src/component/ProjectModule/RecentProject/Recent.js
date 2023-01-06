import "../projects.scss";

import { Alert, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Table from "../../CustomComponent/Table";
import axios from "axios";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { baseUrl } from "../../../Environment";
import Snackbar from "@mui/material/Snackbar";
import CreateProject from "../Actions/ActionCreate";
import RemoveIcon from "@mui/icons-material/Remove";
import ConfirmPop from "../../ConfirmPop";
import { getProjects, DeleteProjectFromFavourite } from "../Api";
import ActionUsers from "../Actions/ActionUsers";
import ActionOverview from "../Actions/Overview";
import Workflows from "../../Workflow/Workflows";
import WorkflowDropdown from "../../Workflow/WorkflowDropdown";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";

function Recent() {
  const [showWorkflow, setShowWorkflow] = useState({
    flag: false,
    projectId: null,
  });
  let [createProject, setCreateProject] = useState(false);
  let [popup, setPopup] = useState(false);
  let [pid, setPid] = useState();
  let [uid, setUid] = useState();
  let [row, setRow] = useState([]);
  let [action, setAction] = useState("");
  let [user, setUser] = useState({
    flag: false,
    projectId: null,
  });

  const [collapseProject, setCollapseProject] = useState(true);

  let [Overview, setOverview] = useState({
    flag: false,
    project: null,
  });
  let [edit, setEdit] = useState({
    flag: false,
    project: null,
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const [displayWorkflow, setDisplayWorkflow] = useState(0);

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    console.log("Handle clicked");
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let popheader = "Delete Project";
  let popmessage = "Are you sure to delete this project";

  function getProject() {
    getProjects(setRow);
  }

  function AddToFavourite(projectId, userId) {
    console.log(projectId + "=======" + userId);
    axios({
      method: "post",
      url: baseUrl + "/ProjectsMS/Project/addProjectToFavourite",
      data: {
        projectId: projectId,
        userId: userId,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          console.log("Inside IF");
          handleClick({
            vertical: "top",
            horizontal: "right",
          });
          getProject();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function DeleteFromFavourite(projectId, userId) {
    DeleteProjectFromFavourite(projectId, userId).then(() => {
      getProject();
    });
  }
  function DeleteProjectFromUser(projectId, userId) {
    console.log(projectId + "=======" + userId);
    axios({
      method: "delete",
      url: baseUrl + "/ProjectsMS/Project/deleteProjectFromUser",
      data: {
        projectId: projectId,
        userId: userId,
      },
    })
      .then((response) => {
        console.table(response);
        if (response.data) {
          getProject();
          setPopup(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUser(projectId) {
    console.log(projectId);
    setAction("Users");
    if (user.projectId === projectId) {
      setUser((pv) => ({ ...pv, flag: !pv.flag, projectId: projectId }));
    } else {
      setUser((pv) => ({ ...pv, flag: true, projectId: projectId }));
    }
  }
  function handleOverview(project) {
    setAction("Overview");
    if (Overview.project === null || Overview.project.id === project.id) {
      setOverview((pv) => ({ ...pv, flag: !pv.flag, project: project }));
    } else {
      setOverview((pv) => ({ ...pv, flag: true, project: project }));
    }
  }
  function handleEdit(project) {
    setAction("Edit");
    if (edit.project === null || edit.project.id === project.id) {
      setEdit((pv) => ({ ...pv, flag: !pv.flag, project: project }));
    } else {
      setEdit((pv) => ({ ...pv, flag: true, project: project }));
    }
  }

  const handleWorkflow = (projectId) => {
    setAction("workflow");
    if (showWorkflow.projectId === projectId) {
      setShowWorkflow((pv) => ({
        ...pv,
        flag: !pv.flag,
        projectId: projectId,
      }));
    } else {
      setShowWorkflow((pv) => ({ ...pv, flag: true, projectId: projectId }));
    }
    setDisplayWorkflow(0);
  };

  const columns = [
    {
      headerName: "S.no",
      field: "sno",
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
      flex: 1,
      align: "left",
      sortable: false,
    },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "automation_name",
      headerName: "Automation Framework",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      headerName: "Favourite",
      renderCell: (param) => {
        if (param.row.favourite === true) {
          return (
            <Tooltip title="Remove From Favourite">
              <IconButton
                onClick={() => {
                  DeleteFromFavourite(param.row.id, param.row.user_id);
                }}
              >
                <StarIcon></StarIcon>
              </IconButton>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title="Add to Favourite">
              <IconButton
                onClick={(e) => {
                  AddToFavourite(param.row.id, param.row.user_id);
                }}
              >
                <StarBorderOutlinedIcon></StarBorderOutlinedIcon>
              </IconButton>
            </Tooltip>
          );
        }
      },
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <div className="actionIcons">
            <Tooltip title="Overview">
              <IconButton
                onClick={(e) => {
                  handleOverview(param.row);
                }}
              >
                {" "}
                <img src="view.svg" alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  handleEdit(param.row);
                }}
              >
                <img src="edit.svg" alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Workflow">
              <IconButton onClick={() => handleWorkflow(param.row)}>
                <img src="workflow.svg" alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={(e) => {
                  handleDeletePopup(param.row.id, param.row.user_id);
                }}
              >
                {" "}
                <img src="trash.svg" alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="User">
              {/* <IconButton onClick={()=>{setUser((pv)=>({...pv,'flag':!pv.flag,'projectId':param.row.project_id}))}}><PeopleIcon  ></PeopleIcon></IconButton> */}
              <IconButton
                onClick={(e) => {
                  handleUser(param.row.id);
                }}
              >
                <img src="user.svg" alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Execution">
              <IconButton>
                <img src="execute.svg" alt="" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Analytics">
              <IconButton onClick={() => setAction("Analytics")}>
                <img src="analytics.svg" alt="" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  function handleDeletePopup(pid, uid) {
    setPopup(true);
    console.log(popheader, popmessage);
    // callback = DeleteProjectFromUser(pid,uid);
    setPid(pid);
    setUid(uid);
  }

  useEffect(() => {
    getProject();
    // getProjects(setRow)
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="recentProjects">
      <AccordionTemplate
        name="Projects"
        defaultState={true}
        toggle={collapseProject}
      >
        <div className="tableTopSection fd-r">
          <Button
            onClick={() => {
              setCreateProject((pv) => !pv);
              setAction("CreateProject");
            }}
            variant="contained"
            endIcon={createProject ? <RemoveIcon></RemoveIcon> : <AddIcon />}
          >
            Create Project{" "}
          </Button>
        </div>
        <Table
          rows={row.slice(0, 10)}
          columns={columns}
          hidefooter={true}
        ></Table>
        {showWorkflow.flag && action === "workflow" && (
          <WorkflowDropdown
            project={showWorkflow.projectId}
            setDisplayWorkflow={setDisplayWorkflow}
            setCollapseProject={setCollapseProject}
          />
        )}
      </AccordionTemplate>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added to Favourite
        </Alert>
      </Snackbar>

      <div className="actions">
        {createProject && action === "CreateProject" && (
          <CreateProject edit={false}></CreateProject>
        )}

        {action === "Overview" && Overview.flag && (
          <ActionOverview project={Overview.project}></ActionOverview>
        )}

        {user.flag && action === "Users" && (
          <ActionUsers projectId={user.projectId}></ActionUsers>
        )}

        {edit.flag && action === "Edit" && (
          <CreateProject edit={true} project={edit.project}></CreateProject>
        )}
      </div>
      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={popheader}
        message={popmessage}
        onConfirm={() => DeleteProjectFromUser(pid, uid)}
      ></ConfirmPop>
      {/* {showWorkflow.flag && action == "workflow" && <Workflow projectId={showWorkflow.projectId} />} */}
      {displayWorkflow !== 0 && (
        <Workflows project={showWorkflow.projectId} module={displayWorkflow} />
      )}
    </div>
  );
}

export default Recent;
