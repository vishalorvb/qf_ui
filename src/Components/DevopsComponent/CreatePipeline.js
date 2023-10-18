import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCreatePipelineData } from "../../Services/QfService";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Stack } from "@mui/system";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import { getProject } from "../../Services/QfService";

export default function CreatePipeline() {
  const [pipelineData, setPipelineData] = useState({});
  const [defaultData, setDefaultData] = useState({});
  const [msg, setMsg] = useState("");
  const [project, setProject] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { setHeader, globalProject, setglobalProject } = useHead();
  const schema = yup.object().shape({
    releaseName: yup.string().required().max(30, "Max length exceeded"),
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
    const projectId = location.state.project_id;
    axios
      .post(`/qfservice/Createpipeline`, null, {
        params: {
          project_id: globalProject.project_id,
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
          release_id: id ?? 0,
        },
      })
      .then((resp) => {
        console.log(resp);
        const respMsg = resp?.data?.message;
        const info = resp?.data?.info;
        setMsg(respMsg);
        respMsg === "SUCCESS" && reset();
        setTimeout(() => {
          navigate("/pipeline");
        }, 200);
      });
  };

  console.log(location.state);

  useEffect(() => {
    globalProject?.project_id &&
      getCreatePipelineData(
        setPipelineData,
        setDefaultData,
        location.state.id ?? 0,
        globalProject?.project_id
      );
    setHeader((ps) => {
      return {
        ...ps,
        name:
          location.pathname === "/pipeline/CreatePipeline"
            ? "Create Pipeline"
            : "Update Pipeline",
      };
    });
    console.log(location.state.project_id);
  }, [globalProject]);

  useEffect(() => {
    console.log(defaultData);
    reset(defaultData);
  }, [defaultData]);

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);
  useEffect(() => {
    if (globalProject === null) {
      setglobalProject(project[0]);
    }
  }, [project]);

  const cicdTypes = [];
  for (const key in pipelineData?.cicdTypes) {
    cicdTypes.push({ id: key, name: pipelineData?.cicdTypes[key] });
  }

  return (
    <>
      <SnackbarNotify
        open={msg !== "" && true}
        close={setMsg}
        msg={
          location.pathname === "/pipeline/CreatePipeline"
            ? "Pipeline Created Successfully"
            : msg
        }
        severity="success"
      />
      {location.pathname === "/pipeline/CreatePipeline" ? (
        <Grid container justifyContent="flex-end" mb={1}>
          <Grid item md={2}>
            <label for="">Projects</label>
            <Autocomplete
              disablePortal
              disableClearable
              id="project_id"
              options={project}
              value={globalProject || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option.project_name}
              onChange={(e, value) => {
                setglobalProject(value);
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text" {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
        </Grid>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <AccordionTemplate
          name="Release Info"
          defaultState={true}
          style={{ marginTop: "10px" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 0.1 }}
          >
            <Grid item md={6}>
              <label>Release Name</label>
              <TextFieldElement
                id="release-name"
                variant="outlined"
                size="small"
                fullWidth
                name="releaseName"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Release Description</label>
              <TextFieldElement
                id="release-description"
                variant="outlined"
                size="small"
                fullWidth
                name="releaseDesc"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Select Release</label>
              <TextFieldElement
                id="select"
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
            </Grid>
            <Grid item md={6}>
              <label>CICD Type</label>
              <TextFieldElement
                id="select"
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
            </Grid>
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Testsets" defaultState={true}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 0.1 }}
          >
            <Grid item md={6}>
              <label>Select web Testset</label>
              <TextFieldElement
                id="select"
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
            <Grid item md={6}>
              <label>Select API Testset</label>
              <TextFieldElement
                id="select"
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
            </Grid>
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Code Quality" defaultState={true}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 0.1 }}
          >
            <Grid item md={6}>
              <label>Sonar cube code Path</label>
              <TextFieldElement
                id="Sonar-cube-code-Path"
                variant="outlined"
                size="small"
                fullWidth
                name="sonrCubePath"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Sonar cube Project Key</label>
              <TextFieldElement
                id="Sonar-cube-Project-Key"
                variant="outlined"
                size="small"
                fullWidth
                name="sonrCubeKey"
                control={control}
              />
            </Grid>
            <Grid item md={12}>
              <label>Unit testset path</label>
              <TextFieldElement
                id="Unit-testset-path"
                variant="outlined"
                size="small"
                fullWidth
                name="unitTestPath"
                control={control}
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <Stack mt={2} spacing={2} direction="row-reverse">
          <Button variant="contained" type="submit">
            Save & Continue
          </Button>
          <Button
            sx={{ color: "grey", textDecoration: "underline" }}
            onClick={() => navigate("/pipeline")}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
