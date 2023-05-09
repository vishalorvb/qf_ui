import {
  Button,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import { GetJiraIssues, GetJiraProjectsAndSprints } from "./TestDesignService";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";


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
"Closed"
];
const TestDesign = () => {
  const [sprint, setSprint] = useState("");
  const [project, setProject] = useState("");
  const [projectSprints, setProjectSprints] = useState([]);
  const [issues, setIssues] = useState([]);
  const [projectKey, setProjectKey] = useState("");
  const [statusName, setStatusName] = React.useState([]);
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
                  backgroundColor: "rgb(234, 255, 0)",
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
                  backgroundColor: "rgb(234, 255, 0)",
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
    setStatusName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  useEffect( () => {
    async function fetchData()
    {
    const projectsAndSprints = await new Promise((resolve) => {
      GetJiraProjectsAndSprints((res) => {
        setProjectSprints(res);
        setProject(res[0]?.name);
        setProjectKey(res[0]?.key);
        setSprint(res[0]?.sprints_list[0]?.name);
      }, 310);
    });
    await new Promise((resolve) => {
      GetJiraIssues(
        (res) => {
          setIssues(res);
        },
        7,
        681,
        projectsAndSprints[0]?.key,
        projectsAndSprints[0]?.sprints_list[0]?.name,
        statuses
      );
    });
  }
  fetchData()
  }, []);

  useEffect(() => {
    GetJiraIssues(
      (res) => {
        setIssues(res);
      },
      7,
      681,
      projectKey,
      sprint,
      statusName
    );
  }, [sprint]);

  useEffect(() => {
    GetJiraIssues(
      (res) => {
        setIssues(res);
      },
      7,
      681,
      projectKey,
      sprint,
      statusName
    );
  }, [statusName]);
 
  
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
          <Grid item md={2}>
            <InputLabel id="demo-simple-select-label">Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              size="small"
              fullWidth
            >
              {projectSprints.map((model, key) => (
                <MenuItem key={key} value={model.name}>
                  {model.name}
                </MenuItem>
              ))}
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
              {projectSprints[0]?.sprints_list.map((sprint, index) => (
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
          </Grid>
        </Grid>
        <Grid item md={4}>
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
          renderValue={(selected) => selected.join(', ')}
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
        </Grid>
      </Grid>

      <Table
        columns={columns}
        rows={issues}
        getRowId={(row) => row.id}
      />
    </>
  );
};

export default TestDesign;
