import {
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { validateForm, resetClassName } from "../../../FormValidation";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { getAutomationType, AddProject, updateProject } from "../Api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CreateProject(props) {
  console.table(props.project);
  let userId = 112;
  let date = new Date();
  let [projectInformation, setProjectInformation] = useState(true);
  let [repository, setRepository] = useState(false);
  let [pipeline, setPipeline] = useState(false);
  let [database, setDatabase] = useState(false);
  let [collaboration, setCollaboration] = useState(false);
  let [snackbarerror, setSnackbarerror] = useState(false);
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  let [automation, setAutomation] = useState([]);

  let project_name = useRef();
  let automation_type = useRef();
  let description = useRef();
  let gitUrl = useRef();
  let gitAccessToken = useRef();
  let branch = useRef();
  let jenkinsUrl = useRef();
  let jenkinsToken = useRef();
  let jenkinsUsername = useRef();
  let jenkinsPassword = useRef();
  let databaseType = useRef();
  let databaseName = useRef();
  let hostName = useRef();
  let dbUsername = useRef();
  let portNumber = useRef();
  let dbPassword = useRef();
  let issueTracker = useRef();
  let url = useRef();
  let userName = useRef();
  let token = useRef();
  let projects = useRef();

  let requiredFields = [
    description,
    gitUrl,
    jenkinsUrl,
    jenkinsToken,
    gitAccessToken,
    branch,
    jenkinsUsername,
    jenkinsToken,
    databaseName,
    hostName,
    dbUsername,
    portNumber,
    databaseType,
  ];
  let specialcharRefs = [];
  let passwordRef = [];
  if (props.edit) {
  } else {
    passwordRef.push(jenkinsPassword);
    passwordRef.push(dbPassword);
  }
  // let passwordRef = [jenkinsPassword, dbPassword]
  let onlyAlphabets = [project_name];
  let onlynumbers = [automation_type];
  let autocompletename = [];

  useEffect(() => {
    if (props.edit) {
      setRepository(true);
      setPipeline(true);
      setDatabase(true);
      setCollaboration(true);
    }
    getAutomationType(setAutomation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      project_name.current.value = props.project.project_name;
      project_name.current.disabled = true;
      description.current.value = props.project.project_description;
      automation_type.current.value = props.project.automation_framework_type;
      console.log(props.project.automation_framework_type);
      console.warn(automation_type);
      console.warn(automation_type.current.value);
      gitUrl.current.value = props.project.repository_url;
      branch.current.value = props.project.repository_branch;
      gitAccessToken.current.value = props.project.repository_token;
      jenkinsUrl.current.value = props.project.jenkins_url;
      jenkinsToken.current.value = props.project.jenkins_token;
      jenkinsUsername.current.value = props.project.jenkins_user_name;
      // jenkinsPassword.current.value = props.project.jenkins_password
      databaseType.current.value = props.project.db_type;
      databaseName.current.value = props.project.db_name;
      hostName.current.value = props.project.db_host;
      dbUsername.current.value = props.project.db_user_name;
      portNumber.current.value = props.project.db_port;
      // dbPassword.current.value = props.project.db_password
    } catch (error) {
      console.warn(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, repository, pipeline, database, collaboration]);

  function submitHandler() {
    console.log(automation_type.current.value);
    console.log();
    if (
      validateForm(
        requiredFields,
        specialcharRefs,
        passwordRef,
        onlyAlphabets,
        onlynumbers,
        autocompletename,
        "error"
      )
    ) {
      let projectData = {
        is_deleted: false,
        created_by: userId,
        project_name: project_name.current.value,
        created_at: date,
        project_description: description.current.value,
        id: userId,
        repository_url: gitUrl.current.value,
        jenkins_url: jenkinsUrl.current.value,
        jenkins_user_name: jenkinsUsername.current.value,
        jenkins_password: jenkinsPassword.current.value,
        jenkins_token: jenkinsToken.current.value,
        automation_framework_type: automation_type.current.value,
        repository_token: gitAccessToken.current.value,
        jira_project_id: "lmldepdmeodjweo",
        repository_branch: branch.current.value,
        gitops: true,
        automatable_tests: 0,
        defects_opened: 0,
        total_tests: 0,
      };

      let DbData = {
        db_host: hostName.current.value,
        db_password: dbPassword.current.value,
        db_name: databaseName.current.value,
        db_user_name: dbUsername.current.value,
        db_type: dbUsername.current.value,
        db_port: portNumber.current.value,
      };

      if (props.edit) {
        projectData.project_id = props.project.id;
        DbData.db_id = props.project.db_id;
        updateProject(projectData, DbData).then((res) => {
          console.log(res);
          setSnackbarsuccess(true);
        });
      } else {
        AddProject(projectData, DbData).then((res) => {
          console.log(res);
          setSnackbarsuccess(true);
        });
      }

      setTimeout(() => {
        setSnackbarsuccess(false);
      }, 2000);
    } else {
      setSnackbarerror(true);
      setTimeout(() => {
        setSnackbarerror(false);
      }, 2000);
    }
  }
  return (
    <div onClick={resetClassName}>
      {props.edit && <h1>This is Edit</h1>}
      <SnackbarNotify
        open={snackbarerror}
        close={setSnackbarerror}
        msg="All required fields should be filled"
        severity="error"
      />
      <SnackbarNotify
        open={snackbarsuccess}
        close={setSnackbarsuccess}
        msg="Saved Succesfully"
        severity="success"
      />
      <Paper elevation={1} sx={{ marginTop: "10px" }}>
        <Box sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}>
          <ExpandMore
            expand={projectInformation}
            onClick={() => setProjectInformation(!projectInformation)}
            aria-expanded={projectInformation}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant="p" gutterBottom>
            Project Information
          </Typography>
        </Box>
        <Collapse in={projectInformation} timeout="auto" unmountOnExit>
          <Container
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Project Name <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                <input
                  ref={project_name}
                  value={props.project_name}
                  type="text"
                  name=""
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  Automation Framework Type{" "}
                  <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                <select
                  ref={automation_type}
                  style={{ width: "100%", height: "28px" }}
                >
                  <option value="">Select</option>
                  {automation.map((data) => (
                    <option value={data.id}>{data.name}</option>
                  ))}
                </select>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={2}>
                <label>
                  Description <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={10}>
                <input ref={description} type="text" name="" />
              </Grid>
            </Grid>
          </Container>
        </Collapse>
      </Paper>

      <Paper elevation={1} sx={{ marginTop: "10px" }}>
        <Box sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}>
          <ExpandMore
            expand={repository}
            onClick={() => setRepository(!repository)}
            aria-expanded={repository}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant="p" gutterBottom>
            {" "}
            Repository{" "}
          </Typography>
        </Box>
        <Collapse in={repository} timeout="auto" unmountOnExit>
          <Container
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={2}>
                <label>
                  Git URL <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={10}>
                <input ref={gitUrl} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Git Access Token <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                <input ref={gitAccessToken} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  Branch <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={branch} type="text" name="" />
              </Grid>
            </Grid>
          </Container>
        </Collapse>
      </Paper>

      <Paper elevation={1} sx={{ marginTop: "10px" }}>
        <Box sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}>
          <ExpandMore
            expand={pipeline}
            onClick={() => setPipeline(!pipeline)}
            aria-expanded={pipeline}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant="p" gutterBottom>
            CICD Pipeline
          </Typography>
        </Box>
        <Collapse in={pipeline} timeout="auto" unmountOnExit>
          <Container
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Jenkins URL <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                {" "}
                <input ref={jenkinsUrl} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  Jenkins Token <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={jenkinsToken} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Jenkins UserName <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                <input ref={jenkinsUsername} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  Jenkins Password <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={jenkinsPassword} type="text" name="" />
              </Grid>
            </Grid>
          </Container>
        </Collapse>
      </Paper>

      <Paper elevation={1} sx={{ marginTop: "10px" }}>
        <Box sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}>
          <ExpandMore
            expand={database}
            onClick={() => setDatabase(!database)}
            aria-expanded={database}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant="p" gutterBottom>
            Database
          </Typography>
        </Box>
        <Collapse in={database} timeout="auto" unmountOnExit>
          <Container
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Database Type <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                {" "}
                <input ref={databaseType} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  Database Name <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={databaseName} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Host Name <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                {" "}
                <input ref={hostName} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  DB UserName <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={dbUsername} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  Port Number <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                {" "}
                <input ref={portNumber} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  DB Password <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={dbPassword} type="text" name="" />
              </Grid>
            </Grid>
          </Container>
        </Collapse>
      </Paper>

      <Paper elevation={1} sx={{ marginTop: "10px" }}>
        <Box sx={{ marginBottom: "10px", backgroundColor: "primary.main" }}>
          <ExpandMore
            expand={collaboration}
            onClick={() => setCollaboration(!collaboration)}
            aria-expanded={collaboration}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Typography variant="p" gutterBottom>
            Collaboration
          </Typography>
        </Box>
        <Collapse in={collaboration} timeout="auto" unmountOnExit>
          <Container
            component={"div"}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={2}>
                <label>
                  Select Issue Tracker <span className="importantfield">*</span>
                  :
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={10}>
                {" "}
                <input ref={issueTracker} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={2}>
                <label>
                  URL <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={10}>
                <input ref={url} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={4}>
                <label>
                  User Name <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7}>
                {" "}
                <input ref={userName} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={8}
              md={6}
              sx={{ marginBottom: "10px" }}
            >
              <Grid container item xs={6} sm={6} md={7} justifyContent="center">
                <label>
                  Token <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={5}>
                {" "}
                <input ref={token} type="text" name="" />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={6} sm={6} md={2}>
                <label>
                  Projects <span className="importantfield">*</span>:
                </label>
              </Grid>
              <Grid item xs={6} sm={6} md={7.5}>
                {" "}
                <input ref={projects} type="text" name="" />
              </Grid>
              <Grid item xs={6} sm={6} md={2} alignItems="end">
                <Button
                  size="small"
                  variant="contained"
                  sx={{ marginLeft: "5px" }}
                >
                  Verify{" "}
                </Button>
              </Grid>
            </Grid>
            {/* <Grid container item xs={12} sm={12} md={12} sx={{ marginBottom: '10px' }} justifyContent="space-around" >
                            <Button size='small'  variant="contained"  >Verify </Button>
                        </Grid> */}
          </Container>
        </Collapse>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ marginBottom: "20px" }}
          justifyContent="space-around"
        >
          <Button
            size="small"
            sx={{ marginBottom: "10px" }}
            onClick={submitHandler}
            variant="contained"
            startIcon={<SaveIcon></SaveIcon>}
          >
            Save{" "}
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}

export default CreateProject;
