import {
    Avatar,
    Button,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
  } from "@mui/material";
  import React, { useEffect, useRef, useState } from "react";
  import useHead from "../../hooks/useHead";
  import ImageIcon from "@mui/icons-material/Image";
  import Divider from "@mui/material/Divider";
  import { Container, Stack } from "@mui/system";
  import { validateForm } from "../../CustomComponent/FormValidation";
  import { useNavigate } from "react-router";
  import { axiosPrivate } from "../../api/axios";
  import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
  
  function Cycles() {
      const [cycleName, setCycleName] = useState("");
      const [totalTestcases, setTotalTestcases] = useState(0);
      const [automatedTestcases, setAutomatedTestcases] = useState(0);
      const [completedTestcases, setCompletedTestcases] = useState(0);
      const [functionalTestcases, setFunctionalTestcases] = useState(0);
      const [regressionTestcases, setRegressionTestcases] = useState(0);
      const [savedHours, setSavedHours] = useState(0);
      const cycle_name = useRef();
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
      const [openNewPhase, setOpenNewPhase] = useState(true);
      const [openPhase, setOpenPhase] = useState(false);
      const [tsList, setTsList] = useState(["TC_Demooo","TC_Pepdemo","TC_PPM","TC_Testdemo","TC_Project","TC_Quality Fusion"]);
  
      let requiredOnlyNumbers = [total_testcases, automated_testcases, completed_testcases,functional_testcases,regression_testcases,saved_hours];
      let requiredOnlyAlphabets = [cycle_name];
  
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
              phaseName: cycleName.trim(),
              totalTestcases: totalTestcases.trim(),
              automatedTestcases: automatedTestcases.trim(),
              completedTestcases: completedTestcases.trim(),
              functionalTestcases: functionalTestcases.trim(),
              regressionTestcases: regressionTestcases.trim(),
              savedHours: savedHours.trim(),
            };
      
            axiosPrivate
              .post(
                `/qfuserservice/user/createUser?user_id=0&current_user_id=`,
                data
              )
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
  
    const { setHeader } = useHead();
    useEffect(() => {
      setHeader((ps) => {
        return {
          ...ps,
          name: "BI Testset Reports",
        };
      });
    }, []);
  
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
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Add New" secondary="cycle" />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ mt: 1 }} />
                </Grid>
                {Array.from(Array(6)).map((_, index) => (
                  <Grid item xs={2} sm={4} md={12} key={index} mt={1}>
                    <ListItem button>
                      <ListItemButton
                        onClick={() => {
                          setOpenNewPhase(false);
                          setOpenPhase(true);
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={"Cycle " + (index + 1)}
                          secondary="Cycle"
                        />
                      </ListItemButton>
                    </ListItem>
                    {index != 5 ? <Divider sx={{ mt: 1 }} /> : ""}
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
              <Grid item container direction="row" spacing={1} mt={4}>
                <Grid item md={12}>
                  <h3>Details</h3>
                </Grid>
                <Grid item md={8}>
                  <Stack spacing={1}>
                    <label>
                      Cycle name <span className="importantfield">*</span>
                    </label>
                    <input
                      type="text"
                      ref={cycle_name}
                      onChange={(e) => setCycleName(e.target.value)}
                      name="phaseName"
                      // placeholder=" Enter Phase Name"
                    />
                  </Stack>
                </Grid>
                {Array.from(Array(6)).map((_, index) => (
                  <Grid container item md={8} direction={"row"} spacing={1}>
                    {/* <Stack spacing={1}> */}
                    <Grid item xs={5}>
                      <label>
                        {tsList[index]}
                        <span className="importantfield">*</span>
                      </label>
                    </Grid>
                    <Grid item xs={2}>
                        
                    </Grid>
                    <Grid item xs={5}>
                      <select
                        ref={total_testcases}
                        name="totaltestcases"
                        id="selectList"
                        onChange={(e) => setTotalTestcases(e.target.value)}
                      >
                        <option value="">...Select Role...</option>
                        <option value="1">AUTOMATION ENGINEER</option>
                        <option value="2">ADMIN</option>
                        <option value="3">DBA</option>
                        <option value="4">AUTOMATION MANAGER</option>
                      </select>
                    </Grid>

                    {/* <input
                        type="text"
                        ref={total_testcases}
                        onChange={(e) => setTotalTestcases(e.target.value)}
                        name="totaltestcases"
                        // placeholder=" Enter Last Name"
                      /> */}

                    {/* </Stack> */}
                  </Grid>
                ))}
                {/* <Grid item md={6}>
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
                </Grid> */}
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

export default Cycles  