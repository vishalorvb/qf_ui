import {Autocomplete,Button,Grid,Paper} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useLocation } from "react-router-dom";
import { getTestcasesInProjects, getTestcasesOfTestset } from "../../Services/TestsetService";
import DeleteTestset from "./DeleteTestset";
import { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import { validateForm, resetClassName } from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";

export default function AddTestcaseToTestset() {
  const [testcaseObject, setTestcaseObject] = useState([]);
  const location = useLocation();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [testsetName, setTestsetName] = useState((location.state.param1.testset_name).slice(3));
  const [testsetDesc, setTestsetDesc] = useState((location.state.param1.testset_desc).slice(3));
  const testset_name = useRef();
  const testset_desc = useRef();
  const [leftTestcase, setLeftTestcase] = useState([]);
  const [rightTestcase, setRightTestcase] = useState([]);
  const [TSUpdateSuccessMsg, setTSUpdateSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const navigate = useNavigate();

  console.log(location.state.param3);
  console.log(location.state.param2);
  var testsetId = location.state.param1.testset_id;
  var projectId = location.state.param2;
  var applicationId = location.state.param3;
  let requiredOnlyAlphabets = [testset_name,testset_desc];

  function handleSelect(event) {
    let e = document.getElementById("left");
    let remaining = leftTestcase.filter(ts =>ts.datasets != null);
    for (let i = 0; i < e.options.length; i++) {
      console.log(e.options[i].selected);
      if (e.options[i].selected) {
        let temp = testcaseObject.filter(ts => ts.testcase_id == e.options[i].value)
        remaining = remaining.filter(ts => ts.testcase_id != e.options[i].value)
        if (temp.length > 0) {
          setRightTestcase(pv => [...pv, temp[0]])
        }
      }
      setLeftTestcase(remaining)
    }
  }

  function handleUnselect(event) {
    let e = document.getElementById("right");
    let remaining = rightTestcase.filter(ts =>ts.datasets != null);
    for (let i = 0; i < e.options.length; i++) {
      console.log(e.options[i].selected);
      if (e.options[i].selected) {
        console.log(testcaseObject.filter(ts => ts.testcase_id == e.options[i].value));
        let temp = testcaseObject.filter(ts => ts.testcase_id == e.options[i].value)
        remaining = remaining.filter(ts => ts.testcase_id != e.options[i].value)
        if (temp.length > 0) {
          setLeftTestcase(pv => [...pv, temp[0]])
        }
      }
      setRightTestcase(remaining)
    }
  }

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Update Testset",
        plusButton: false,
        // plusCallback: addUserHandler,
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
    if (validateForm([], [], [], requiredOnlyAlphabets, [], [], "error")) {
      e.preventDefault();
      const tcList = [];
      for (let i = 0; i < rightTestcase.length; i++) {
        console.log(rightTestcase[i].datasets);
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
      var data = {
        testset_name: "TS_" + testsetName,
        testset_desc: "TS_" + testsetDesc,
        project_id: projectId,
        testset_id: testsetId,
        module_id: applicationId,
        testcases_list: tcList,
      };
      console.log(data);

      axiosPrivate
        .post(`qfservice/webtestset/createWebTestset`, data)
        .then((res) => {
          console.log(res.data.message);
          // setTestsetObject(res.data.message);
          setTSUpdateSuccessMsg(true);
          setTimeout(() => {
            setTSUpdateSuccessMsg(false);
            navigate("/testset");
          }, 3000);
        });
    } else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false);
      }, 3000);
      console.log("Invalid form");
    }
  };

  useEffect(() => {
    console.log(getTestcasesInProjects(setTestcaseObject, projectId));
    getTestcasesInProjects(setTestcaseObject, projectId);
    getTestcasesInProjects(setLeftTestcase, projectId);
    getTestcasesOfTestset(setRightTestcase, testsetId);
  }, []);

  console.log(testcaseObject);
  console.log(leftTestcase);
  console.log(rightTestcase);

  return (
    <div onClick={resetClassName}>
      <SnackbarNotify open={validationMsg} close={setValidationMsg} msg="Fill all the required fields" severity="error"/>
      <SnackbarNotify open={TSUpdateSuccessMsg} close={setTSUpdateSuccessMsg} msg="Testset Updated successfully" severity="success"/>
      <Paper
        elevation={1}
        sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}
      >
        <Container
          component={"div"}
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "10px",
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
                Testset Name <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={8} sm={6} md={8}>
              <input
                ref={testset_name}
                value={testsetName}
                // ref={first_name}
                onChange={(e) => {
                  setTestsetName(e.target.value);
                }}
                placeholder="Enter First Name"
              ></input>
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
              Testset Description <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={8} sm={6} md={8}>
              <input
                ref={testset_desc}
                value={testsetDesc}
                // ref={last_name}
                onChange={(e) => {
                  setTestsetDesc(e.target.value);
                }}
                placeholder="Enter Last Name"
              ></input>
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
              <label>
                Select Testcase:
              </label>
              <select
                id="left"
                multiple
                style={{padding:"10px"}}
              >
                {leftTestcase.length > 0 ? leftTestcase.filter(ts =>ts.datasets != null).map(ts => <option value={ts.testcase_id}>{ts.name}</option>) : []}
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
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <label>
                Select Testcase:
              </label>
              <select
                id="right"
                multiple
                style={{padding:"10px"}}
              >
                <option value="">Select Testcase</option>
                {rightTestcase.length > 0 ? rightTestcase.filter(ts =>ts.datasets != null).map(ts => <option value={ts.testcase_id}>{ts.name}</option>) : []}
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
            Update
          </Button>
        </Container>
      </Paper>
      <div className="datatable" style={{ marginTop: "15px" }}>
        {openDelete ? (
          <DeleteTestset
            object={deleteObject}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
