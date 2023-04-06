import { Autocomplete, Button, Grid, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useAuth from "../../hooks/useAuth";
import { getProject } from "../../Services/ProjectService";
import { getApplicationOfProject } from "../../Services/ApplicationService";
import { getTestcasesInProjects } from "../../Services/TestsetService";
import axios, { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import {
  validateForm,
  resetClassName,
} from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";

function TestsetCreate() {
  const [testcaseObject, setTestcaseObject] = useState([]);
  const location = useLocation();
  const [testsetName, setTestsetName] = useState("");
  const [testsetDesc, setTestsetDesc] = useState("");
  const testset_name = useRef();
  const testset_desc = useRef();
  const [leftTestcase, setLeftTestcase] = useState([]);
  const [rightTestcase, setRightTestcase] = useState([]);
  const [TSCreateSuccessMsg, setTSCreateSuccessMsg] = useState(false);
  const [projectsList, setProjectList] = useState([]);
  const [applicationList, setapplicationList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});
  const { auth } = useAuth();
  console.log(auth.info);
  let requiredOnlyAlphabets = [testset_name, testset_desc];
  let autoComplete = ["projectAutocomplete", "applicationAutocomplete"];
  const [validationMsg, setValidationMsg] = useState(false);
  const navigate = useNavigate();
  console.log(location);
  // let ProjectId = location.state.param2;
  // let ApplicationId = location.state.param3;

  const ITEM_HEIGHT = 18;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function handleSelect(event) {
    let e = document.getElementById("left");
    let remaining = leftTestcase.filter((ts) => ts.datasets != null);
    for (let i = 0; i < e.options.length; i++) {
      console.log(e.options[i].selected);
      if (e.options[i].selected) {
        let temp = testcaseObject.filter(
          (ts) => ts.testcase_id == e.options[i].value
        );
        remaining = remaining.filter(
          (ts) => ts.testcase_id != e.options[i].value
        );
        if (temp.length > 0) {
          setRightTestcase((pv) => [...pv, temp[0]]);
        }
      }
      setLeftTestcase(remaining);
    }
  }

  function handleUnselect(event) {
    let e = document.getElementById("right");
    let remaining = rightTestcase.filter((ts) => ts.datasets != null);
    for (let i = 0; i < e.options.length; i++) {
      if (e.options[i].selected) {
        let temp = testcaseObject.filter(
          (ts) => ts.testcase_id == e.options[i].value
        );
        remaining = remaining.filter(
          (ts) => ts.testcase_id != e.options[i].value
        );
        if (temp.length > 0) {
          setLeftTestcase((pv) => [...pv, temp[0]]);
        }
      }
      setRightTestcase(remaining);
    }
  }

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Testset",
        plusButton: false,
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);

  const submit = (e) => {
    if (
      validateForm([], [], [], requiredOnlyAlphabets, [], autoComplete, "error")
    ) {
      e.preventDefault();
      const tcList = [];
      for (let i = 0; i < rightTestcase.length; i++) {
        console.log(rightTestcase[i].datasets);
        if (rightTestcase[i].datasets != null) {
          console.log(rightTestcase[i].datasets.length);
          for (let j = 0; j < rightTestcase[i].datasets.length; j++) {
            tcList.push({
              testcase_id: rightTestcase[i].testcase_id,
              testcase_order: rightTestcase[i].tc_order,
              testcase_dataset_id: rightTestcase[i].datasets[j].dataset_id,
            });
          }
        }
      }
      var data = {
        testset_name: "TS_" + testsetName,
        testset_desc: "TS_" + testsetDesc,
        project_id: selectedProject?.project_id,
        testset_id: 0,
        module_id: selectedApplication?.module_id,
        testcases_list: tcList,
      };
      console.log(data);

      axiosPrivate
        .post(`qfservice/webtestset/createWebTestset`, data)
        .then((res) => {
          console.log(res.data.message);
          setTSCreateSuccessMsg(true);
          setTimeout(() => {
            setTSCreateSuccessMsg(false);
            navigate("/testset");
          }, 3000);
          setTestsetName("");
          setTestsetDesc("");
          setLeftTestcase([]);
          setRightTestcase([]);
        });
      setTestsetName("");
      setTestsetDesc("");
    } else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false);
      }, 3000);
      console.log("Invalid form");
    }
  };

  console.log(leftTestcase);

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      const projects = res?.data?.result?.projects_list;
      setProjectList(projects);
      setSelectedProject(projects[0]);
    });
  }, []);

  useEffect(() => {
    setSelectedApplication(applicationList[0]);
  }, [applicationList]);

  useEffect(() => {
    selectedProject?.project_id &&
      getApplicationOfProject(setapplicationList, selectedProject?.project_id);
  }, [selectedProject]);

  useEffect(() => {
    getTestcasesInProjects(setTestcaseObject, selectedProject?.project_id);
    getTestcasesInProjects(setLeftTestcase, selectedProject?.project_id);
  }, [selectedProject?.project_id]);

  return (
    <div onClick={resetClassName}>
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Paper
          elevation={1}
          sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}
        >
          <div>
            <form>
              <div>
                <Container
                  component={"div"}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
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
                    <Grid item xs={6} sm={6} md={3}>
                      <label>
                        Project <span className="importantfield">*</span>:
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6} md={8}>
                      <Autocomplete
                        disablePortal
                        disableClearable
                        id="project_id"
                        options={projectsList}
                        value={selectedProject || null}
                        sx={{ width: "90%" }}
                        getOptionLabel={(option) => option.project_name}
                        onChange={(e, value) => {
                          setSelectedProject(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Projects"
                            size="small"
                          />
                        )}
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
                    <Grid item xs={6} sm={6} md={3}>
                      <label>
                        Application <span className="importantfield">*</span>:
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6} md={8}>
                      <Autocomplete
                        disablePortal
                        disableClearable
                        id="application_id"
                        options={applicationList}
                        value={selectedApplication || null}
                        sx={{ width: "90%" }}
                        getOptionLabel={(option) => option.module_name}
                        onChange={(e, value) => {
                          console.log(value);
                          setSelectedApplication(value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Applications"
                            size="small"
                          />
                        )}
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
                    <Grid item xs={6} sm={6} md={3}>
                      <label>
                        Testset Name <span className="importantfield">*</span>:
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6} md={7.25}>
                      <input
                        ref={testset_name}
                        type="text"
                        name=""
                        placeholder=" Testset Name"
                        onChange={(e) => setTestsetName(e.target.value)}
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
                    <Grid item xs={6} sm={6} md={3}>
                      <label>
                        Description{" "}
                        <span className="importantfield">*</span>:
                      </label>
                    </Grid>
                    <Grid item xs={6} sm={6} md={7.25}>
                      {" "}
                      <input
                        ref={testset_desc}
                        type="text"
                        name=""
                        placeholder=""
                        onChange={(e) => setTestsetDesc(e.target.value)}
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
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={4} sm={4} md={4}>
                      <label>Select Testcase:</label>
                      <select id="left" multiple style={{ padding: "10px" }}>
                        {leftTestcase.length > 0
                          ? leftTestcase
                              .filter((ts) => ts.datasets != null)
                              .map((ts) => (
                                <option value={ts.testcase_id}>
                                  {ts.name}
                                </option>
                              ))
                          : []}
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
                      <label>Select Testcase:</label>
                      <select id="right" multiple style={{ padding: "10px" }}>
                        {rightTestcase.length > 0
                          ? rightTestcase
                              .filter((ts) => ts.datasets != null)
                              .map((ts) => (
                                <option value={ts.testcase_id}>
                                  {ts.name}
                                </option>
                              ))
                          : []}
                      </select>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    onClick={submit}
                    startIcon={<AddOutlinedIcon />}
                    sx={{
                      marginLeft: "45%",
                      marginRight: "auto",
                      marginBottom: "10px",
                      marginTop: "25px",
                    }}
                  >
                    Create
                  </Button>
                </Container>
              </div>
            </form>
          </div>
        </Paper>
        <SnackbarNotify
          open={validationMsg}
          close={setValidationMsg}
          msg="Fill all the required fields"
          severity="error"
        />
        <SnackbarNotify
          open={TSCreateSuccessMsg}
          close={setTSCreateSuccessMsg}
          msg="Testset Created successfully"
          severity="success"
        />
      </div>
    </div>
  );
}

export default TestsetCreate;
