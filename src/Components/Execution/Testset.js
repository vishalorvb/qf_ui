import { Button, Grid, Typography } from "@mui/material";
import TransferList from "../../CustomComponent/TransferList";
import {
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axios";
import { Stack } from "@mui/system";

export default function Testset({ selectedProject }) {
  const [webtestSets, setwebTestSets] = useState([]);
  const [apitestSets, setapiTestSets] = useState([]);
  const [mobiletestSets, setmobileTestSets] = useState([]);
  // const axiosPrivate = useAxios();
  const schema = yup.object().shape({
    executionName: yup.string().required(),
    description: yup.string().required(),
    TestSet: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getTestSet = (callback, module_id, project_id) => {
    axios
      .get(
        `/qfservice/webtestset/api/v1/projects/${project_id}/workflow/${module_id}/web/testsets`
      )
      .then((resp) => {
        const data = resp?.data?.result;
        callback(() => {
          return data?.map((set) => {
            return {
              ...set,
              id: set.testset_id.toString(),
              label: set.testset_name,
            };
          });
        });
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
      ? getTestSet(setwebTestSets, web?.module_id, web?.project_id)
      : setwebTestSets([]);
    api
      ? getTestSet(setapiTestSets, api?.module_id, api?.project_id)
      : setapiTestSets([]);
    mobile
      ? getTestSet(setmobileTestSets, mobile?.module_id, mobile?.project_id)
      : setmobileTestSets([]);
  }, [selectedProject]);

  const onSubmitHandler = (data) => {
    console.log({ data });
  };

  return (
    <>
      {[...webtestSets, ...apitestSets, ...mobiletestSets].length > 0 ? (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="subtitle1">Testsets</Typography>
              <RadioButtonGroup
                label=""
                name="TestSet"
                control={control}
                options={[...webtestSets, ...apitestSets, ...mobiletestSets]}
              />
            </Grid>
            <Grid item md={6}>
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
                <Button variant="contained" type="submit">
                  Execute
                </Button>
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
