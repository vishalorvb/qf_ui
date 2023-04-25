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
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";


export default function ExecutionToolbar({
  applicationId,
  projectId,
  selectedDatasets,
  testcaseId,
  applicationType,
  frameworkType,
}) {
  console.log(applicationType)
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
  const [buildEnvId,setBuildEnvId] = useState()
  const [runtimeVariable,setRunTimeVariable] = useState()
  const [snack,setSnack] = useState(false)
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const executionMethodSelector = (data) => {
    applicationType === 1 ? onApiSubmitExecute(data) :onSubmitExecute(data);
  };

  const generateMethodSelector = (data) => {
    applicationType === 1 ?onApiSubmitGenerate(data):onSubmitGenerate(data) ;
  };

  const onSubmitExecute = (data) => {
    if(selectedDatasets.length != 0 )
    {
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
        resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
        data?.executionLoc === "local"
          ? resp?.data?.status === "SUCCESS" &&
            axios
              .postForm(`http://127.0.0.1:8765/connect`, {
                data: resp?.data?.info,
                jarName: `code`,
              })
              .then((resp) => {
                setJarConnected(true);
              })
              .catch((err) => {
                err.message === "Network Error" && setClientInactive(true);
              })
          : setRemoteExecutionsuccess(true);
      });
    }
    else{
      setSnack(true)
      setTimeout(() => {
       setSnack(false)
    }, 3000);
    }
  };
  const onSubmitGenerate = (data) => {
    if(selectedDatasets.length != 0 )
    {
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
        resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
        data?.executionLoc === "local"
          ? resp?.data?.status === "SUCCESS" &&
            axios
              .postForm(`http://127.0.0.1:8765/connect`, {
                data: resp?.data?.info,
                jarName: `code`,
              })
              .then((resp) => {
                setJarConnected(true);
              })
              .catch((err) => {
                err.message === "Network Error" && setClientInactive(true);
              })
          : setRemoteExecutionsuccess(true);
      });
    }
    else{
      setSnack(true)
      setTimeout(() => {
       setSnack(false)
    }, 3000);
    }
  };

  const onApiSubmitExecute = (data) => {
    if(selectedDatasets.length != 0 )
    {
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
      resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
      data?.executionLoc === "local"
        ? resp?.data?.status === "SUCCESS" &&
          axios
            .postForm(`http://127.0.0.1:8765/connect`, {
              data: resp?.data?.info,
              jarName: `code`,
            })
            .then((resp) => {
              setJarConnected(true);
            })
            .catch((err) => {
              err.message === "Network Error" && setClientInactive(true);
            })
        : setRemoteExecutionsuccess(true);
    });
  }
  else{
    setSnack(true)
    setTimeout(() => {
     setSnack(false)
  }, 3000);
  }
  };

  const onApiSubmitGenerate = (data) => {
    if(selectedDatasets.length != 0 )
    {
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
      resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
      data?.executionLoc === "local"
        ? resp?.data?.status === "SUCCESS" &&
          axios
            .postForm(`http://127.0.0.1:8765/connect`, {
              data: resp?.data?.info,
              jarName: `code`,
            })
            .then((resp) => {
              setJarConnected(true);
            })
            .catch((err) => {
              err.message === "Network Error" && setClientInactive(true);
            })
        : setRemoteExecutionsuccess(true);
    });
  }
  else{
    setSnack(true)
    setTimeout(() => {
     setSnack(false)
  }, 3000);
  }
  };

  useEffect(() => {
    reset();
    applicationId !== undefined &&
      axios
        .get(
          `/qfservice/build-environment?project_id=${projectId}&module_id=${applicationId}`
        )
        .then((resp) => {
          setBuildEnvId(resp?.data?.data[0]?.id)
          setRunTimeVariable(resp?.data?.data[0]?.runtime_variables)
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
          const execEnv = resp?.data?.data;
          const data1 = execEnv.map((ee)=>{
            return { id : ee.value ,label : ee.name}
          })
          const execConfig = resp?.data?.data1
          const data2 = execConfig.map((ee)=>{
            return { id : ee.specificationId,label : ee.name}
          })
          const mergedObj = [...data1, ...data2];
          setExecEnvList(mergedObj);
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
       <SnackbarNotify
        open={snack}
        close={setSnack}
        msg={"Please select atleast one dataset"}
        severity="error"
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
              style={{ cursor: "pointer", color: "#009fee", marginTop:"3px" }}
              onClick={() => {
                navigate("/TestcaseExecution/AddEnvironment", {
                  state: { projectId: projectId, applicationId: applicationId },
                });
              }}
            >
              + Add Environment
            </h5>
          </Stack>
        </Grid>
       
          { (applicationType == 3 || applicationType == 4)?"": <Grid item md={2}> <MultiSelectElement
        menuMaxWidth={5}
            label="Browser"
            name="browser"
            size="small"
            control={control}
            fullWidth
            options={["Chrome", "Edge", "Firefox", "Safari"]}
          />
        </Grid>

          }
      
        <Grid item md={2}>
          <FeatureMenu testcaseId={testcaseId} projectId={projectId} frameworkType={frameworkType} selectedDatasets={selectedDatasets} envId = {buildEnvId}  runtimeVar = {(runtimeVariable != undefined || runtimeVariable != null) ? runtimeVariable : ""}/>
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
      </Grid>{" "}
      {(execLoc == "docker" || execLoc == "jenkins") && (
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
