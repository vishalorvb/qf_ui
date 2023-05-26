import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getTestcasesInProjects,
  getTestcasesOfTestset,
} from "../../Services/TestsetService";
import DeleteTestset from "./DeleteTestset";
import { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import {
  validateForm,
  resetClassName,
} from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router-dom";

export default function AddTestcaseToTestset() {
  const [testcaseObject, setTestcaseObject] = useState([]);
  const location = useLocation();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [testsetName, setTestsetName] = useState(
    location.state.param1.testset_name.slice(3)
  );
  const [testsetDesc, setTestsetDesc] = useState(
    location.state.param1.testset_desc.slice(3)
  );
  const testset_name = useRef();
  const testset_desc = useRef();
  const [leftTestcase, setLeftTestcase] = useState([]);
  const [rightTestcase, setRightTestcase] = useState([]);
  const [TSUpdateSuccessMsg, setTSUpdateSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const navigate = useNavigate();
  const [tcListValidationMsg, setTcListValidationMsg] = useState(false);
  const [TSCreateErrorMsg, setTSCreateErrorMsg] = useState(false);

  console.log(location.state.param3);
  console.log(location.state.param2);
  var testsetId = location.state.param1.testset_id;
  var projectId = location.state.param2;
  var applicationId = location.state.param3;
  let requiredOnlyAlphabets = [testset_name, testset_desc];

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
          console.log(temp);
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
      console.log(e.options[i].selected);
      if (e.options[i].selected) {
        console.log(
          testcaseObject.filter((ts) => ts.testcase_id == e.options[i].value)
        );
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
    if (validateForm(requiredOnlyAlphabets, [], [], [], [], [], "error")) {
      e.preventDefault();
      const tcList = [];
      if (rightTestcase.length) {
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
          testset_name: "TS_" + testsetName.trim(),
          testset_desc: "TS_" + testsetDesc.trim(),
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
            if (res.data.message === "Testset already exists.") {
              setTSCreateErrorMsg(true);
              setTimeout(() => {
                setTSCreateErrorMsg(false);
              }, 3000);
            } else {
              setTSUpdateSuccessMsg(true);
              setTimeout(() => {
                setTSUpdateSuccessMsg(false);
                navigate("/testset/Recent");
              }, 3000);
            }
          });
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

  useEffect(() => {
    projectId && applicationId && getTestcasesInProjects(setTestcaseObject, projectId, applicationId);
    projectId && applicationId && getTestcasesInProjects(setLeftTestcase, projectId, applicationId);
    getTestcasesOfTestset(setRightTestcase, testsetId);
  }, []);
  console.log(testcaseObject);
  console.log(leftTestcase);
  console.log(rightTestcase);

  return (
    <div onClick={resetClassName}>
      <SnackbarNotify
        open={validationMsg}
        close={setValidationMsg}
        msg="Fill all the required fields"
        severity="error"
      />
      <SnackbarNotify
        open={TSUpdateSuccessMsg}
        close={setTSUpdateSuccessMsg}
        msg="Testset Updated successfully"
        severity="success"
      />
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Grid container direction="row" spacing={2}>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Testset Name <span className="importantfield">*</span>
              </label>
              <input
                ref={testset_name}
                value={testsetName}
                // ref={first_name}
                onChange={(e) => {
                  setTestsetName(e.target.value);
                }}
                placeholder="Enter First Name"
              ></input>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack spacing={1}>
              <label>
                Description <span className="importantfield">*</span>
              </label>
              <input
                ref={testset_desc}
                value={testsetDesc}
                // ref={last_name}
                onChange={(e) => {
                  setTestsetDesc(e.target.value);
                }}
                placeholder="Enter Last Name"
              ></input>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={4} md={5}>
            <label>Select Testcase:</label>
            <select id="left" multiple style={{ padding: "10px" }}>
              {leftTestcase.length > 0
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
          <Grid item xs={1} sm={1} md={1} sx={{ marginTop: "25px" }}>
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
          <Grid item xs={4} sm={4} md={6}>
            <label>Selected Testcases:</label>
            <select id="right" multiple style={{ padding: "10px" }}>
              {rightTestcase.length > 0
                ? Array.from(rightTestcase.map(JSON.stringify))
                    .map(JSON.parse)
                    .map((ts) => (
                      <option value={ts.testcase_id}>{ts.name}</option>
                    ))
                : []}
            </select>
          </Grid>
        </Grid>
        <Stack mt={2} spacing={2} direction="row-reverse">
          <Button variant="contained" type="submit" onClick={submit}>
            Update
          </Button>
          <Button
            sx={{ color: "grey", textDecoration: "underline" }}
            onClick={() => navigate("/testset/Recent")}
          >
            Cancel
          </Button>
        </Stack>
      </div>
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
        <SnackbarNotify
          open={tcListValidationMsg}
          close={setTcListValidationMsg}
          msg="Select atleast one testcase"
          severity="error"
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
