import { Button, Container, Grid, } from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {
  resetClassName,
} from "../CustomComponent/FormValidation";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import AccordionTemplate from "../CustomComponent/AccordionTemplate";
import useHead from "../hooks/useHead";
import { createProject } from "../Services/ProjectService";
import { updateProject } from "../Services/ProjectService";
import useAuth from "../hooks/useAuth";
import { createformData } from "./ProjectData";
import { clearProjectData } from "./ProjectData";
import { validateFormbyName } from "../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../Services/ProjectService";

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
  let [leftuser, setLeftuser] = useState([])
  let [rigthtuser, setRightuser] = useState([])



  function getUserlist() {
    let userlist = []
    rigthtuser.forEach(user => {
      let temp = {
        "user_id": user.id,
        "grafana_role": user.grafana_role
      }
      userlist.push(temp)
    })
    return userlist;
  }

  function submitHandler() {
    let x = getUserlist()
    createformData.user_access_permissions = x
    createformData.userId = auth.info.id

    if (validateFormbyName(["projectname", "automation_framework_type", "desc", "issueTracker"], "error") == true) {

      if (createformData.sqeProjectId == 0) {
        createProject(createformData).then(res => {
          if (res == "SUCCESS") {
            setSnackbarsuccess(true)
            setTimeout(() => {
              navigate("/projects")
            }, 1000);
          }
          else {
            setSnackbarerror(true)
          }
        })
      }
      else {
        updateProject(createformData).then(res => {
          if (res == "SUCCESS") {
            setSnackbarsuccess(true)
            setTimeout(() => {
              navigate("/projects")
            }, 1000);
          }
          else {
            setSnackbarerror(true)
          }
        })

      }
    }
    else {
      setSnackbarerror(true)
    }
  }




  function handleSelect(event) {
    let e = document.getElementById("left")
    let remaining = leftuser
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = users.filter(user => user.id == e.options[i].value)
        remaining = remaining.filter(user => user.id != e.options[i].value)
        if (temp.length > 0) {
          setRightuser(pv => [...pv, temp[0]])
        }
      }
      setLeftuser(remaining)
    }
  }

  function handleUnselect(event) {
    let e = document.getElementById("right")
    let remaining = rigthtuser
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = users.filter(user => user.id == e.options[i].value)
        remaining = remaining.filter(user => user.id != e.options[i].value)
        if (temp.length > 0) {
          setLeftuser(pv => [...pv, temp[0]])
        }
      }
      setRightuser(remaining)
    }
  }


  useEffect(() => {
    getUsers(setUsers, auth.info.organization_id, auth.info.ssoId, usertoken)
    getUsers(setLeftuser, auth.info.organization_id, auth.info.ssoId, usertoken)

  }

    , []);
  useEffect(() => {
    return () => {
      clearProjectData()
    }

  }, []);

  return (
    <div className="accordionParent" onClick={resetClassName}>
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
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Grid container item md={6} sx={{ marginBottom: "10px" }}>
            <Grid item xs={6} sm={6} md={4}>
              <label>
                Project Name <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              <input
                defaultValue={createformData.projectName}
                type="text"
                name="projectname"
                onChange={e => {
                  createformData.projectName = e.target.value;
                }}
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
                onChange={e => {
                  createformData.automation_framework_type = e.target.value;
                }}
                name="automation_framework_type"
              >
                <option value="">Select</option>
                <option selected={createformData.automation_framework_type
                  == 1 ? true : false} value={1}>Selenium</option>
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
              <input
                onChange={e => {
                  createformData.projectDesc = e.target.value;
                }}
                defaultValue={createformData.projectDesc} type="text" name="desc" />
            </Grid>
          </Grid>
        </Container>
      </AccordionTemplate>

      <AccordionTemplate name="Repository">
        <Container
          component={"div"}
          maxWidth={false}
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
                Git URL :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <input defaultValue={createformData.repository_url} type="text" name=""
                onChange={e => {
                  createformData.repository_url = e.target.value;
                }}
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
            <Grid item xs={6} sm={6} md={4}>
              <label>
                Git Access Token :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              <input defaultValue={createformData.repository_token} type="text" name=""
                onChange={e => {
                  createformData.repository_token = e.target.value;
                }}
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
                Branch :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input type="text" name=""

              />
            </Grid>
          </Grid>
        </Container>
      </AccordionTemplate>

      <AccordionTemplate name="CICD Pipeline">
        <Container
          component={"div"}
          maxWidth={false}
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
                Jenkins URL :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              {" "}
              <input defaultValue={createformData.jenkins_url} type="text" name=""
                onChange={e => {
                  createformData.jenkins_url = e.target.value;
                }}
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
                Jenkins Token :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input defaultValue={createformData.jenkins_token} type="text" name=""
                onChange={e => {
                  createformData.jenkins_token = e.target.value;
                }}
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
            <Grid item xs={6} sm={6} md={4}>
              <label>
                Jenkins UserName :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              <input defaultValue={createformData.jenkins_user_name} type="text" name=""
                onChange={e => {
                  createformData.jenkins_user_name = e.target.value;
                }}
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
                Jenkins Password :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input defaultValue={createformData.jenkins_password} type="password" name=""
                onChange={e => {
                  createformData.jenkins_password = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </AccordionTemplate>

      <AccordionTemplate name="Database">
        <Container
          component={"div"}
          maxWidth={false}
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
                Database Type :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.db_type = e.target.value;
                }}
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
                Database Name :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.db_name = e.target.value;
                }}
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
            <Grid item xs={6} sm={6} md={4}>
              <label>
                Host Name :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.db_name = e.target.value;
                }}
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
                DB UserName :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.db_user_name = e.target.value;
                }}
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
            <Grid item xs={6} sm={6} md={4}>
              <label>
                Port Number :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.db_port = e.target.value;
                }}
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
                DB Password :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.db_password = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </AccordionTemplate>

      <AccordionTemplate name="Collaboration">
        <Container
          component={"div"}
          maxWidth={false}
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
                onChange={e => {
                  createformData.issueTrackerType = e.target.value;
                }}
                name="issueTracker"
              >
                <option value="">Select</option>
                <option selected={createformData.issueTrackerType == 1 ? true : false} value={1}>Jira</option>
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
                URL :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={10}>
              <input type="text" name=""
                onChange={e => {
                  createformData.jenkins_url = e.target.value;
                }}
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
            <Grid item xs={6} sm={6} md={4}>
              <label>
                User Name :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.jenkins_user_name = e.target.value;
                }}
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
                Token :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={5}>
              {" "}
              <input type="text" name=""
                onChange={e => {
                  createformData.jenkins_token = e.target.value;
                }}
              />
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
                Projects :
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={7.5}>
              {" "}
              <input type="text" name=""

              />
            </Grid>
            {/* <Grid item xs={6} sm={6} md={2} alignItems="end">
              <Button
                size="small"
                variant="contained"
                sx={{ marginLeft: "5px" }}
              >
                Verify{" "}
              </Button>
            </Grid> */}
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
            <Grid item xs={2} sm={2} md={2}>
              <label>
                Select User:
              </label>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <select
                id="left"
                multiple
              >
                <option value="0">Select user</option>
                {leftuser.map(user => <option value={user.id}>{user.firstName}</option>)}
              </select>
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
              <button type=""
                onClick={handleSelect}
              > {">>"} </button>
              <button type=""
                onClick={handleUnselect}
              > {"<<"} </button>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <label>
                Select User:
              </label>
            </Grid>
            <Grid item xs={3} sm={3} md={3}>
              <select
                id="right"
                multiple
              >
                <option value="">Select user</option>
                {rigthtuser.map(user => <option value={user.id}>{user.firstName}</option>)}
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
