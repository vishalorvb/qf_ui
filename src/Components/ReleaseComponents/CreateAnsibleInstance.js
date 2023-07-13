import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { getProject } from "../../Services/ProjectService";

export default function CreateAnsibleInstance() {
  const { auth } = useAuth();
  const location = useLocation();
  const [msg, setMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    releaseName: yup.string().required().max(30, "Max length exceeded"),
    releaseDesc: yup.string().required(),
    playbookPath: yup.string().required(),
    credId: yup.string().required(),
    repoBranch: yup.string().required(),
    repoName: yup.string().required(),
    repoUrl: yup.string().url(),
    repoToken: yup.string().required(),
    repoUserName: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);
  useEffect(() => {
    if(globalProject == null){
        setglobalProject(project[0]);
    }
  }, [project]);

  const { setHeader,globalProject,setglobalProject } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name:
          location.pathname === "/release/createAnsibleInstance"
            ? "Create Ansible Release"
            : "Update Ansible Release",
      };
    });
  }, []);

  useEffect(() => {
    location?.state?.id
      ? axios
          .post(`/qfservice/get-release/${location?.state?.id}`, {
            project_id: location?.state?.project_id,
            release_id: "",
            release_type: "ansible_release",
          })
          .then((resp) => {
            console.log(resp?.data?.data);
            const data = resp?.data?.data;
            reset({
              releaseName: data?.release_name,
              releaseDesc: data?.release_desc,
              playbookPath: data?.playbook_path,
              credId: data?.credentialsid,
              repoBranch: data?.app_source_code_branch_name,
              repoName: data?.repo_name,
              repoUrl: data?.app_source_code_repo_url,
              repoToken: data?.app_source_code_repo_access_token,
              repoUserName: data?.gitusername,
            });
          })
      : reset();
  }, []);

  const onSubmitHandler = (data) => {
    console.log(location?.state?.project_id);

    axios
      .post(
        `/qfservice/CreateAnsibleRelease/?release_id=${
          location?.state?.id ? location?.state?.id : 0
        }&project_id=${
          location?.state?.project_id
            ? location?.state?.project_id
            : globalProject?.project_id
        }&release_name=${data?.releaseName}&release_desc=${
          data?.releaseDesc
        }&app_source_code_branch_name=${
          data?.repoBranch
        }&app_source_code_repo_access_token=${data?.repoToken}&username=${
          data?.repoUserName
        }&git_url=${data?.repoUrl}&repo_name=${data?.repoName}&credentialsid=${
          data?.credId
        }&playbook_path=${data?.playbookPath}&user_id=${auth?.userId}`
      )
      .then((resp) => {
        console.log(resp);
        const respMsg = resp?.data?.message;
        const info = resp?.data?.info;
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/release");
        }, 3000);
        setMsg(respMsg);
        info !== null && reset();
      });
  };

  return (
    <>
      <SnackbarNotify
        open={open && true}
        close={setOpen}
        msg={
          location.pathname === "/release/createAnsibleInstance"
            ? "Release Created Successfully"
            : msg
        }
        severity="success"
      />
      {location.pathname === "/release/createAnsibleInstance" ? (
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
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Repository Configuration" defaultState={true}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ marginTop: 0.1 }}
          >
            <Grid item md={6}>
              <label>Repo Username</label>
              <TextFieldElement
                id="Repo-Username"
                variant="outlined"
                size="small"
                fullWidth
                name="repoUserName"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Repo Access Token</label>
              <TextFieldElement
                id="repo-access-token "
                variant="outlined"
                size="small"
                fullWidth
                name="repoToken"
                control={control}
              />
            </Grid>
            <Grid item md={12}>
              <label>Repo URL</label>
              <TextFieldElement
                id="repo-url "
                variant="outlined"
                size="small"
                fullWidth
                name="repoUrl"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Repo Name</label>
              <TextFieldElement
                id="Repo Name"
                variant="outlined"
                size="small"
                fullWidth
                name="repoName"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Repo Branch</label>
              <TextFieldElement
                id="Repo Branch"
                variant="outlined"
                size="small"
                fullWidth
                name="repoBranch"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Credentials Id</label>
              <TextFieldElement
                id="Credentials Id"
                variant="outlined"
                size="small"
                fullWidth
                name="credId"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <label>Playbook Path</label>
              <TextFieldElement
                id="Playbook Path"
                variant="outlined"
                size="small"
                fullWidth
                name="playbookPath"
                control={control}
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <Stack mt={2} spacing={2} direction="row-reverse">
          <Button variant="contained" type="submit">
            Create & Continue
          </Button>
          <Button
            sx={{ color: "grey", textDecoration: "underline" }}
            onClick={() => navigate("/release")}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
