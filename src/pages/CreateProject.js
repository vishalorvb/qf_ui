import { Button, Checkbox, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  validateForm,
  resetClassName,
} from "../CustomComponent/FormValidation";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import AccordionTemplate from "../CustomComponent/AccordionTemplate";
import useHead from "../hooks/useHead";
import { createProject } from "../Services/ProjectService";
import { updateProject } from "../Services/ProjectService";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { MultiSelectElement } from "react-hook-form-mui";


function CreateProject(props) {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  console.log(auth.info)
  const usertoken = localStorage.getItem("token");
  const loggedInId = auth.info.id;
  console.log(loggedInId)
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Project",
      };
    });
  }, []);


  let [repository, setRepository] = useState(false);
  let [pipeline, setPipeline] = useState(false);
  let [database, setDatabase] = useState(false);
  let [collaboration, setCollaboration] = useState(false);
  let [snackbarerror, setSnackbarerror] = useState(false);
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  const [users, setUsers] = useState([]);
  let [selectedUsers, setSelectedUsers] = useState([])

  const navigate = useNavigate();

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
    project_name,
    automation_type,
    issueTracker

  ];
  let specialcharRefs = [];
  let passwordRef = [];
  console.log(props.edit)
  if (props.edit == true) {
  } else {
    passwordRef.push(jenkinsPassword);
    passwordRef.push(dbPassword);
  }
 
  let onlyAlphabets = [];
  let onlynumbers = [];
  let autocompletename = [];

  useEffect(() => {
    if (props.edit) {
      setRepository(true);
      setPipeline(true);
      setDatabase(true);
      setCollaboration(true);
    }
   
  }, []);

  useEffect(() => {
    try {
      console.log(props.project.project_id);
      console.log(props.project)
      console.log(Object.keys(props.project).length)
      project_name.current.value = props.project.project_name;
      project_name.current.disabled = true;
      description.current.value = props.project.description;
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
     
      databaseType.current.value = props.project.db_type;
      databaseName.current.value = props.project.db_name;
      hostName.current.value = props.project.db_host;
      dbUsername.current.value = props.project.db_user_name;
      portNumber.current.value = props.project.db_port;

    } catch (error) {
      console.warn(error);
    }
   
  }, [props, repository, pipeline, database, collaboration]);

  function submitHandler() {
   
    console.log("Calling submitHandler");
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
      let data = {
        projectName: project_name.current.value,
        projectDesc: description.current.value,
        issueTrackerType: issueTracker.current.value,
        jira_project_id: "",
        sqeProjectId: 0,
        userId: 4,
        orgId: 1,
        repository_url: gitUrl.current.value,
        repository_token: gitAccessToken.current.value,
        jenkins_token: jenkinsToken.current.value,
        jenkins_url: jenkinsUrl.current.value,
        jenkins_user_name: jenkinsUsername.current.value,
        jenkins_password: jenkinsPassword.current.value,
        automation_framework_type: automation_type.current.value,
        db_type: databaseType.current.value,
        db_name: databaseName.current.value,
        db_user_name: dbUsername.current.value,
        db_password: dbPassword.current.value,
        db_port: portNumber.current.value,
        db_host: hostName.current.value,
        org_name: "",
        jira_url: url.current.value,
        jira_password: token.current.value,
        jira_user_name: userName.current.value,
        jira_project_key: projects.current.value,
        user_access_permissions: "[]",
        gitOps: true
      }
      try {
        data.sqeProjectId = props.project.project_id
        console.log("inside try block of data")
        updateProject(data)
      } catch (error) {
        console.log(error)
        createProject(data).then(res => {
          if (res == 'SUCCESS') {
            setSnackbarsuccess(true)
            navigate("/projects")
          }
          else {
            console.log("not create project")
            setSnackbarerror(true)
          }
        })
      }

    }
    console.log("error in form")
    setSnackbarerror(true)

  }


  useEffect(() => {
    axios.get(`/qfauthservice/user/listUsers?orgId=${auth.info.organization_id}&ssoId=${auth.info.ssoId}`,
      {
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
      }).then(res => {
        // console.log(res.data.info)
        setUsers(res.data.info);
      })
  }, []);
  useEffect(() => {
  console.log(selectedUsers)
  }, [selectedUsers])
  return (
    <div className="accordionParent" onClick={resetClassName}>

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
      <AccordionTemplate name="Project Information">
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

                <option value={1}>Selenium</option>

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
      </AccordionTemplate>

      <AccordionTemplate name="Repository">
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
      </AccordionTemplate>

      <AccordionTemplate name="CICD Pipeline">
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
      </AccordionTemplate>

      <AccordionTemplate name="Database">
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
      </AccordionTemplate>

      <AccordionTemplate name="Collaboration">
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
                Select Issue Tracker <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>


              <select
                ref={issueTracker}
                style={{ height: "28px" }}
              >
                <option value="">Select</option>

                <option value={1}>Jira</option>
                <option value={2}>Azure</option>

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
        </Container>
      </AccordionTemplate>

      <AccordionTemplate name="Add User">
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
                Select User:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
          <select
          onChange={e=>{
            setSelectedUsers(pv=>[...pv,e.target.value])
          }}
          multiple
          >
            <option value="">Select user</option>
            {users.map(user=><option value={user.id}>{user.firstName}</option>)}
            {/* {users} */}
          </select>
             

            </Grid>
          </Grid>
        </Container>
      </AccordionTemplate>

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
    </div>
  );
}

export default CreateProject;
