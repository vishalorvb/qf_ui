import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useHead from "../../hooks/useHead";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";
import { Container, Stack } from "@mui/system";
import { validateForm } from "../../CustomComponent/FormValidation";
import { useLocation, useNavigate } from "react-router";
import axios, { axiosPrivate } from "../../api/axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import PhaseDetails from "./PhaseDetails";

function Phases() {
    const location = useLocation();
    const [phaseName, setPhaseName] = useState("");
    const [totalTestcases, setTotalTestcases] = useState(0);
    const [automatedTestcases, setAutomatedTestcases] = useState(0);
    const [completedTestcases, setCompletedTestcases] = useState(0);
    const [functionalTestcases, setFunctionalTestcases] = useState(0);
    const [regressionTestcases, setRegressionTestcases] = useState(0);
    const [savedHours, setSavedHours] = useState([]);
    const [phaseList, setPhaseList] = useState([]);
    const phase_name = useRef();
    const total_testcases = useRef(0);
    const automated_testcases = useRef(0);
    const completed_testcases = useRef(0);
    const functional_testcases = useRef(0);
    const regression_testcases = useRef(0);
    const saved_hours = useRef(0);
    const navigate = useNavigate();
    const [validationMsg, setValidationMsg] = useState(false);
    const [addSuccessMsg, setAddSuccessMsg] = useState(false);
    const [addErrorMsg, setAddErrorMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [openNewPhase, setOpenNewPhase] = useState(true);
    const [openPhase, setOpenPhase] = useState(false);
    var phases = location.state.param1 ? location.state.param1 : 0;
    var projectId = location.state.param2 ? location.state.param2 : 0;

    let requiredOnlyNumbers = [total_testcases, automated_testcases, completed_testcases,functional_testcases,regression_testcases,saved_hours];
    let requiredOnlyAlphabets = [phase_name];

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
        var data = {
          id: 0,
          project_id: projectId,
          phase: phaseName.trim(),
          total_tc: totalTestcases.trim(),
          automated_tc: automatedTestcases.trim(),
          completed_tc: completedTestcases.trim(),
          total_functional_tc: functionalTestcases.trim(),
          total_regression_tc: regressionTestcases.trim(),
          executed: 0,
          has_phase_chart: 0,
          efforts_saving: savedHours.trim(),
        };

        axiosPrivate
          .post(`/Biservice/projects/phases/create`, data)
          .then((res) => {
            console.log(res.data.message);
            setMsg(res.data.message);
            if (res.data.message === "Succesfully Created Phase") {
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

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "BI Testset Reports",
      };
    });
  }, []);

  useEffect(() => {
    projectId &&
      axios.get(`Biservice/projects/${projectId}/phases`).then((resp) => {
        console.log(resp?.data?.info?.phases);
        const phases = resp?.data?.info ? resp?.data?.info?.phases : [];
        setPhaseList(phases);
      });
  }, [projectId])
  

  return (
    <>
      <Grid container>
        <Grid item container md={3}>
          <Grid item container mt={0}>
            <List sx={{ maxWidth: 500, width: "90%" }}>
              <Grid item xs={2} sm={4} md={12}>
                <ListItem button>
                  <ListItemButton
                    onClick={() => {
                      setOpenNewPhase(true);
                      // setOpenPhase(false);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add New" secondary="Phase" />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              {Array.from(Array(phases)).map((_, index) => (
                <Grid item xs={2} sm={4} md={12} key={index} mt={1}>
                  <ListItem button>
                    <ListItemButton
                      onClick={() => {
                        setOpenNewPhase(false);
                        // setOpenPhase(true);
                        <PhaseDetails 
                          projectId = {projectId}
                          phaseId = {phaseList[index].id}
                        />
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                            <AssignmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Phase " + (index + 1)}
                        secondary="Phase"
                      />
                    </ListItemButton>
                  </ListItem>
                  {index != (phases - 1) ? <Divider sx={{ mt: 1 }} /> : ""}
                </Grid>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid item container md={0.5}>
          <Divider orientation="vertical" />
        </Grid>
        {openNewPhase ? (
          <Grid item container md={8.5}>
            <Grid item container direction="row" spacing={1} mt={2}>
              <Grid item md={12}>
                <Typography variant="h4">Details</Typography>
                {/* <h3></h3> */}
              </Grid>
              <Grid item md={12} mt={3}>
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
                    Automated Testcases{" "}
                    <span className="importantfield">*</span>
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
                    Testcases Completed{" "}
                    <span className="importantfield">*</span>
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
            <Grid item container spacing={1} direction="row-reverse" mt={2}>
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
          </Grid>
        ) : (
          ""
        )}
        {/* {openPhase ? <PhaseDetails/> : ""} */}
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
    </>
  );
}

export default Phases;
