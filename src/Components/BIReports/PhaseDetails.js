import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Container, Stack } from "@mui/system";
import { validateForm } from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router";
import axios, { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

function PhaseDetails(props) {
  const { projectId, phaseId} = props;
  const [phaseDetail, setPhaseDetail] = useState([]);
  useEffect(() => {
    phaseId &&
      axios.post(`Biservice/projects/phases/details?phase_id=${phaseId}`).then((resp) => {
        console.log(resp?.data?.info);
        const phase = resp?.data?.info ? resp?.data?.info : [];
        setPhaseDetail(phase);
      });
  }, [phaseId])
  
  const [phaseName, setPhaseName] = useState(phaseDetail.phase);
  const [totalTestcases, setTotalTestcases] = useState(phaseDetail.total_tc);
  const [automatedTestcases, setAutomatedTestcases] = useState(phaseDetail.automated_tc);
  const [completedTestcases, setCompletedTestcases] = useState(phaseDetail.completed_tc);
  const [functionalTestcases, setFunctionalTestcases] = useState(phaseDetail.total_functional_tc);
  const [regressionTestcases, setRegressionTestcases] = useState(phaseDetail.total_regression_tc);
  const [savedHours, setSavedHours] = useState(phaseDetail.efforts_saving);
  const phase_name = useRef();
  const total_testcases = useRef();
  const automated_testcases = useRef();
  const completed_testcases = useRef();
  const functional_testcases = useRef();
  const regression_testcases = useRef();
  const saved_hours = useRef();
  const navigate = useNavigate();
  const [validationMsg, setValidationMsg] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [msg, setMsg] = useState("");

  let requiredOnlyNumbers = [
    total_testcases,
    automated_testcases,
    completed_testcases,
    functional_testcases,
    regression_testcases,
    saved_hours,
  ];
  let requiredOnlyAlphabets = [phase_name];

  const submit = (e) => {
    if (
      validateForm(
        [],
        [],
        [],
        requiredOnlyAlphabets,
        requiredOnlyNumbers,
        [],
        "error"
      )
    ) {
      var data = {
        "id": phaseDetail.id,
        "project_id": projectId,
        "phase": phaseName.trim(),
        "total_tc": totalTestcases.trim(),
        "automated_tc": automatedTestcases.trim(),
        "completed_tc": completedTestcases.trim(),
        "total_functional_tc": functionalTestcases.trim(),
        "total_regression_tc": regressionTestcases.trim(),
        "executed": phaseDetail.executed,
        "has_phase_chart": phaseDetail.has_phase_chart,
        "efforts_saving": savedHours.trim(),
        "is_default": phaseDetail.is_default
      };

      axiosPrivate
        .post(`/qfuserservice/user/createUser?user_id=0&current_user_id=`, data)
        .then((res) => {
          console.log(res.data.message);
          setMsg(res.data.message);
          if (res.data.message === "User is created successfully.") {
            setAddSuccessMsg(true);
            setTimeout(() => {
              setAddSuccessMsg(false);
              navigate("/BIReports");
            }, 3000);
          } else {
            setAddErrorMsg(true);
            setTimeout(() => {
              setAddErrorMsg(false);
            }, 3000);
          }
        });
    } else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false);
      }, 3000);
      console.log("Invalid form");
    }
  };

  return (
    <Grid item container md={8.5}>
      <Grid item container direction="row" spacing={1} mt={4}>
        <Grid item md={12}>
        <Typography variant="h4">Details</Typography>
        </Grid>
        <Grid item md={12}>
          <Stack spacing={1}>
            <label>
              Phase name <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              ref={phase_name}
              onChange={(e) => setPhaseName(e.target.value)}
              name="phaseName"
              // placeholder=" Enter Phase Name"
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Total Testcases <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              ref={total_testcases}
              onChange={(e) => setTotalTestcases(e.target.value)}
              name="totaltestcases"
              // placeholder=" Enter Last Name"
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Automated Testcases <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              ref={automated_testcases}
              onChange={(e) => setAutomatedTestcases(e.target.value)}
              name="automatedtestcases"
              // placeholder=" Enter Unique Id only"
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Testcases Completed <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              ref={completed_testcases}
              onChange={(e) => setCompletedTestcases(e.target.value)}
              name="completedtestcases"
              // placeholder=" Enter password "
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Total Functional Testcases{" "}
              <span className="importantfield">*</span>
            </label>
            <input
              name="functionaltestcases"
              ref={functional_testcases}
              type="text"
              onChange={(e) => setFunctionalTestcases(e.target.value)}
              // placeholder=" Enter Email"
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Total Regression Testcases{" "}
              <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              ref={regression_testcases}
              onChange={(e) => setRegressionTestcases(e.target.value)}
              name="regressiontestcases"
              // placeholder=" Enter password "
            />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Stack spacing={1}>
            <label>
              Total No. Efforts Saved(hrs){" "}
              <span className="importantfield">*</span>
            </label>
            <input
              name="savedhours"
              ref={saved_hours}
              type="text"
              onChange={(e) => setSavedHours(e.target.value)}
              // placeholder=" Enter Email"
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid item container spacing={1} direction="row-reverse">
        <Grid item>
          <Button variant="contained" type="submit" onClick={submit}>
            Save
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{ color: "grey", textDecoration: "underline" }}
            onClick={() => navigate("/BIReports")}
          >
            Cancel
          </Button>{" "}
        </Grid>
      </Grid>
      <SnackbarNotify
        open={validationMsg}
        close={setValidationMsg}
        msg="Fill all the required fields"
        severity="error"
      />
      <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg={msg}
        severity="success"
      />
      <SnackbarNotify
        open={addErrorMsg}
        close={setAddErrorMsg}
        msg={msg}
        severity="error"
      />
    </Grid>
  );
}

export default PhaseDetails;
