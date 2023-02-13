import { Button, Grid, Stack, Typography } from "@mui/material";
import TransferList from "../../CustomComponent/TransferList";
import {
  CheckboxButtonGroup,
  MultiSelectElement,
  SelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import FeatureMenu from "./FeatureMenu";
import useAuth from "../../hooks/useAuth";
import ExecutionProcessBox from "./ExecutionProcessBox";

export default function Testcase({ selectedProject }) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const { auth } = useAuth();

  const [webtestcase, setwebTestcase] = useState([]);
  const [webtestcaseDs, setwebTestcaseDs] = useState([]);
  const [apitestcase, setapiTestcase] = useState([]);
  const [apitestcaseDs, setapiTestcaseDs] = useState([]);
  const [mobiletestcase, setmobileTestcase] = useState([]);
  const [mobiletestcaseDs, setmobileTestcaseDs] = useState([]);

  const [webBuildenv, setWebBuildenv] = useState([]);

  const [executionStart, setExectutionStart] = useState(false);
  const [executionSpin, setexecutionSpin] = useState(false);
  const [executionResult, setExecutionResult] = useState([]);

  const schema = yup.object().shape({
    executionName: yup.string().required(),
    description: yup.string().required(),
    buildenvName: yup.string().required(),
    executionLoc: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getTestcase = (callback, module_id, project_id) => {
    axios
      .get(
        `/qfservice/webtestcase//api/v1/projects/${project_id}/workflow/${module_id}/web/testcases`
      )
      .then((resp) => {
        const data = resp?.data?.result;
        callback(data);
      });
  };

  useEffect(() => {
    let web, api, mobile;
    selectedProject.forEach((module) => {
      switch (module.module_type) {
        case 2:
          web = module;
          break;
        case 1:
          api = module;
          break;
        case 3:
          mobile = module;
          break;

        default:
          break;
      }
    });

    web
      ? getTestcase(setwebTestcase, web?.module_id, web?.project_id)
      : setwebTestcase([]);
    api
      ? getTestcase(setapiTestcase, api?.module_id, api?.project_id)
      : setapiTestcase([]);
    mobile
      ? getTestcase(setmobileTestcase, mobile?.module_id, mobile?.project_id)
      : setmobileTestcase([]);

    axios.get(`/qfservice/build-environment/${web?.module_id}`).then((resp) => {
      const buildEnv = resp?.data?.data?.map((b) => {
        return { id: b.id + "," + b.name, label: b.name };
      });
      setWebBuildenv(buildEnv);
    });
  }, [selectedProject]);

  useEffect(() => {
    setwebTestcaseDs([]);
    webtestcase.map((tc) => {
      axios
        .get(
          `qfservice/webtestcase/api/v1/projects/${selectedProject[0]?.project_id}/workflow/${tc?.module_id}/web/testcases/${tc?.testcase_id}/datasets`
        )
        .then((resp) => {
          const datasetArray = resp?.data?.result;
          tc.datasetArray = datasetArray;
          setwebTestcaseDs((ps) => {
            return [...ps, tc];
          });
        });
    });
  }, [webtestcase]);

  useEffect(() => {
    setapiTestcaseDs([]);
    apitestcase.map((tc) => {
      axios
        .get(
          `qfservice/webtestcase/api/v1/projects/${selectedProject[0]?.project_id}/workflow/${tc?.module_id}/web/testcases/${tc?.testcase_id}/datasets`
        )
        .then((resp) => {
          const datasetArray = resp?.data?.result;
          tc.datasetArray = datasetArray;
          setapiTestcaseDs((ps) => {
            return [...ps, tc];
          });
        });
    });
  }, [apitestcase]);

  useEffect(() => {
    setmobileTestcaseDs([]);
    mobiletestcase.map((tc) => {
      axios
        .get(
          `qfservice/webtestcase/api/v1/projects/${selectedProject[0]?.project_id}/workflow/${tc?.module_id}/web/testcases/${tc?.testcase_id}/datasets`
        )
        .then((resp) => {
          const datasetArray = resp?.data?.result;
          tc.datasetArray = datasetArray;
          setmobileTestcaseDs((ps) => {
            return [...ps, tc];
          });
        });
    });
  }, [mobiletestcase]);

  useEffect(() => {
    setLeft([...webtestcaseDs, ...apitestcaseDs, ...mobiletestcaseDs]);
  }, [webtestcaseDs, apitestcaseDs, mobiletestcaseDs]);

  const onSubmitHandler = async (data) => {
    if (right.length > 0) {
      setExectutionStart(true);
      setexecutionSpin(true);
      const execution = right.map(async (tc) => {
        const postReq = {
          testcase_id: tc?.testcase_id,
          testcase_datasets_ids_list: tc?.datasetArray?.map(
            (ds) => ds?.dataset_id
          ),
          user_id: auth?.userId,
          browser_type: data?.browser.toString(),
          build_environment_name: data?.buildenvName?.split(",")[1],
          execution_location: data?.executionLoc,
          repository_commit_message: "",
          testcase_overwrite: false,
          mobile_platform: "ios",
          config_id: null,
          config_name: null,
          build_environment_id: data?.buildenvName?.split(",")[0],
          is_execute: true,
          is_generate:
            data?.regenerateScript !== undefined &&
            data?.regenerateScript?.length === 1,
          client_timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        const res = await axios.post(
          `/qfservice/webtestcase/ExecuteWebTestcase`,
          postReq
        );
        return res?.data;
      });
      const results = await Promise.all(execution);
      setexecutionSpin(false);
      setExecutionResult(results);
      console.log(results);
    } else {
      console.log("select testcase");
    }
  };

  return (
    <>
      <ExecutionProcessBox
        open={executionStart}
        close={setExectutionStart}
        executionspin={executionSpin}
        executionResult={executionResult}
      />
      {[...webtestcase, ...apitestcase, ...mobiletestcase].length > 0 ? (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container>
            <Grid item md={8}>
              <Typography variant="subtitle1">Testcases</Typography>
              <TransferList
                left={left}
                setLeft={setLeft}
                right={right}
                setRight={setRight}
              />
            </Grid>
            <Grid item md={4}>
              <Typography variant="subtitle1">Execution Details</Typography>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                spacing={1}
              >
                <TextFieldElement
                  id="execution-name"
                  label="Execution Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="executionName"
                  control={control}
                />
                <TextFieldElement
                  id="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="description"
                  control={control}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-end"
                  spacing={1}
                >
                  <SelectElement
                    name="executionLoc"
                    label="Execution Location"
                    size="small"
                    fullWidth
                    control={control}
                    options={[
                      {
                        id: "Local",
                        label: "Local",
                      },
                      {
                        id: "Jenkins",
                        label: "Jenkins",
                      },
                      {
                        id: "Doker",
                        label: "Doker",
                      },
                    ]}
                  />
                  <SelectElement
                    name="buildenvName"
                    label="build env. Name"
                    size="small"
                    fullWidth
                    sx={{ width: 200 }}
                    control={control}
                    options={webBuildenv}
                  />
                </Stack>
                <MultiSelectElement
                  label="Browser"
                  name="browser"
                  size="small"
                  fullWidth
                  control={control}
                  options={["Chrome", "Edge", "Firefox", "Safari"]}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-end"
                  spacing={1}
                >
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
                  <Button variant="contained" type="submit">
                    Execute
                  </Button>
                </Stack>
                {/* <Button variant="contained">Generate</Button> */}
              </Stack>
            </Grid>
          </Grid>
        </form>
      ) : (
        "No Testset Found"
      )}
    </>
  );
}
