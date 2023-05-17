import {
  Autocomplete,
  Button,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import { GetJiraIssues, GetJiraProjectsAndSprints } from "./TestDesignService";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import { getProject } from "../../Services/ProjectService";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { useNavigate } from "react-router-dom";
import { createformData } from "../ProjectComponents/ProjectData";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const statuses = [
  "New",
  "Backlog",
  "In Progress",
  "Done",
  "Assigned",
  "QA",
  "Validated",
  "Closed",
];
const TestDesign = () => {
  const [sprint, setSprint] = useState("");
  const [project, setProject] = useState("");
  const [projectSprints, setProjectSprints] = useState([]);
  const [issues, setIssues] = useState([]);
  const [projectKey, setProjectKey] = useState("");
  const [statusName, setStatusName] = React.useState([]);
  const [projectsList, setProjectList] = useState([]);

  const { globalProject, setglobalProject } = useHead();
  const [jiraProjectId, setJiraProjectId] = useState();
  const [sqeProjectId, setSqeProjectid] = useState();
  const [sprintList, setSprintList] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.info.id;
  const [empty,setNotEmpty] = useState(false)

  const columns = [
    {
      field: "key",
      headerName: "KEY",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "summary",
      headerName: "Summary",
      flex: 4,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.summary}>
            <div>{params.row.summary}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "issue_type",
      headerName: "Type",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <>
            {params.row.status == "Done" && (
              <button
                style={{
                  backgroundColor: "#96ED68",
                  color: "black",
                  borderRadius: "10px",
                  height: "25px",
                  width: "75px",
                  marginTop: "5px",
                }}
                variant="outlined"
                type="button"
              >
                {params.row.status}
              </button>
            )}
            {params.row.status == "In Progress" && (
              <button
                style={{
                  backgroundColor: "#f7ca18",
                  color: "black",
                  borderRadius: "10px",
                  height: "25px",
                  width: "75px",
                  marginTop: "5px",
                }}
                variant="outlined"
                type="button"
              >
                {params.row.status}
              </button>
            )}
            {params.row.status == "To Do" && (
              <button
                style={{
                  backgroundColor: "#8BD5FC",
                  color: "black",
                  borderRadius: "10px",
                  height: "25px",
                  width: "75px",
                  marginTop: "5px",
                }}
                variant="outlined"
                type="button"
              >
                {params.row.status}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <>
            {params.row.priority == "Low" && (
              <button
                style={{
                  backgroundColor: "#96ED68",
                  color: "white",
                  borderRadius: "10px",
                  height: "25px",
                  width: "60px",
                  marginTop: "5px",
                }}
                variant="outlined"
                type="button"
              >
                {params.row.priority}
              </button>
            )}
            {params.row.priority == "Medium" && (
              <button
                style={{
                  backgroundColor: "#f7ca18",
                  color: "black",
                  borderRadius: "10px",
                  height: "25px",
                  width: "60px",
                  marginTop: "5px",
                }}
                variant="outlined"
                type="button"
              >
                {params.row.priority}
              </button>
            )}
            {params.row.priority == "High" && (
              <button
                style={{
                  backgroundColor: "#DB4437",
                  color: "white",
                  borderRadius: "10px",
                  height: "25px",
                  width: "60px",
                  marginTop: "5px",
                }}
                variant="outlined"
                type="button"
              >
                {params.row.priority}
              </button>
            )}
          </>
        );
      },
    },
    {
      field: "resolution",
      headerName: "Resolution",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "assignee",
      headerName: "Assignee",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "reporter",
      headerName: "Reporter",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return moment(params.row.created_at).format("DD/MM/yyyy");
      },
    },
  ];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatusName(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    console.log(globalProject);
    async function fetchData() {
      const projectsAndSprints = await new Promise((resolve) => {
        GetJiraProjectsAndSprints(
          (res) => {
            if( res !== null)
            {
            setNotEmpty(true)
            setProjectSprints(res);
            setProject(res?.name);
            setProjectKey(res?.key);
            setSprintList(res?.sprints_list);
            setSprint(res?.sprints_list[0]?.name);
            }
          },
          globalProject == null ? sqeProjectId : globalProject?.project_id
        );
      });
      console.log(projectsAndSprints);
      await new Promise((resolve) => {
        GetJiraIssues(
          (res) => {
            if (res !== null) {
              setIssues(res);
            }
          },
          userId,
          globalProject == null ? sqeProjectId : globalProject?.project_id,
          projectsAndSprints?.key,
          projectsAndSprints?.sprints_list[0]?.name,
          statuses
        );
      });
    }
    fetchData();
  }, []);
  useEffect(() => {
    setProject([]);
    setSprintList([]);
    setSprint("");
    setIssues([]);
    async function fetchData() {
      const projectsAndSprints = await new Promise((resolve) => {
        GetJiraProjectsAndSprints(
          (res) => {
            if(res !== null)
            {
            setNotEmpty(true)
            setProjectSprints(res);
            setProject(res?.name);
            setProjectKey(res?.key);
            setSprint(res?.sprints_list[0]?.name);
            setSprintList(res?.sprints_list);
            }
            else
            {
              setNotEmpty(false)
            }
          },
          globalProject == null ? sqeProjectId : globalProject?.project_id
        );
      });

      await new Promise((resolve) => {
        GetJiraIssues(
          (res) => {
            if (res !== null) {
              setIssues(res);
            }
          },
          userId,
          globalProject == null ? sqeProjectId : globalProject?.project_id,
          projectsAndSprints[0]?.key,
          projectsAndSprints[0]?.sprints_list[0]?.name,
          statuses
        );
      });
    }
    fetchData();
  }, [globalProject]);
  useEffect(() => {
    GetJiraIssues(
      (res) => {
        if (res !== null) {
          setIssues(res);
        }
      },
      userId,
      globalProject == null ? sqeProjectId : globalProject?.project_id,
      projectKey,
      sprint,
      statusName
    );
  }, [sprint]);

  useEffect(() => {
    GetJiraIssues(
      (res) => {
        if (res !== null) {
          setIssues(res);
        }
      },
      userId,
      globalProject == null ? sqeProjectId : globalProject?.project_id,
      projectKey,
      sprint,
      statusName
    );
  }, [statusName]);

  useEffect(() => {
    getProject((res) => {
      setProjectList(res);
      setglobalProject(res[0]);
      setJiraProjectId(res[0]?.jira_project_id);
    }, auth.userId);
  }, []);

  useEffect(() => {
    if (globalProject == null) {
      setglobalProject(projectsList[0]);
      setSqeProjectid(projectsList[0]?.project_id);
      setJiraProjectId(projectsList[0]?.jira_project_id);
    }
  }, [projectsList]);

  useEffect(() => {
    if (globalProject?.project_id !== undefined) {
      setJiraProjectId(globalProject?.jira_project_id);
      setSqeProjectid(globalProject?.project_id);
    }
  }, [globalProject]);

  function handleClick() {
    createformData.projectName = globalProject.project_name
    createformData.projectDesc= globalProject.description
    createformData.automation_framework_type = globalProject.automation_framework_type
    createformData.jira_project_id = globalProject.jira_project_id
    createformData.sqeProjectId = globalProject.project_id;
    createformData.userId = auth.info.id;
    createformData.orgId = 1;
    createformData.jenkins_token = globalProject.jenkins_token;
    createformData.jenkins_user_name = globalProject.jenkins_user_name;
    createformData.jenkins_password = globalProject.jenkins_password;
    createformData.gitOps = true;
    createformData.repository_url = globalProject.repository_url;
    createformData.repository_branch = globalProject.repository_branch;
    createformData.repository_token = globalProject.repository_token;
    navigate("/Projects/Recent/Update");
  }
  console.log(globalProject);
  console.log(Object.keys(projectSprints));
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        display="flex"
      >
        <Grid
          container
          md={8}
          justifyContent="flex-start"
          alignItems="center"
          spacing={1.3}
        >
          <Grid item>
            <label htmlFor="">Projects</label>
            <Autocomplete
              disablePortal
              disableClearable
              id="project_id"
              options={projectsList}
              value={globalProject || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option.project_name ?? ""}
              onChange={(e, value) => {
                setJiraProjectId(value?.jira_project_id);
                setglobalProject(value);
                setNotEmpty(false)
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text" {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
          { empty ? <> <Grid item md={2}>
              <InputLabel id="demo-simple-select-label">
                Jira Project
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                size="small"
                fullWidth
              >
                 <MenuItem key={projectSprints.key} value={projectSprints.name}>
                  {projectSprints.name}
                </MenuItem>
              </Select>
            </Grid>
            <Grid item md={2}>
              <InputLabel id="demo-simple-select-label">Sprint</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sprint}
                onChange={(e) => setSprint(e.target.value)}
                size="small"
                fullWidth
              >
                {sprintList?.map((sprint, index) => (
                  <MenuItem key={sprint.id} value={sprint.name}>
                    {sprint.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item md={1.3} style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={""}
                startIcon={<SyncIcon />}
                fullWidth
              >
                Sync
              </Button>
            </Grid> </> : <Grid item md={3} mt={2}>
            <Button
              variant="contained"
              onClick={handleClick}
              startIcon={<SyncIcon />}
              size="small"
            >
              Configure JIRA
            </Button></Grid>
             }
           
        </Grid>
        {empty &&   <Grid item md={4}>
            <Grid item container justifyContent="flex-end">
              <Grid item md={4}>
                <InputLabel id="demo-simple-select-label">
                  Select the status
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  size="small"
                  multiple
                  value={statusName}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  {statuses.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={statusName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>}     
        
      </Grid>

      <Table columns={columns} rows={issues} getRowId={(row) => row.id} />
    </>
  );
};

export default TestDesign;