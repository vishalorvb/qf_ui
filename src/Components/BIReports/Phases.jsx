import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useHead from "../../hooks/useHead";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/system";
import { validateForm } from "../../CustomComponent/FormValidation";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import PhaseDetails from "./PhaseDetails";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeletePhase from "./DeletePhase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { biservice } from "../../Environment";

export default function Phases() {
  const location = useLocation();
  const [phaseName, setPhaseName] = useState("");
  const [totalTestcases, setTotalTestcases] = useState(0);
  const [automatedTestcases, setAutomatedTestcases] = useState(0);
  const [completedTestcases, setCompletedTestcases] = useState(0);
  const [functionalTestcases, setFunctionalTestcases] = useState(0);
  const [regressionTestcases, setRegressionTestcases] = useState(0);
  const [savedHours, setSavedHours] = useState(0);
  const [executed, setExecuted] = useState(0);
  const [phaseChart, setPhaseChart] = useState(0);
  const [isDefault, setIsDefault] = useState(false);
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
  const [phaseId, setPhaseId] = useState(false);
  const [phases, setPhases] = useState(
    location.state.param1 ? location.state.param1 : 0
  );
  // var phases = location.state.param1 ? location.state.param1 : 0;
  // var phases;
  var projectId = location.state.param2 ? location.state.param2 : 0;
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);

  let requiredOnlyNumbers = [
    total_testcases,
    automated_testcases,
    completed_testcases,
    functional_testcases,
    regression_testcases,
    saved_hours,
  ];
  //  let requiredOnlyAlphabets = [phase_name];
  console.log(openPhase);
  console.log(phaseList);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "BI Testset Reports",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPhases = () => {
    projectId &&
      axios.get(`Biservice/projects/${projectId}/phases`).then((resp) => {
        // console.log(resp?.data?.info?.phases?.length);
        // phases = resp?.data?.info?.phases?.length;
        //console.log(resp?.data?.info.phases)
        setPhaseList(resp?.data?.info.phases);
      });
  };

  useEffect(() => {
    getPhases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const clickHandler = (index) => {
    setOpenNewPhase(false);
    setOpenPhase(true);
    setPhaseId(phaseList[index].id);
    setPhaseName(phaseList[index].phase);
    setTotalTestcases(phaseList[index].total_tc);
    setAutomatedTestcases(phaseList[index].automated_tc);
    setCompletedTestcases(phaseList[index].completed_tc);
    setFunctionalTestcases(phaseList[index].total_functional_tc);
    setRegressionTestcases(phaseList[index].total_regression_tc);
    setSavedHours(phaseList[index].efforts_saving);
    setExecuted(phaseList[index].executed);
    setPhaseChart(phaseList[index].has_phase_chart);
    setIsDefault(phaseList[index].is_default);
  };

  const deleteHandler = (index) => {
    console.log(phaseList[index].id);
    setOpenDelete(true);
    setDeleteObject(phaseList[index]);
  };

  const submit = (e) => {
    if (
      validateForm([phase_name], [], [], [], requiredOnlyNumbers, [], "error")
    ) {
      var data = {
        id: 0,
        project_id: projectId,
        phase: phaseName.trim(),
        total_tc: totalTestcases,
        automated_tc: automatedTestcases,
        completed_tc: completedTestcases,
        total_functional_tc: functionalTestcases,
        total_regression_tc: regressionTestcases,
        executed: 0,
        has_phase_chart: 0,
        efforts_saving: savedHours,
      };

      axios
        .post(`${biservice}/Biservice/projects/phases/create`, data)
        .then((res) => {
          console.log(res.data.message);
          setMsg(res.data.message);
          if (res.data.message === "Succesfully Created Phase") {
            setAddSuccessMsg(true);
            setTimeout(() => {
              setAddSuccessMsg(false);
              getPhases();
              //  navigate("/BIReports");
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
                      setOpenPhase(false);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        fontSize: "15px",
                        color: "#009fee",
                        fontWeight: "400",
                      }}
                      primary="Add New"
                      secondary="Phase"
                    />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ mt: 1 }} />
              </Grid>
              {Array.from(Array(phases)).map((_, index) => (
                <Grid item xs={2} sm={4} md={12} key={index} mt={1}>
                  <ListItem
                    button
                    secondaryAction={
                      AdminActionCell(index, deleteHandler)
                      // <Tooltip title="Delete">
                      //   <IconButton
                      //     aria-label="delete"
                      //     onClick={() => deleteHandler(index)}
                      //   >
                      //     <DeleteOutlineIcon />
                      //   </IconButton>
                      // </Tooltip>
                    }
                  >
                    <ListItemButton
                      onClick={() => {
                        clickHandler(index);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <AssignmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          fontSize: "15px",
                          color: "#009fee",
                          fontWeight: "400",
                        }}
                        primary={phaseList[index]?.phase}
                        secondary="Phase"
                      />
                    </ListItemButton>
                  </ListItem>
                  {index !== phases - 1 ? <Divider sx={{ mt: 1 }} /> : ""}
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
        {!openNewPhase ? (
          <PhaseDetails
            ProjectId={projectId}
            PhaseId={phaseId}
            PhaseName={phaseName}
            TotalTestcases={totalTestcases}
            AutomatedTestcases={automatedTestcases}
            CompletedTestcases={completedTestcases}
            FunctionalTestcases={functionalTestcases}
            RegressionTestcases={regressionTestcases}
            SavedHours={savedHours}
            Executed={executed}
            PhaseChart={phaseChart}
            IsDefault={isDefault}
            getPhases={getPhases}
            setOpenNewPhase={setOpenNewPhase}
            setOpenPhase={setOpenPhase}
          />
        ) : (
          ""
        )}
      </Grid>
      {openDelete ? (
        <DeletePhase
          object={deleteObject}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          getPhases={getPhases}
          phases={phases}
          setDelSuccessMsg={setDelSuccessMsg}
          setPhases={setPhases}
        />
      ) : (
        ""
      )}
      <SnackbarNotify
        open={delSuccessMsg}
        close={setDelSuccessMsg}
        msg="Phase deleted successfully"
        severity="success"
      />
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

const AdminActionCell = (index, deletePhaseHandler) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="descColumn">
      <MoreVertIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="descOption"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => deletePhaseHandler(index)}>
          <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};
