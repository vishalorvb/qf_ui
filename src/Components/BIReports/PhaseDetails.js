import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Stack } from "@mui/system";
import { validateForm } from "../../CustomComponent/FormValidation";
import { useNavigate } from "react-router";
import axios from "axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { biservice } from "../../Environment";

function PhaseDetails(props) {
  const {
    ProjectId,
    PhaseId,
    PhaseName,
    TotalTestcases,
    AutomatedTestcases,
    CompletedTestcases,
    FunctionalTestcases,
    RegressionTestcases,
    SavedHours,
    Executed,
    PhaseChart,
    IsDefault,
    getPhases,
    setOpenNewPhase,
    setOpenPhase,
  } = props;

  const initialvalues = {
    phaseName: PhaseName,
    totalTestcases: TotalTestcases,
    automatedTestcases: AutomatedTestcases,
    completedTestcases: CompletedTestcases,
    functionalTestcases: FunctionalTestcases,
    regressionTestcases: RegressionTestcases,
    savedHours: SavedHours,
  };
  const [data, setData] = useState();
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

  useEffect(() => {
    setData({ ...initialvalues });
  }, [props]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    if (
      validateForm(
        requiredOnlyNumbers,
        [],
        [],
        requiredOnlyAlphabets,
        [],
        [],
        "error"
      )
    ) {
      var data1 = {
        id: PhaseId,
        project_id: ProjectId,
        phase: data.phaseName.trim(),
        total_tc: data.totalTestcases,
        automated_tc: data.automatedTestcases,
        completed_tc: data.completedTestcases,
        total_functional_tc: data.functionalTestcases,
        total_regression_tc: data.regressionTestcases,
        executed: Executed,
        has_phase_chart: PhaseChart,
        efforts_saving: data.savedHours,
        is_default: IsDefault,
      };
      console.log(data1);
      axios
        .post(`${biservice}/Biservice/projects/phases/create`, data1)
        .then((res) => {
          console.log(res.data.message);
          setMsg(res.data.message);
          if (res.data.message === "Succesfully Created Phase") {
            setAddSuccessMsg(true);
            setOpenNewPhase(true);
            setOpenPhase(false);
            getPhases();
            setTimeout(() => {
              setAddSuccessMsg(false);
              // navigate("/BIReports");
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
  console.log(data);
  return (
    <Grid item container md={8.5}>
      <Grid item container direction="row" spacing={1} mt={2}>
        <Grid item md={12}>
          <Typography variant="h4">Details</Typography>
        </Grid>
        <Grid item md={12} mt={3}>
          <Stack spacing={1}>
            <label>
              Phase name <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              ref={phase_name}
              value={data?.phaseName}
              onChange={handleChange}
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
              value={data?.totalTestcases}
              ref={total_testcases}
              onChange={handleChange}
              name="totalTestcases"
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
              value={data?.automatedTestcases}
              ref={automated_testcases}
              onChange={handleChange}
              name="automatedTestcases"
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
              value={data?.completedTestcases}
              ref={completed_testcases}
              onChange={handleChange}
              name="completedTestcases"
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
              name="functionalTestcases"
              ref={functional_testcases}
              type="text"
              value={data?.functionalTestcases}
              onChange={handleChange}
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
              value={data?.regressionTestcases}
              ref={regression_testcases}
              onChange={handleChange}
              name="regressionTestcases"
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
              name="savedHours"
              ref={saved_hours}
              type="text"
              value={data?.savedHours}
              onChange={handleChange}
              // placeholder=" Enter Email"
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid item container spacing={1} direction="row-reverse" mt={2}>
        <Grid item>
          <Button variant="contained" type="submit" onClick={submit}>
            Update
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
        msg="Phase is updated successfully"
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
