import React from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
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
  const [buildEnvList, setBuildEnvList] = useState([]);
  const [execEnvList, setExecEnvList] = useState([]);
  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [remoteExecutionsuccess, setRemoteExecutionsuccess] = useState(false);
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

  const onSubmitExecute = (data) => {
    console.log(data);
    console.log(testsetId);
    console.log(selectedtestcases);
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
      is_execute: true,
      is_generate: data?.regenerateScript?.length > 0,
      client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_id: auth?.userId,
    };
    axios
      .post(`/qfservice/webtestcase/ExecuteWebTestcase`, executionData)
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
    console.log(data);
    console.log(testsetId);
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
      .post(`/qfservice/webtestcase/ExecuteWebTestcase`, executionData)
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
    axios.get(`/qfservice/build-environment/${applicationId}`).then((resp) => {
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
      <Stack spacing={1} direction="row" justifyContent="flex-start" mt={1}>
        <SelectElement
          name="executionLoc"
          label="Execution Location"
          size="small"
          sx={{ width: 200 }}
          control={control}
          onChange={(e) => setExecLoc(e)}
          options={execEnvList}
        />
        <SelectElement
          name="buildenvName"
          label="build env. Name"
          size="small"
          sx={{ width: 200 }}
          control={control}
          options={buildEnvList}
        />
        <MultiSelectElement
          label="Browser"
          name="browser"
          size="small"
          control={control}
          sx={{ width: 200 }}
          options={["Chrome", "Edge", "Firefox", "Safari"]}
        />
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
        <FeatureMenu />
        {selectedtestcases.length > 0 && (
          <>
            <Button variant="contained" onClick={handleSubmit(onSubmitExecute)}>
              Execute
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmitGenerate)}
            >
              Generate
            </Button>
          </>
        )}
      </Stack>
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
  )
}

export default TestsetExecutionToolbar