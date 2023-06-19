import { Button, Grid, Stack, TextareaAutosize } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getApplicationOfProject } from "../../Services/ApplicationService";
import { getTestcasesInProjects } from "../../Services/TestsetService";
import { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import {
  validateForm,
  resetClassName,
} from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import { getSprint, getIssues } from "../../Services/TestCaseService";

function TestsetCreate() {
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  const [testcaseObject, setTestcaseObject] = useState([]);
  const [testsetName, setTestsetName] = useState("");
  const [testsetDesc, setTestsetDesc] = useState("");
  const [command, setCommand] = useState("");

  const testset_name = useRef();
  const testset_desc = useRef();
  const [leftTestcase, setLeftTestcase] = useState([]);
  const [rightTestcase, setRightTestcase] = useState([]);
  const [TSCreateSuccessMsg, setTSCreateSuccessMsg] = useState(false);
  const [TSCreateErrorMsg, setTSCreateErrorMsg] = useState(false);
  const [applicationList, setapplicationList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  let requiredOnlyAlphabets = [testset_name, testset_desc];
  let autoComplete = ["projectAutocomplete", "applicationAutocomplete"];
  const [validationMsg, setValidationMsg] = useState(false);
  const [tcListValidationMsg, setTcListValidationMsg] = useState(false);
  const navigate = useNavigate();
  let [jiraSprint, setJiraSprint] = useState([]);
  let [jiraIssue, setJiraIssue] = useState([]);

  let sprintData = useRef({
    sprint_id: "",
    sprint_name: "",
    issue_id: 0,
  });
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
      };
    });
  }, []);

  useEffect(() => {
    globalProject?.project_id &&
      getApplicationOfProject(setapplicationList, globalProject?.project_id);
    getSprint(setJiraSprint, globalProject?.project_id);
  }, [globalProject]);

  useEffect(() => {
    if (globalProject?.project_id && globalApplication?.module_id) {
      getTestcasesInProjects(
        setTestcaseObject,
        globalProject?.project_id,
        globalApplication?.module_id
      );
      getTestcasesInProjects(
        setLeftTestcase,
        globalProject?.project_id,
        globalApplication?.module_id
      );
    }
  }, [globalProject?.project_id, globalApplication?.module_id]);

  const submit = (e) => {
    if (
      validateForm(requiredOnlyAlphabets, [], [], [], [], autoComplete, "error")
    ) {
      e.preventDefault();
      const tcList = [];
      if (rightTestcase.length) {
        for (let i = 0; i < rightTestcase.length; i++) {
          if (rightTestcase[i].datasets != null) {
            for (let j = 0; j < rightTestcase[i].datasets.length; j++) {
              tcList.push({
                testcase_id: rightTestcase[i].testcase_id,
                testcase_order: rightTestcase[i].tc_order,
                testcase_dataset_id: rightTestcase[i].datasets[j].dataset_id,
              });
            }
          }
        }
        if (globalApplication?.module_type == 19) {
          var data = {
            testset_name: "TS_" + testsetName.trim(),
            testset_desc: "TS_" + testsetDesc.trim(),
            project_id: selectedProject?.project_id,
            testset_id: 0,
            module_id: globalApplication?.module_id,
            cucumber_tags: command,
            testcases_list: [],
            testset_sprints: sprintData.current,
          };
        } else {
          var data = {
            testset_name: "TS_" + testsetName.trim(),
            testset_desc: "TS_" + testsetDesc.trim(),
            project_id: globalProject?.project_id,
            testset_id: 0,
            module_id: globalApplication?.module_id,
            testcases_list: tcList,
            testset_sprints: sprintData.current,
          };
        }

        axiosPrivate
          .post(`qfservice/webtestset/createWebTestset`, data)
          .then((res) => {
            if (res.data.message === "Testset already exists.") {
              setTSCreateErrorMsg(true);
              setTimeout(() => {
                setTSCreateErrorMsg(false);
              }, 3000);
            } else {
              setTSCreateSuccessMsg(true);
              setTimeout(() => {
                setTSCreateSuccessMsg(false);
                navigate("/Testset/Recent");
              }, 3000);
              setTestsetName("");
              setTestsetDesc("");
              setLeftTestcase([]);
              setRightTestcase([]);
            }
          });
        setTestsetName("");
        setTestsetDesc("");
      } else {
        setTcListValidationMsg(true);
        setTimeout(() => {
          setTcListValidationMsg(false);
        }, 3000);
      }
    } else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false);
      }, 3000);
      console.log("Invalid form");
    }
  };

  return (
    <div onClick={resetClassName}>
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Grid container direction="row" spacing={2}>
          <Grid item md={3}>
            <label>Sprint</label>
            <select
              defaultValue={jiraSprint[0]}
              onChange={(e) => {
                getIssues(
                  setJiraIssue,
                  globalApplication.project_id,
                  e.target.value
                );
                sprintData.current.sprint_id = e.target.value;
                sprintData.current.sprint_name = " ";
              }}
            >
              {jiraSprint?.map((s) => (
                <option key={s.id} value={s.sprint_name}>
                  {s.sprint_name}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item md={3}>
            <label>Issues</label>
            <select
              onChange={(e) => {
                sprintData.current.issue_id = e.target.value;
              }}
            >
              {jiraIssue?.map((s) => (
                <option key={s.id} value={s.issue_id}>
                  {s.key}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item md={6}>
            <ProjectnApplicationSelector
              globalProject={globalProject}
              setglobalProject={setglobalProject}
              globalApplication={globalApplication}
              setglobalApplication={setglobalApplication}
            />
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Testset Name <span className="importantfield">*</span>
              </label>
              <input
                ref={testset_name}
                type="text"
                name=""
                placeholder=" Testset Name"
                onChange={(e) => setTestsetName(e.target.value)}
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Description <span className="importantfield">*</span>
              </label>
              <input
                ref={testset_desc}
                type="text"
                name=""
                placeholder=" Description"
                onChange={(e) => setTestsetDesc(e.target.value)}
              />
            </Stack>
          </Grid>
          {globalApplication?.module_type == 19 ? (
            <Grid item md={12}>
              <Stack spacing={1}>
                <label>
                  Command <span className="importantfield">*</span>
                </label>
                <TextareaAutosize
                  // ref={command}
                  type="text"
                  name=""
                  style={{ height: 250 }}
                  // placeholder="command"
                  onChange={(e) => setCommand(e.target.value)}
                />
              </Stack>
            </Grid>
          ) : (
            <>
              <Grid item xs={4} sm={4} md={5}>
                <label>Select Testcase:</label>
                <select
                  id="left"
                  multiple
                  style={{ padding: "10px", marginTop: "10px" }}
                >
                  {leftTestcase?.length > 0
                    ? leftTestcase
                        .filter((el) => {
                          return !rightTestcase.some((f) => {
                            return f.testcase_id === el.testcase_id;
                          });
                        })
                        .map((ts) => (
                          <option value={ts.testcase_id}>{ts.name}</option>
                        ))
                    : []}
                </select>
              </Grid>
              <Grid item xs={1} sm={1} md={1} sx={{ marginTop: "30px" }}>
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
              <Grid item xs={4} sm={4} md={6}>
                <label>Selected Testcases:</label>
                <select
                  id="right"
                  multiple
                  style={{ padding: "10px", marginTop: "10px" }}
                >
                  {rightTestcase.length > 0
                    ? rightTestcase.map((ts) => (
                        <option value={ts.testcase_id}>{ts.name}</option>
                      ))
                    : []}
                </select>
              </Grid>{" "}
            </>
          )}
        </Grid>
        <Stack mt={2} spacing={2} direction="row-reverse">
          <Button variant="contained" type="submit" onClick={submit}>
            Save & Continue
          </Button>
          <Button
            sx={{ color: "grey", textDecoration: "underline" }}
            onClick={() => navigate("/Testset/Recent")}
          >
            Cancel
          </Button>
        </Stack>
        <SnackbarNotify
          open={validationMsg}
          close={setValidationMsg}
          msg="Fill all the required fields"
          severity="error"
        />
        <SnackbarNotify
          open={tcListValidationMsg}
          close={setTcListValidationMsg}
          msg="Select atleast one testcase"
          severity="error"
        />
        <SnackbarNotify
          open={TSCreateSuccessMsg}
          close={setTSCreateSuccessMsg}
          msg="Testset Created successfully"
          severity="success"
        />
        <SnackbarNotify
          open={TSCreateErrorMsg}
          close={setTSCreateErrorMsg}
          msg="Testset already exists.Please change the name"
          severity="error"
        />
      </div>
    </div>
  );
}

export default TestsetCreate;
