import useHead from "../../hooks/useHead";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCreatePipelineData,
  createPipeline,
} from "../../Services/DevopsServices";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CreatePipeline() {
  const [pipelineData, setPipelineData] = useState({});
  const [defaultData, setDefaultData] = useState({});
  const [saveRes, setSaveRes] = useState({});

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

  const onSubmitHandler = (data) => {
    console.log({ data });
    createPipeline(setSaveRes, data, location.state.id);
  };

  const { setHeader } = useHead();

  useEffect(() => {
    getCreatePipelineData(setPipelineData, setDefaultData, location.state.id);
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Pipeline",
      };
    });
  }, []);

  useEffect(() => {
    reset(defaultData);
  }, [defaultData]);

  const cicdTypes = [];
  for (const key in pipelineData?.cicdTypes) {
    cicdTypes.push({ id: key, name: pipelineData?.cicdTypes[key] });
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Box>
        <Typography>Release Info</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <TextFieldElement
              id="release-name"
              label="Release Name"
              variant="outlined"
              size="small"
              fullWidth
              name="releaseName"
              control={control}
            />
          </Grid>
          <Grid item md={2}>
            <TextFieldElement
              id="release-description"
              label="Release Description"
              variant="outlined"
              size="small"
              fullWidth
              name="releaseDesc"
              control={control}
            />
          </Grid>
          <Grid item md={2}>
            <TextFieldElement
              id="select"
              label="CICD Type"
              fullWidth
              select
              size="small"
              name="cicdType"
              control={control}
            >
              {cicdTypes?.map((type) => (
                <MenuItem value={type.id}>{type.name}</MenuItem>
              ))}
              <MenuItem></MenuItem>
            </TextFieldElement>
          </Grid>
        </Grid>

        <Typography>Release</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <TextFieldElement
              id="select"
              label="Select Release"
              select
              size="small"
              fullWidth
              name="release"
              control={control}
            >
              {pipelineData?.ansiblereleases?.map((release) => (
                <MenuItem value={release?.id}>{release?.release_name}</MenuItem>
              ))}
              <MenuItem></MenuItem>
            </TextFieldElement>
          </Grid>
        </Grid>

        <Typography>Web Testsets</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <TextFieldElement
              id="select"
              label="Select web Testset"
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
          </Grid>
        </Grid>

        <Typography>API Testsets</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <TextFieldElement
              id="select"
              label="Select API Testset"
              select
              size="small"
              fullWidth
              name="ApiTest"
              control={control}
            >
              {pipelineData?.apitestsetsList?.map((sets) => (
                <MenuItem value={sets?.testset_id}>
                  {sets?.testset_name}
                </MenuItem>
              ))}
              <MenuItem></MenuItem>
            </TextFieldElement>
          </Grid>
        </Grid>

        <Typography>UnitTest</Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <TextFieldElement
              id="Sonar-cube-code-Path"
              label="Sonar cube code Path"
              variant="outlined"
              size="small"
              fullWidth
              name="sonrCubePath"
              control={control}
            />
          </Grid>
          <Grid item md={2}>
            <TextFieldElement
              id="Sonar-cube-Project-Key"
              label="Sonar cube Project Key"
              variant="outlined"
              size="small"
              fullWidth
              name="sonrCubeKey"
              control={control}
            />
          </Grid>
        </Grid>
        <Typography>Code Quality</Typography>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={2}>
            <TextFieldElement
              id="Unit-testset-path"
              label="Unit testset path"
              variant="outlined"
              size="small"
              fullWidth
              name="unitTestPath"
              control={control}
            />
          </Grid>
          <Grid item md={2}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
