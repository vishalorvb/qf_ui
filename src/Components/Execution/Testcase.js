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

export default function Testcase({ selectedProject }) {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const [webtestcase, setwebTestcase] = useState([]);
  const [apitestcase, setapiTestcase] = useState([]);
  const [mobiletestcase, setmobileTestcase] = useState([]);

  const schema = yup.object().shape({
    executionName: yup.string().required(),
    description: yup.string().required(),
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
  }, [selectedProject]);

  useEffect(() => {
    setLeft([...webtestcase, ...apitestcase, ...mobiletestcase]);
  }, [webtestcase, apitestcase, mobiletestcase]);

  const onSubmitHandler = (data) => {
    console.log({ data });
  };

  return (
    <>
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
                    name="enviroment"
                    size="small"
                    fullWidth
                    control={control}
                    options={[
                      {
                        id: "1",
                        label: "Local",
                      },
                      {
                        id: "2",
                        label: "Jenkins",
                      },
                      {
                        id: "3",
                        label: "Doker",
                      },
                    ]}
                  />
                  <SelectElement
                    name="env"
                    size="small"
                    fullWidth
                    sx={{ width: 200 }}
                    control={control}
                    options={[
                      {
                        id: "1",
                        label: "Testing",
                      },
                    ]}
                  />
                </Stack>
                <MultiSelectElement
                  label="Browser"
                  name="basic"
                  size="small"
                  fullWidth
                  control={control}
                  options={["Chrome", "Edge", "Firefox"]}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-end"
                  spacing={1}
                >
                  <CheckboxButtonGroup
                    name="basic-checkbox-button-group"
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
