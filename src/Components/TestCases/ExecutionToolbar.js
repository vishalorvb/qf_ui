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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Select from "@mui/material/Select";

export default function ExecutionToolbar({
  applicationId,
  projectId,
  selectedDatasets,
  testcaseId,
  applicationType,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [buildEnvList, setBuildEnvList] = useState([]);
  const [execEnvList, setExecEnvList] = useState([]);
  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [remoteExecutionsuccess, setRemoteExecutionsuccess] = useState(false);
  const [remoteAPiFails, setRemoteAPiFails] = useState(false);
  const [execLoc, setExecLoc] = useState("local");
  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
    commitMsg: execLoc !== "local" && yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  // const handleClick = () => {
  //   console.info(`You clicked `);
  //   applicationType === "web"
  //     ? handleSubmit(onApiSubmitGenerate)
  //     : handleSubmit(onSubmitGenerate);
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const executionMethodSelector = (data) => {
    applicationType === 1 ? onSubmitExecute(data) : onApiSubmitExecute(data);
  };

  const generateMethodSelector = (data) => {
    applicationType === 1 ? onSubmitGenerate(data) : onApiSubmitGenerate(data);
  };

  const onSubmitExecute = (data) => {
    console.log("execute");
    console.log(data);
    console.log(testcaseId);
    const executionData = {
      testcase_id: testcaseId,
      testcase_datasets_ids_list: selectedDatasets,
      config_id: null,
      config_name: null,
      build_environment_name: data?.buildenvName?.split("&")[1],
      build_environment_id: data?.buildenvName?.split("&")[0],
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
    axios
      .post(`/qfservice/webtestcase/ExecuteWebTestcase`, executionData)
      .then((resp) => {
        console.log(resp);
        console.log(resp?.data?.info);
        resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
        data?.executionLoc === "local"
          ? resp?.data?.status === "SUCCESS" &&
            axios
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
    console.log("split");
    console.log(data);
    console.log(testcaseId);
    const executionData = {
      testcase_id: testcaseId,
      testcase_datasets_ids_list: selectedDatasets,
      config_id: null,
      config_name: null,
      build_environment_name: data?.buildenvName?.split("&")[1],
      build_environment_id: data?.buildenvName?.split("&")[0],
      browser_type: data?.browser?.toString(),
      execution_location: data?.executionLoc,
      repository_commit_message: "",
      testcase_overwrite: false,
      runtimevariables: data?.buildenvName?.split("&")[2],
      is_execute: false,
      is_generate: true,
      client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_id: auth?.userId,
    };
    axios
      .post(`/qfservice/webtestcase/ExecuteWebTestcase`, executionData)
      .then((resp) => {
        console.log(resp);
        console.log(resp?.data?.info);
        resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
        data?.executionLoc === "local"
          ? resp?.data?.status === "SUCCESS" &&
            axios
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

  const onApiSubmitExecute = (data) => {
    console.log("execute");
    console.log(data);
    console.log(testcaseId);
    const executionData = {
      testcase_id: testcaseId,
      user_id: auth?.userId,
      testcase_datasets_ids_list: selectedDatasets,
      build_environment_name: data?.buildenvName?.split("&")[1],
      execution_location: data?.executionLoc,
      repository_commit_message: "",
      testcase_overwrite: false,
      runtimevariables: data?.buildenvName?.split("&")[2],
      is_execute: true,
      is_generate: data?.regenerateScript?.length > 0,
      client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    axios.post(`/qfservice/ExecuteTestcase`, executionData).then((resp) => {
      console.log(resp);
      console.log(resp?.data?.info);
      resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
      data?.executionLoc === "local"
        ? resp?.data?.status === "SUCCESS" &&
          axios
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

  const onApiSubmitGenerate = (data) => {
    console.log("split");

    console.log(data);
    console.log(testcaseId);
    const executionData = {
      testcase_id: testcaseId,
      user_id: auth?.userId,
      testcase_datasets_ids_list: selectedDatasets,
      build_environment_name: data?.buildenvName?.split("&")[1],
      execution_location: data?.executionLoc,
      repository_commit_message: "",
      testcase_overwrite: false,
      runtimevariables: data?.buildenvName?.split("&")[2],
      is_execute: false,
      is_generate: true,
      client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    axios.post(`/qfservice/ExecuteTestcase`, executionData).then((resp) => {
      console.log(resp);
      console.log(resp?.data?.info);
      resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
      data?.executionLoc === "local"
        ? resp?.data?.status === "SUCCESS" &&
          axios
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

  // useEffect(()=>{console.log(applicationId)},[applicationId])
  // console.log("first")

  useEffect(() => {
    reset();
    applicationId !== undefined &&
      axios
        .get(
          `/qfservice/build-environment?project_id=${projectId}&module_id=${applicationId}`
        )
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

    applicationId !== undefined &&
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
  return (
    <form>
      <SnackbarNotify
        open={clientInactive}
        close={setClientInactive}
        msg={"Local Client Jar is not running!"}
        severity="error"
      />
      <SnackbarNotify
        open={remoteAPiFails}
        close={setRemoteAPiFails}
        msg={"Somthing went wrong , Info Null "}
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
            ></SelectElement>
            <h5
              style={{ cursor: "pointer", color: "#009fee" }}
              onClick={() => {
                navigate("/addEnvironment", {
                  state: { projectId: projectId, applicationId: applicationId },
                });
              }}
            >
              + Add Environment
            </h5>
          </Stack>
        </Grid>
        <Grid item md={2}>
          <FormControl fullWidth>
            <InputLabel>Browser</InputLabel>
            <Select
              label="Browser"
              name="browser"
              size="small"
              control={control}
              fullWidth
            >
              {/* options={["Chrome", "Edge", "Firefox", "Safari"]} */}
              <MenuItem value={"Chrome"}>Chrome</MenuItem>
              <MenuItem value={"Edge"}>Edge</MenuItem>
              <MenuItem value={"Firefox"}>Firefox</MenuItem>
              <MenuItem value={"Safari"}>Safari</MenuItem>
            </Select>
          </FormControl>
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
                  // type="submit"
                  sx={{ backgroundColor: "#009fee" }}
                  onClick={handleSubmit(executionMethodSelector)}
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
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <MenuList id="split-button-menu" autoFocusItem>
                        <MenuItem
                          onClick={handleSubmit(generateMethodSelector)}
                          size="small"
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
                  label: "Regenrate Script",
                },
              ]}
            />
          </Stack>
        </Grid>

        {/* <Grid item md={1.7}>
              <Button
                sx={{ width: 150 }}
                variant="contained"
                type="submit"
                // onClick={() => {
                //   applicationType === 1
                //     ? handleSubmit(onApiSubmitGenerate)
                //     : handleSubmit(onSubmitGenerate);
                // }}
              >
                Generate
              </Button>
        </Grid> */}

        {/* <Grid item md={1.7}>
              <Button
                sx={{ width: 150 }}
                variant="contained"
                onClick={() => {
                  applicationType === 1
                    ? handleSubmit(onApiSubmitExecute)
                    : handleSubmit(onSubmitExecute);
                }}
              >
                Execute
              </Button>
            </Grid> */}
      </Grid>{" "}
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
