import { Button, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { resetClassName } from "../../CustomComponent/FormValidation";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import { createformData } from "./ProjectData";
import { clearProjectData } from "./ProjectData";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  createProject,
  updateProject,
  getUserOfProject,
} from "../../Services/ProjectService";
import {
  getApplicationOfProject,
  getApplication,
} from "../../Services/ApplicationService";

let automationType = [
  { "Name": "Selenium", "Val": 1 },
  { "Name": "BDD", "Val": 2 },
  { "Name": "Cucumber Automation", "Val": 3 },
  { "Name": "Link Project", "Val": 6 },
  {"Name" : "Mobile", "Val":4 }
]

let errorMsg = ""

function CreateProject() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const usertoken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Project",
      };
    });
  }, []);

  let [snackbarerror, setSnackbarerror] = useState(false);
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  let [users, setUsers] = useState([]);
  let [leftuser, setLeftuser] = useState([]);
  let [rigthtuser, setRightuser] = useState([]);
  let [leftApplication, setLeftApplication] = useState([]);
  let [rightApplication, setRightApplication] = useState([]);
  let [applications, setApplications] = useState([]);

  function getUserlist() {
    let userlist = [];
    rigthtuser.forEach((user) => {
      let temp = {
        user_id: user.id,
        grafana_role: 4,
      };
      userlist.push(temp);
    });
    return userlist;
  }
  function getApplicationlist() {
    let applist = [];
    rightApplication.forEach((app) => {
      console.log(app.module_id);
      applist.push(app.module_id);
    });
    return applist;
  }
  function submitHandler() {
    let x = getUserlist();
    x = JSON.stringify(x);
    let app = getApplicationlist();
    app = app.toString();
    createformData.user_access_permissions = x;
    createformData.applicationsProjectMapping = "[" + app + "]";
    createformData.userId = auth.info.id;
    console.log(createformData);
    if (
      validateFormbyName(
        ["projectname", "automation_framework_type", "desc",],
        "error"
      ) == true
    ) {
      if (createformData.sqeProjectId == "") {
        createProject(createformData).then((res) => {
          if (res == "SUCCESS") {
            setSnackbarsuccess(true);
            setTimeout(() => {
              navigate("/Projects/Recent");
            }, 1000);
          } else {
            errorMsg = "Project Name already exists"
            setSnackbarerror(true);
          }
        });
      } else {
        updateProject(createformData).then((res) => {
          if (res == "SUCCESS") {
            setSnackbarsuccess(true);
            setTimeout(() => {
              navigate("/Projects/Recent");
            }, 1000);
          } else {

            setSnackbarerror(true);
          }
        });
      }
    } else {
      errorMsg = "Fill Required Fields"
      setSnackbarerror(true);
    }
  }

  function handleSelect(event) {
    let e = document.getElementById("left");
    let remaining = leftuser;
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = users.filter((user) => user.id == e.options[i].value);
        remaining = remaining.filter((user) => user.id != e.options[i].value);
        if (temp.length > 0) {
          setRightuser((pv) => [...pv, temp[0]]);
        }
      }
      setLeftuser(remaining);
    }
  }

  function handleUnselect(event) {
    let e = document.getElementById("right");
    let remaining = rigthtuser;
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = users.filter((user) => user.id == e.options[i].value);
        remaining = remaining.filter((user) => user.id != e.options[i].value);
        if (temp.length > 0) {
          setLeftuser((pv) => [...pv, temp[0]]);
        }
      }
      setRightuser(remaining);
    }
  }
  function handleSelectApp(event) {
    let e = document.getElementById("leftapp");
    let remaining = leftApplication;
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = applications.filter(
          (app) => app.module_id == e.options[i].value
        );
        remaining = remaining.filter(
          (user) => user.module_id != e.options[i].value
        );
        if (temp.length > 0) {
          setRightApplication((pv) => [...pv, temp[0]]);
        }
      }
      setLeftApplication(remaining);
    }
  }
  function handleUnSelectApp(event) {
    let e = document.getElementById("rightapp");
    let remaining = rightApplication;
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = applications.filter(
          (app) => app.module_id == e.options[i].value
        );
        remaining = remaining.filter(
          (app) => app.module_id != e.options[i].value
        );
        if (temp.length > 0) {
          setLeftApplication((pv) => [...pv, temp[0]]);
        }
      }
      setRightApplication(remaining);
    }
  }

  useEffect(() => {
    getUsers(setUsers, auth.info.organization_id, auth.info.ssoId, usertoken);
    getUsers(
      setLeftuser,
      auth.info.organization_id,
      auth.info.ssoId,
      usertoken
    );
    getApplication(setApplications, auth.info.id);
    getApplication(setLeftApplication, auth.info.id);
    if (createformData.sqeProjectId != ""){
      getApplicationOfProject(setRightApplication, createformData.sqeProjectId);
    }
    if(createformData.sqeProjectId != ""){
      getUserOfProject(setRightuser, createformData.sqeProjectId);
    }
  }, []);
  useEffect(() => {
    return () => {
      ref?.current?.reset();
      clearProjectData();
    };
  }, []);

  useEffect(() => { }, [applications]);

  const ref = useRef(null);
  return (
    <form ref={ref}>

      <div className="accordionParent" onClick={resetClassName}>
        <SnackbarNotify
          open={snackbarerror}
          close={setSnackbarerror}
          msg={errorMsg}
          severity="error"
        />
        <SnackbarNotify
          open={snackbarsuccess}
          close={setSnackbarsuccess}
          msg="Saved Succesfully"
          severity="success"
        />
        <AccordionTemplate defaultState={true} name="Project Information">
          <Grid container spacing={2} sx={{ marginBottom: "10px" }} >
            <Grid item xs={6} sm={6} md={6}>
              <label>
                Project Name <span className="importantfield">*</span>:
              </label>
              <input
                defaultValue={createformData.projectName}
                type="text"
                name="projectname"
                onChange={(e) => {
                  createformData.projectName = e.target.value;
                }}
                disabled={createformData.sqeProjectId == "" ? false : true}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <label>
                Automation Framework Type{" "}
                <span className="importantfield">*</span>:
              </label>
              <select
                onChange={(e) => {
                  createformData.automation_framework_type = e.target.value;
                }}
                name="automation_framework_type"
                defaultValue={createformData.automation_framework_type}
              >
                {automationType.map(opt => <option key={opt.Val}
                  value={opt.Val}
                >
                  {opt.Name}
                </option>)}
              </select>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <label>
                Description <span className="importantfield">*</span>:
              </label>
              <input
                onChange={(e) => {
                  createformData.projectDesc = e.target.value;
                }}
                defaultValue={createformData.projectDesc}
                name="desc"
              
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Repository">

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ marginBottom: "10px" }}
            spacing={2}
          >
            <Grid item xs={6} sm={6} md={6}>
              <label>Git URL :</label>
              <input
                defaultValue={createformData.repository_url}
                type="text"
                onChange={(e) => {
                  createformData.repository_url = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <label>Git Access Token :</label>
              <input
                defaultValue={createformData.repository_token}
                type="text"
                onChange={(e) => {
                  createformData.repository_token = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <label>Branch :</label>
              <input
                type="text"
                defaultValue={createformData.repository_branch}
                onChange={(e) => {
                  createformData.repository_branch = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </AccordionTemplate>

        <AccordionTemplate name="CICD Pipeline">
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            spacing={2}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={6}>
              <label>Jenkins URL :</label>
              <input
                defaultValue={createformData.jenkins_url}
                type="text"
                onChange={(e) => {
                  createformData.jenkins_url = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <label>Jenkins Token :</label>
              <input
                defaultValue={createformData.jenkins_token}
                type="text"
                name="jenkins_token"
              
                onChange={(e) => {
                  createformData.jenkins_token = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <label>Jenkins UserName :</label>
              <input
                defaultValue={createformData.jenkins_user_name}
                autoComplete="off"
                type="text"
                onChange={(e) => {
                  createformData.jenkins_user_name = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <label>Jenkins Password :</label>
              <input
                defaultValue={createformData.jenkins_password}
                type="password"
                autoComplete="off"
                onChange={(e) => {
                  createformData.jenkins_password = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </AccordionTemplate>

        <AccordionTemplate name="Database">

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ marginBottom: "10px" }}
            spacing={2}
          >
            <Grid item xs={4} sm={4} md={4}>
              <label>Database Type :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.db_type = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>Database Name :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.db_name = e.target.value;
                }}
              />

            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>Host Name :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.db_name = e.target.value;
                }}
              />

            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>DB UserName :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.db_user_name = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>Port Number :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.db_port = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>DB Password :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.db_password = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Collaboration">

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ marginBottom: "10px" }}
            spacing={2}

          >
            <Grid item xs={4} sm={4} md={4}>
              <label>
                Select Issue Tracker <span className="importantfield">*</span>
                :
              </label>
              <select
              defaultValue={createformData.issueTrackerType}
                onChange={(e) => {
                  createformData.issueTrackerType = e.target.value;
                }}
                name="issueTracker"
              >
                <option value="">Select</option>
                <option value={1}>Jira</option>
                <option value={2}>Azure</option>
              </select>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>URL :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.jenkins_url = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>User Name :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.jenkins_user_name = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>Token :</label>
              <input
                type="text"
                onChange={(e) => {
                  createformData.jenkins_token = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>Projects :</label>
              <input type="text" />
            </Grid>
            <Grid item xs={4} sm={4} md={4} justifyContent="center">
              <br />
              <Button variant="contained">
                Verify
              </Button>
            </Grid>
          </Grid>

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
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={4} sm={4} md={4}>
                <label>Select User:</label>
                <select id="left" multiple style={{ padding: "10px" }}>
                  {leftuser.map((user) => (
                    <option value={user.id} key={user.id}>{user.firstName}</option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleSelect}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleUnselect}
                  aria-label="move all right"
                >
                  ≪
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <label>Select User:</label>
                <select id="right" multiple style={{ padding: "10px" }}>
                  <option value="">Select user</option>
                  {rigthtuser.map((user) => (
                    <option value={user.id} key={user.id}>{user.firstName}</option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </Container>
        </AccordionTemplate>

        <AccordionTemplate name="Add Application">
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
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={4} sm={4} md={4}>
                <label>Select Application:</label>
                <select id="leftapp" multiple style={{ padding: "10px" }}>
                  {leftApplication.map((app) => (
                    <option value={app.module_id} key={app.module_id}>{app.module_name}</option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleSelectApp}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleUnSelectApp}
                  aria-label="move all right"
                >
                  ≪
                </Button>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <label>Selected Application:</label>
                <select id="rightapp" multiple style={{ padding: "10px" }}>
                  {rightApplication.map((app) => (
                    <option value={app.module_id} key={app.module_id}>{app.module_name}</option>
                  ))}
                </select>
              </Grid>
            </Grid>
          </Container>
        </AccordionTemplate>
        <Grid item xs={12} md={12}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button variant="contained" onClick={submitHandler} >Save & Continue</Button>
          </Stack>
        </Grid>

      </div>
    </form>
  );
}

export default CreateProject;
