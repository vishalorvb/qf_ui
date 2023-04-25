import {
  Autocomplete,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
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
  const [command, setCommand] = useState("");

  const testset_name = useRef();
  const testset_desc = useRef();
  const [leftTestcase, setLeftTestcase] = useState([]);
  const [rightTestcase, setRightTestcase] = useState([]);
  const [TSCreateSuccessMsg, setTSCreateSuccessMsg] = useState(false);
  const [projectsList, setProjectList] = useState([]);
  const [applicationList, setapplicationList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedApplication, setSelectedApplication] = useState({});
  const { auth } = useAuth();
  let requiredOnlyAlphabets = [testset_name, testset_desc];
  let autoComplete = ["projectAutocomplete", "applicationAutocomplete"];
  const [validationMsg, setValidationMsg] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      const projects = res?.data?.result?.projects_list;
      setProjectList(projects);
      setSelectedProject(projects[0]);
    });
  }, []);

  useEffect(() => {
    selectedProject?.project_id &&
      getApplicationOfProject(setapplicationList, selectedProject?.project_id);
  }, [selectedProject]);

  useEffect(() => {
    setSelectedApplication(applicationList[0]);
  }, [applicationList]);

  useEffect(() => {
    selectedProject?.project_id && getTestcasesInProjects(setTestcaseObject, selectedProject?.project_id);
    selectedProject?.project_id && getTestcasesInProjects(setLeftTestcase, selectedProject?.project_id);
  }, [selectedProject?.project_id]);

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
      if((selectedApplication?.module_type) == 19){
      var data = {
        testset_name: "TS_" + testsetName,
        testset_desc: "TS_" + testsetDesc,
        project_id: selectedProject?.project_id,
        testset_id: 0,
        module_id: selectedApplication?.module_id,
        cucumber_tags:command,
        testcases_list: []
      };
    }
      else{
        var data = {
          testset_name: "TS_" + testsetName,
          testset_desc: "TS_" + testsetDesc,
          project_id: selectedProject?.project_id,
          testset_id: 0,
          module_id: selectedApplication?.module_id,
          testcases_list: tcList,
        };
      }
      console.log(data);

      axiosPrivate
        .post(`qfservice/webtestset/createWebTestset`, data)
        .then((res) => {
          console.log(res.data.message);
          setTSCreateSuccessMsg(true);
          setTimeout(() => {
            setTSCreateSuccessMsg(false);
            navigate("/Testset/Recent");
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

  return (
    <div onClick={resetClassName}>
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Grid container direction="row" spacing={2}>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>Project <span className="importantfield">*</span></label>
              <Autocomplete
                size="small"
                value={selectedProject || null}
                options={projectsList}
                getOptionLabel={(option) => (option.project_name ? option.project_name : "")}
                onChange={(e, value) => {
                  console.log(value);
                  setSelectedProject(value);
                  setRightTestcase([]);
                }}
                noOptionsText={"Project not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="projectAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>Application <span className="importantfield">*</span></label>
              <Autocomplete
                size="small"
                value={selectedApplication || null}
                options={applicationList}
                getOptionLabel={(option) => (option.module_name ? option.module_name : "" )}
                onChange={(e, value) => {
                  console.log(value);
                  setSelectedApplication(value);
                }}
                noOptionsText={"Applications not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="applicationAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>Testset Name <span className="importantfield">*</span></label>
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
              <label>Description <span className="importantfield">*</span></label>
              <input
                ref={testset_desc}
                type="text"
                name=""
                placeholder=" Description"
                onChange={(e) => setTestsetDesc(e.target.value)}
              />
            </Stack>
          </Grid>
          {selectedApplication?.module_type == 19 ?
            < Grid item md={6}>
          <Stack spacing={1}>
            <label>Command <span className="importantfield">*</span></label>
            <input
              // ref={command}
              type="text"
              name=""
              style={{ width: "50%vs" , height:100}}
              
              placeholder="command"
              onChange={(e) => setCommand(e.target.value)}
            />
          </Stack>
        </Grid>: <>
        <Grid item xs={4} sm={4} md={5}>
          <label>Select Testcase:</label>
          <select id="left" multiple style={{ padding: "10px", marginTop: "10px" }}>
            {leftTestcase?.length > 0
              ? leftTestcase
                .filter((ts) => ts.datasets != null)
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
          <select id="right" multiple style={{ padding: "10px", marginTop: "10px" }}>
            {rightTestcase.length > 0
              ? rightTestcase
                .filter((ts) => ts.datasets != null)
                .map((ts) => (
                  <option value={ts.testcase_id}>{ts.name}</option>
                ))
              : []}
          </select>
        </Grid> </>
        }
      </Grid>
      <Stack mt={2} spacing={2} direction="row-reverse">
        <Button variant="contained" type="submit" onClick={submit}>
          Save & Continue
        </Button>
        <Button
          sx={{ color: "grey", textDecoration: "underline" }}
          onClick={() => navigate("/testset")}
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
        open={TSCreateSuccessMsg}
        close={setTSCreateSuccessMsg}
        msg="Testset Created successfully"
        severity="success"
      />
    </div>
    </div >
  );
}

export default TestsetCreate;
