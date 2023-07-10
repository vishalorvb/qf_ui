import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import {
  CheckboxButtonGroup,
  Controller,
  MultiSelectElement,
  SelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import axios from "../../api/axios";
import FeatureMenu from "../Execution/FeatureMenu";
import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import BackdropLoader from "../../CustomComponent/BackdropLoader";

const options = ["Chrome", "Edge", "Firefox", "Safari"];
function TestsetExecutionToolbar({
  applicationId,
  projectId,
  selectedtestcases,
  testsetId,
  selecteddatasets,
  frameworkType,
  applicationType,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [buildEnvList, setBuildEnvList] = useState([]);
  const [execEnvList, setExecEnvList] = useState([]);
  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [remoteExecutionsuccess, setRemoteExecutionsuccess] = useState(false);
  const [execLoc, setExecLoc] = useState("local");
  const [appType, setApplicationType] = useState("");
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [runtimeVariable, setRunTimeVariable] = useState();
  const [buildEnvId, setBuildEnvId] = useState();
  const [showLoading, setShowLoading] = useState(false);

  let appTypes = [
    "API Automation",
    "Web Automation",
    "Android Automation",
    "iOS Automation",
    "Python Web",
    "Test Design",
    "Performance Testing",
    "Security Testing",
    "Infrastructure Monitering",
    "Risk Prediction",
    "",
    "WINIUM",
    "Mobile Web Automation",
    "Code Coverage",
    "Pycode Style",
    "Locust",
    "Python Api",
    "Python Unit Testcase",
    "Link Project",
    "PipeLine",
    "Release Management",
  ];

  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
    commitMsg: execLoc !== "local" && yup.string().required(),
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitExecute = (data) => {
    let datasets = [];
    let selecteddataset = [];
    if (selectedtestcases.length != 0) {
      selecteddataset = selecteddatasets.filter(
        (dt) =>
          // console.log(dt.selected_testcase_dataset_ids),
          dt.selected_testcase_dataset_ids.length != 0
      );
      // if (selectedtestcases.length == selecteddataset.length) {
      //   datasets = selecteddataset;
      // } else {
      for (let i = 0; i < selectedtestcases.length; i++) {
        for (let j = 0; j < selecteddataset.length; j++) {
          if (selectedtestcases[i] == selecteddataset[j].testcase_id) {
            console.log(selecteddataset[j]);
            datasets.push(selecteddataset[j]);
          }
        }
      }
      // }
      console.log(selectedtestcases);
      console.log(selecteddatasets);
      console.log(selecteddataset);
      if (
        datasets.length != 0 &&
        selecteddataset.length != 0 &&
        datasets.length == selectedtestcases.length
      ) {
        console.log(datasets);
        setShowLoading(true);
        const executionData = {
          testset_id: testsetId,
          module_id: applicationId,
          testcases_list_to_execute: datasets,
          mobile_platform: appType,
          config_id: null,
          config_name: null,
          build_environment_name: data?.buildenvName?.split("&")[1],
          build_environment_id: parseInt(data?.buildenvName?.split("&")[0]),
          browser_type: data?.browser?.toString(),
          execution_location: data?.executionLoc,
          repository_commit_message: "",
          testcase_overwrite: false,
          runtimevariables: data?.buildenvName?.split("&")[2],
          is_execute: true,
          is_generate: data?.regenerateScript?.length > 0,
          client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
          user_id: auth?.userId,
        };

        axios.post(`/qfservice/ExecuteTestset`, executionData).then((resp) => {
          data?.executionLoc !== "local" && setShowLoading(false);
          resp?.data?.status === "SUCCESS" && resp?.data?.info
            ? axios
                .postForm(`http://127.0.0.1:8765/connecttcexecute`, {
                  data: resp?.data?.info,
                  jarName: `code`,
                })
                .then((resp) => {
                  setJarConnected(true);
                  setShowLoading(false);
                })
                .catch((err) => {
                  err.message === "Network Error" && setClientInactive(true);
                  setShowLoading(false);
                })
            : setRemoteExecutionsuccess(true);
        });
      } else {
        setSnack(true);
        setTimeout(() => {
          setSnack(false);
        }, 3000);
      }
    } else {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
    }
  };
  const onSubmitGenerate = (data) => {
    let datasets = [];
    if (selectedtestcases.length == selecteddatasets.length) {
      datasets = selecteddatasets;
    } else {
      for (let i = 0; i < selectedtestcases.length; i++) {
        for (let j = 0; j < selecteddatasets.length; j++) {
          if (selectedtestcases[i] == selecteddatasets[j].testcase_id) {
            datasets.push(selecteddatasets[j]);
          }
        }
      }
    }
    if (datasets.length != 0) {
      setShowLoading(true);
      const executionData = {
        testset_id: testsetId,
        module_id: applicationId,
        testcases_list_to_execute: datasets,
        mobile_platform: appType,
        config_id: null,
        config_name: null,
        build_environment_name: data?.buildenvName?.split("&")[1],
        build_environment_id: parseInt(data?.buildenvName?.split("&")[0]),
        browser_type: data?.browser?.toString(),
        execution_location: data?.executionLoc,
        repository_commit_message: "",
        testcase_overwrite: true,
        runtimevariables: data?.buildenvName?.split("&")[2],
        is_execute: false,
        is_generate: true,
        client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
        user_id: auth?.userId,
      };
      axios.post(`/qfservice/ExecuteTestset`, executionData).then((resp) => {
        data?.executionLoc !== "local" && setShowLoading(false);
        resp?.data?.status === "SUCCESS" && resp?.data?.info
          ? axios
              .postForm(`http://127.0.0.1:8765/connecttcexecute`, {
                data: resp?.data?.info,
                jarName: `code`,
              })
              .then((resp) => {
                setJarConnected(true);
                setShowLoading(false);
              })
              .catch((err) => {
                err.message === "Network Error" && setClientInactive(true);
                setShowLoading(false);
              })
          : setRemoteExecutionsuccess(true);
      });
    } else {
      setSnack(true);
      setTimeout(() => {
        setSnack(false);
      }, 3000);
    }
  };
  useEffect(() => {
    reset();
    setBuildEnvList([]);
    setExecEnvList([]);
    applicationId &&
      axios
        .get(
          `/qfservice/build-environment?project_id=${projectId}&module_id=${applicationId}`
        )
        .then((resp) => {
          const buildEnv = resp?.data?.data;
          setBuildEnvId(resp?.data?.data[0]?.id);
          setRunTimeVariable(resp?.data?.data[0]?.runtime_variables);

          setBuildEnvList(() => {
            return buildEnv.map((be) => {
              return {
                id: be.id + "&" + be.name + "&" + be.runtime_variables,
                label: be.name,
              };
            });
          });
        });

    applicationId &&
      axios
        .get(
          `/qfservice/execution-environment?module_id=${applicationId}&project_id=${projectId}`
        )
        .then((resp) => {
          const execEnv = resp?.data?.data;
          const data1 = execEnv.map((ee) => {
            return { id: ee.value, label: ee.name };
          });
          const execConfig = resp?.data?.data1;
          const data2 = execConfig.map((ee) => {
            return { id: ee.specificationId, label: ee.name };
          });
          const mergedObj = [...data1, ...data2];
          setExecEnvList(mergedObj);
          // setExecEnvList(() => {
          //   return execEnv.map((ee) => {
          //     return { id: ee.value, label: ee.name };
          //   });
          // });
        });
  }, [applicationId]);

  useEffect(() => {
    axios
      .get(
        `http://10.11.12.242:8080/qfservice/getmoduledetails/${applicationId}`
      )
      .then((resp) => {
        setApplicationType(appTypes[resp?.data?.data?.module_type - 1]);
      });
  }, [applicationId]);

  useEffect(() => {
    reset({
      executionLoc: execEnvList[0]?.id,
      buildenvName: buildEnvList[0]?.id,
    });
  }, [execEnvList, buildEnvList]);

  return (
    <form>
      <SnackbarNotify
        open={clientInactive}
        close={setClientInactive}
        msg={"Local Client Jar is not running!"}
        severity="error"
      />
      <SnackbarNotify
        open={jarConnected}
        close={setJarConnected}
        msg={"Local Client Jar Launched!"}
        severity="success"
      />
      <SnackbarNotify
        open={remoteExecutionsuccess}
        close={setRemoteExecutionsuccess}
        msg={"Scripts Executed Successfully"}
        severity="success"
      />
      {snack && (
        <SnackbarNotify
          open={snack}
          close={setSnack}
          msg={"Please select atleast one dataset"}
          severity="error"
        />
      )}
      {snackbar && (
        <SnackbarNotify
          open={snackbar}
          close={setSnackbar}
          msg={"Please select atleast one Testcase"}
          severity="error"
        />
      )}
      <Grid container>
        <Grid item container xs={10} spacing={1} justifyContent="flex-start">
          <Grid item xs={2} sm={4} md={4} lg={2.5}>
            <label>Execution Location</label>
            <SelectElement
              name="executionLoc"
              // label="Execution Location"
              size="small"
              fullWidth
              control={control}
              onChange={(e) => setExecLoc(e)}
              options={execEnvList}
            />
            {frameworkType == 4 && (
              <h5
                style={{
                  cursor: "pointer",
                  color: "#009fee",
                  marginTop: "3px",
                }}
                onClick={() => {
                  navigate("/TestsetExecution/ConfigureDevice", {
                    state: {
                      projectId: projectId,
                      pathname: location.pathname,
                    },
                  });
                }}
              >
                + Configure Device
              </h5>
            )}
          </Grid>
          <Grid item xs={2} sm={4} md={4} lg={2.5}>
            <Stack direction="column">
              <label>Build Environment</label>
              <SelectElement
                name="buildenvName"
                // label="Build Environment"
                size="small"
                fullWidth
                control={control}
                options={buildEnvList}
              />
              <h5
                style={{
                  cursor: "pointer",
                  color: "#009fee",
                  marginTop: "3px",
                }}
                onClick={() => {
                  navigate("/TestsetExecution/AddEnvironment", {
                    state: {
                      projectId: projectId,
                      applicationId: applicationId,
                    },
                  });
                }}
              >
                + Add Environment
              </h5>
            </Stack>
          </Grid>
          {applicationType == 3 || applicationType == 4 ? (
            ""
          ) : (
            <Grid item>
              <label>Browser</label>
              <Controller
                control={control}
                name="browser"
                defaultValue={["Chrome"]} // Set the default value to "Chrome"
                render={({ field }) => (
                  <MultiSelectElement
                    menuMaxWidth={5}
                    // label="Browser"
                    size="small"
                    fullWidth
                    options={options}
                    control={control} // Pass the control object to the MultiSelectElement
                    {...field}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={2} sm={3} md={2} lg={4} mt={2.3}>
            <FeatureMenu
              frameworkType={frameworkType}
              projectId={projectId}
              testsetId={testsetId}
              envId={buildEnvId}
              runtimeVar={
                runtimeVariable != undefined || runtimeVariable != null
                  ? runtimeVariable
                  : ""
              }
            />
          </Grid>
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} mt={2.3}>
          <Grid item>
            <Stack direction="column">
              <React.Fragment>
                <ButtonGroup
                  variant="contained"
                  ref={anchorRef}
                  aria-label="split button"
                >
                  <Button
                    sx={{ backgroundColor: "#009fee" }}
                    fullWidth
                    type="submit"
                    onClick={handleSubmit(onSubmitExecute)}
                  >
                    Execute
                  </Button>
                  <Button
                    sx={{ backgroundColor: "#009fee" }}
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                  >
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
                <Popper
                  sx={{
                    zIndex: 1,
                  }}
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <MenuList id="split-button-menu" autoFocusItem>
                          <MenuItem
                            size="small"
                            onClick={handleSubmit(onSubmitGenerate)}
                          >
                            GENERATE Script
                          </MenuItem>
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>
              <CheckboxButtonGroup
                name="regenerateScript"
                control={control}
                options={[
                  {
                    id: "1",
                    label: "Regenerate Script",
                  },
                ]}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      {(execLoc == "docker" || execLoc == "jenkins") && (
        <Stack mt={1}>
          <label>Commit message</label>

          <TextFieldElement
            variant="outlined"
            size="small"
            fullWidth
            name="commitMsg"
            control={control}
          />
        </Stack>
      )}
      <BackdropLoader open={showLoading} />
    </form>
  );
}

export default TestsetExecutionToolbar;
