import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCreatePipelineData,
  createPipeline,
} from "../../Services/DevopsServices";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Stack } from "@mui/system";

export default function CreatePipeline() {
  const [pipelineData, setPipelineData] = useState({});
  const [defaultData, setDefaultData] = useState({});
  const [msg, setMsg] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    releaseName: yup.string().required(),
    releaseDesc: yup.string().required(),
    cicdType: yup.string().required(),
    release: yup.string().required(),
    webTest: yup.string().required(),
    ApiTest: yup.string().required(),
    sonrCubePath: yup.string().required(),
    sonrCubeKey: yup.string().required(),
    unitTestPath: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const location = useLocation();

  console.log(location);

  const onSubmitHandler = (params) => {
    const id = location.state.id;
    const moduleId = location.state.module;
    console.log(location.state);
    // createPipeline(setSaveRes, data, location.state.id);
    axios
      .post(`/qfservice/Createpipeline`, null, {
        params: {
          module_id: moduleId,
          release_name: params.releaseName,
          release_desc: params.releaseDesc,
          ansiblereleaseId: params.release,
          webTestsetId: params.webTest,
          code_quality_path: params.sonrCubePath,
          code_quality_project_key: params.sonrCubeKey,
          unittesttestset_path: params.unitTestPath,
          apiTestsetid: params.ApiTest,
          cicd_type: params.cicdType,
          user_id: auth?.userId,
          release_id: id,
        },
      })
      .then((resp) => {
        console.log(resp);
        const respMsg = resp?.data?.message;
        const info = resp?.data?.info;
        setMsg(respMsg);
        respMsg === "SUCCESS" && reset();
      });
  };

  const { setHeader } = useHead();

  useEffect(() => {
    getCreatePipelineData(
      setPipelineData,
      setDefaultData,
      location.state.id,
      location?.state?.project_id
    );
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Pipeline",
      };
    });
    console.log(location.state.project_Id);
  }, []);

  useEffect(() => {
    console.log(defaultData);
    reset(defaultData);
  }, [defaultData]);

  const cicdTypes = [];
  for (const key in pipelineData?.cicdTypes) {
    cicdTypes.push({ id: key, name: pipelineData?.cicdTypes[key] });
  }

  return (
    <>
      <SnackbarNotify
        open={msg !== "" && true}
        close={setMsg}
        msg={msg}
        severity="success"
      />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box>
          {/* <Typography>Release Info</Typography> */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ marginTop: "5px" }}
          >
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Release Name :</label>
                <input
                  id="release-name"
                  // label="Release Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="releaseName"
                  control={control}
                />
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Release Description :</label>
                <input
                  id="release-description"
                  // label="Release Description"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="releaseDesc"
                  control={control}
                />
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>CICD Type :</label>
                <TextFieldElement
                  id="select"
                  // label="CICD Type"
                  fullWidth
                  select
                  size="small"
                  name="cicdType"
                  control={control}
                >
                  {cicdTypes?.map((type) => (
                    <MenuItem key={type?.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                  <MenuItem></MenuItem>
                </TextFieldElement>
              </Stack>
            </Grid>
          </Grid>
          {/* <Typography>Release</Typography> */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ marginTop: "10px" }}
          >
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Select Release :</label>
                <TextFieldElement
                  id="select"
                  // label="Select Release"
                  select
                  size="small"
                  fullWidth
                  name="release"
                  control={control}
                >
                  {pipelineData?.ansiblereleases?.map((release) => (
                    <MenuItem key={release?.id} value={release?.id}>
                      {release?.release_name}
                    </MenuItem>
                  ))}
                  <MenuItem></MenuItem>
                </TextFieldElement>
              </Stack>
            </Grid>
            {/* </Grid> */}

            {/* <Typography>Web Testsets</Typography> */}
            {/* <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          > */}
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Select web Testset :</label>
                <TextFieldElement
                  id="select"
                  // label="Select web Testset"
                  select
                  size="small"
                  fullWidth
                  name="webTest"
                  control={control}
                >
                  {pipelineData?.webtestsets?.map((sets) => (
                    <MenuItem key={sets?.testset_id} value={sets?.testset_id}>
                      {sets?.testset_name}
                    </MenuItem>
                  ))}
                  <MenuItem></MenuItem>
                </TextFieldElement>
              </Stack>
            </Grid>
            {/* </Grid> */}

            {/* <Typography>API Testsets</Typography> */}
            {/* <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          > */}
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Select API Testset :</label>
                <TextFieldElement
                  id="select"
                  // label="Select API Testset"
                  select
                  size="small"
                  fullWidth
                  name="ApiTest"
                  control={control}
                >
                  {pipelineData?.apitestsetsList?.map((sets) => (
                    <MenuItem key={sets?.testset_id} value={sets?.testset_id}>
                      {sets?.testset_name}
                    </MenuItem>
                  ))}
                  <MenuItem></MenuItem>
                </TextFieldElement>
              </Stack>
            </Grid>
          </Grid>

          {/* <Typography>UnitTest</Typography> */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ marginTop: "10px" }}
          >
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Sonar cube code Path :</label>
                <input
                  id="Sonar-cube-code-Path"
                  label="Sonar cube code Path"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="sonrCubePath"
                  control={control}
                />
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Sonar cube Project Key :</label>
                <input
                  id="Sonar-cube-Project-Key"
                  label="Sonar cube Project Key"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="sonrCubeKey"
                  control={control}
                />
              </Stack>
            </Grid>
            {/* </Grid>
          <Typography>Code Quality</Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          > */}
            <Grid item md={4}>
              <Stack spacing={1}>
                <label>Unit testset path :</label>
                <input
                  id="Unit-testset-path"
                  label="Unit testset path"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="unitTestPath"
                  control={control}
                />
              </Stack>
            </Grid>
            {/* <Grid item md={2}>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid> */}
          </Grid>
          <Stack mt={2} spacing={2} direction="row-reverse">
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button
              sx={{ color: "grey", textDecoration: "underline" }}
              onClick={() => navigate("/pipeline")}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
}
