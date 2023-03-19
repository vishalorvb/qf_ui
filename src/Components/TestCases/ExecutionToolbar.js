import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import {
  CheckboxButtonGroup,
  MultiSelectElement,
  SelectElement,
  useForm,
} from "react-hook-form-mui";
import axios from "../../api/axios";
import FeatureMenu from "../Execution/FeatureMenu";
import * as yup from "yup";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
export default function ExecutionToolbar({
  applicationId,
  projectId,
  selectedDatasets,
  testcaseId,
}) {
  const { auth } = useAuth();
  const [buildEnvList, setBuildEnvList] = useState([]);
  const [execEnvList, setExecEnvList] = useState([]);
  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
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
      is_generate: false,
      client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      user_id: auth?.userId,
    };
    axios
      .post(`/qfservice/webtestcase/ExecuteWebTestcase`, executionData)
      .then((resp) => {
        console.log(resp);
        console.log(resp?.data?.info);
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
          });
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
        severity="Success"
      />
      <Stack spacing={1} direction="row" justifyContent="flex-start" mt={1}>
        <SelectElement
          name="executionLoc"
          label="Execution Location"
          size="small"
          sx={{ width: 200 }}
          control={control}
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
        {selectedDatasets.length > 0 && (
          <Button variant="contained" type="submit">
            Execute
          </Button>
        )}
      </Stack>
    </form>
  );
}
