import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";

import MenuList from "@mui/material/MenuList";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import {
  CheckboxButtonGroup,
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

function TestsetExecutionToolbar({applicationId,
    projectId,
    selectedtestcases,
    testsetId}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [buildEnvList, setBuildEnvList] = useState([]);
  const [execEnvList, setExecEnvList] = useState([]);
  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [remoteExecutionsuccess, setRemoteExecutionsuccess] = useState(false);
  const [execLoc, setExecLoc] = useState("local");
  const [applicationType, setApplicationType] = useState("");
  let appTypes = ["API Automation","Web Automation","Android Automation","iOS Automation","Python Web",
  "Test Design","Performance Testing","Security Testing","Infrastructure Monitering","Risk Prediction",
  "","WINIUM","Mobile Web Automation","Code Coverage","Pycode Style",
  "Locust","Python Api","Python Unit Testcase","Link Project","PipeLine",
  "Release Management"]
  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
    commitMsg: execLoc !== "local" && yup.string().required(),
  });
  console.log(projectId);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleClick = () => {
    console.info(`You clicked `);
  };

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

    const executionData = {
      testset_id: testsetId,
      module_id: applicationId,
      web_testcases_list_to_execute: selectedtestcases,
      config_id: null,
      config_name: null,
      build_environment_name: data?.buildenvName?.split("&")[1],
      build_environment_id: data?.buildenvName?.split("&")[0],
      browser_type: data?.browser?.toString(),
      execution_location: data?.executionLoc,
      repository_commit_message: "",
      testcase_overwrite: true,
      runtimevariables: data?.buildenvName?.split("&")[2],
      is_execute: true,
      is_generate: data?.regenerateScript?.length > 0,
      client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_id: auth?.userId,
    };
    axios
      .post(`/qfservice/webtestset/ExecuteWebTestset`, executionData)
      .then((resp) => {
        console.log(resp);
        console.log(resp?.data?.status);
        data?.executionLoc === "local"
          ? axios
              .postForm(`http://127.0.0.1:8765/connect`, {
                data: resp?.data?.info,
                jarName: `code`,
              })
              .then((resp) => {
                console.log(resp);
                setJarConnected(true);
              })
              .catch((err) => {
                console.log(err.message);
                err.message === "Network Error" && setClientInactive(true);
              })
          : setRemoteExecutionsuccess(true);
      });
  };
  const onSubmitGenerate = (data) => {
    let datasets = [];
    console.log(data);
    console.log(testsetId);
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

    const executionData = {
      testset_id: testsetId,
      module_id : applicationId,
      web_testcases_list_to_execute: selectedtestcases,
      config_id: null,
      config_name: null,
      build_environment_name: data?.buildenvName?.split("&")[1],
      build_environment_id: data?.buildenvName?.split("&")[0],
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
    axios
      .post(`/qfservice/webtestset/ExecuteWebTestset`, executionData)
      .then((resp) => {
        console.log(resp);
        console.log(resp?.data?.info);
        data?.executionLoc === "local"
          ? axios
              .postForm(`http://127.0.0.1:8765/connect`, {
                data: resp?.data?.info,
                jarName: `code`,
              })
              .then((resp) => {
                console.log(resp);
                setJarConnected(true);
              })
              .catch((err) => {
                console.log(err.message);
                err.message === "Network Error" && setClientInactive(true);
              })
          : setRemoteExecutionsuccess(true);
      });
  };


  useEffect(() => {
    reset();
    // axios.get(`/qfservice/build-environment/${applicationId}`).then((resp) => {
    axios
      .get(`/qfservice/build-environment?project_id=79&module_id=76`)
      .then((resp) => {
        console.log(resp?.data?.data);
        const buildEnv = resp?.data?.data;
        setBuildEnvList(() => {
          return buildEnv.map((be) => {
            return {
              id: be.id + "&" + be.name + "&" + be.runtime_variables,
              label: be.name,
            };
          });
        });
      });

    axios
      .get(
        `/qfservice/execution-environment?module_id=${applicationId}&project_id=${projectId}`
      )
      .then((resp) => {
        console.log(resp?.data?.data);
        const execEnv = resp?.data?.data;
        setExecEnvList(() => {
          return execEnv.map((ee) => {
            return { id: ee.value, label: ee.name };
          });
        });
      });
  }, [applicationId]);

  useEffect(() => {
    axios
      .get(
        `http://10.11.12.242:8080/qfservice/getmoduledetails/${applicationId}`
      )
      .then((resp) => {
        console.log(resp?.data?.data?.module_type);
        // setApplicationType(resp?.data?.data?.module_type);
        setApplicationType(appTypes[(resp?.data?.data?.module_type) - 1])
      });
  }, [applicationId]);

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
      <Grid
        container
        direction="row"
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item md={2}>
          <SelectElement
            name="executionLoc"
            label="Execution Location"
            size="small"
            fullWidth
            control={control}
            onChange={(e) => setExecLoc(e)}
            options={execEnvList}
          />
        </Grid>
        <Grid item md={2}>
          <Stack direction="column">
            <SelectElement
              name="buildenvName"
              label="build env. Name"
              size="small"
              fullWidth
              control={control}
              options={buildEnvList}
            />
              <Button onClick={()=>{
              navigate("/addEnvironment",{state : { pId : projectId}})
             }}>
              + Add Environment
            </Button>
          </Stack>
        </Grid>
        <Grid item md={2}>
          <MultiSelectElement
            label="Browser"
            name="browser"
            size="small"
            control={control}
            fullWidth
            options={["Chrome", "Edge", "Firefox", "Safari"]}
          />
        </Grid>
        <Grid item md={2}>
          <FeatureMenu />
        </Grid>
        <Grid item md={2}>
          <Stack direction="column">
            <React.Fragment>
              <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
              >
                <Button
                  fullWidth
                  type="submit"
                  // onClick={() => {
                  //    {handleSubmit(onApiSubmitExecute)}
                  //     // : handleSubmit(onSubmitExecute);
                  // }}
                >
                  Execute
                </Button>
                <Button
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
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <MenuList id="split-button-menu" autoFocusItem>
                        <MenuItem size="small">GENERATE Script</MenuItem>
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
                  label: "Regenrate Script",
                },
              ]}
            />
          </Stack>
        </Grid>

        {/* {selectedtestcases.length > 0 && (
          <>
            <Grid item md={2}>
              <Button
                sx={{ width: 150 }}
                variant="contained"
                onClick={handleSubmit(onSubmitExecute)}
              >
                Execute
              </Button>
            </Grid>
            <Grid item md={2}>
              <Button
                sx={{ width: 150 }}
                variant="contained"
                onClick={handleSubmit(onSubmitGenerate)}
              >
                Generate
              </Button>
            </Grid>
          </>
        )} */}
      </Grid>

      {execLoc !== "local" && (
        <Stack mt={1}>
          <TextFieldElement
            label="Commit message"
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
