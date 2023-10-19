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
import axios from "axios";
import FeatureMenu from "../Execution/FeatureMenu";
import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { qfservice } from "../../Environment";

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
  const { setSnackbarData, setShowloader } = useHead();
  const navigate = useNavigate();
  const location = useLocation();

  const [buildEnvList, setBuildEnvList] = useState([]);
  const [execEnvList, setExecEnvList] = useState([]);
  const [execLoc, setExecLoc] = useState("local");
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [runtimeVariable, setRunTimeVariable] = useState();
  const [buildEnvId, setBuildEnvId] = useState();

  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser:
      applicationType !== 3 && applicationType !== 4 && yup.array().required(),
    commitMsg:
      (execLoc === "docker" || execLoc === "jenkins") &&
      yup.string().required(),
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const {
    control,
    handleSubmit,

    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
    setBuildEnvList([]);
    setExecEnvList([]);
    applicationId &&
      axios
        .get(
          `${qfservice}/qfservice/build-environment?project_id=${projectId}&module_id=${applicationId}`
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
          `${qfservice}/qfservice/execution-environment?module_id=${applicationId}&project_id=${projectId}`
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
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  useEffect(() => {
    reset({
      executionLoc: execEnvList[0]?.id,
      buildenvName: buildEnvList[0]?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execEnvList, buildEnvList]);

  const execute = (data) => {
    onSubmit(data, true);
  };
  const generate = (data) => {
    onSubmit(data, false);
  };

  const onSubmit = (data, isExecute) => {
    let executeFlag = true;
    let message = "";

    if (selecteddatasets?.length <= 0) {
      executeFlag = false;
      message = "Select at least one Testcase!";
    } else if (
      selecteddatasets.some(
        (datasets) => datasets?.selected_testcase_dataset_ids?.length <= 0
      )
    ) {
      executeFlag = false;
      message = "Select at least one dataset of selected Testcases!";
    }

    if (executeFlag) {
      setShowloader(true);
      const url =
        "/qfservice/" +
        (applicationType === 1 ? "ExecuteTestset" : "ExecuteWebTestset_v11");

      const executionData = {
        browser_type: data?.browser?.toString(),
        build_environment_id: parseInt(data?.buildenvName?.split("&")[0]),
        build_environment_name: data?.buildenvName?.split("&")[1],
        client_timezone_id: "Asia/Calcutta",
        execution_location: data?.executionLoc,
        is_execute: isExecute,
        is_generate: data?.regenerateScript?.length > 0 || !isExecute,
        module_id: applicationId,
        repository_commit_message: "",
        runtimevariables: "null",
        testcases_list_to_execute:
          applicationType === 1 ? selecteddatasets : undefined,
        web_testcases_list_to_execute:
          applicationType !== 1 ? selecteddatasets : undefined,
        testset_id: testsetId,
        user_id: auth?.userId,
      };

      axios.post(url, executionData).then((resp) => {
        console.log(resp);
        if (resp?.data?.status === "FAIL") {
          setShowloader(false);
          setSnackbarData({
            status: true,
            message: resp?.data?.message ?? "Something went wrong!",
            severity: "error",
          });
        }
        if (resp?.data?.status === "SUCCESS" && resp?.data?.info) {
          axios
            .postForm(`http://127.0.0.1:8765/connecttcexecute`, {
              data: resp?.data?.info,
              jarName: `code`,
            })
            .then((resp) => {
              console.log(resp);
              setShowloader(false);
              setSnackbarData({
                status: true,
                message: "Jar client launched Successfuly",
                severity: "SUCCESS",
              });
            })
            .catch((err) => {
              console.log(err);
              setShowloader(false);
              setSnackbarData({
                status: true,
                message: "Jar client not Up and Running, please launch !",
                severity: "error",
              });
            });
        } else if (resp?.data?.status === "SUCCESS" && !resp?.data?.info) {
          console.log("remote");
          setShowloader(false);
          setSnackbarData({
            status: true,
            message: "Remote execution Seccessful",
            severity: "SUCCESS",
          });
        }
      });
    } else {
      setSnackbarData({
        status: true,
        message: message,
        severity: "error",
      });
    }
  };

  return (
    <form>
      <Grid container>
        <Grid item container xs={10} spacing={1} justifyContent="flex-start">
          <Grid item xs={2} sm={4} md={4} lg={2.5}>
            <label>Execution Location</label>
            <SelectElement
              name="executionLoc"
              size="small"
              fullWidth
              control={control}
              onChange={(e) => setExecLoc(e)}
              options={execEnvList}
            />
            {frameworkType === 4 && (
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
          {applicationType === 3 || applicationType === 4 ? (
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
                runtimeVariable !== undefined || runtimeVariable !== null
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
                    onClick={handleSubmit(execute)}
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
                            onClick={handleSubmit(generate)}
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

      {(execLoc === "docker" || execLoc === "jenkins") && (
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
    </form>
  );
}

export default TestsetExecutionToolbar;
