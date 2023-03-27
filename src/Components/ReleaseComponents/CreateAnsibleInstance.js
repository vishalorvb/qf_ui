import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

export default function CreateAnsibleInstance() {
  const { auth } = useAuth();
  const location = useLocation();
  const [msg, setMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  console.log(location);

  const schema = yup.object().shape({
    releaseName: yup.string().required(),
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

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Ansible Instance",
      };
    });
  }, []);

  useEffect(() => {
    location?.state?.id &&
      axios
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
        });
  }, []);

  const onSubmitHandler = (data) => {
    console.log(location?.state?.project_id);

    axios
      .post(
        `/qfservice/CreateAnsibleRelease/?release_id=${
          location?.state?.id ? location?.state?.id : 0
        }&project_id=${location?.state?.project_id}&release_name=${
          data?.releaseName
        }&release_desc=${data?.releaseDesc}&app_source_code_branch_name=${
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
        msg={msg}
        severity="success"
      />
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <AccordionTemplate name="Release Info" defaultState={true}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item md={6}>
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
            <Grid item md={6}>
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
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Repository Configuration" defaultState={true}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item md={6}>
              <TextFieldElement
                id="Repo-Username"
                label="Repo Username"
                variant="outlined"
                size="small"
                fullWidth
                name="repoUserName"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                id="repo-access-token "
                label="Repo Access Token "
                variant="outlined"
                size="small"
                fullWidth
                name="repoToken"
                control={control}
              />
            </Grid>
            <Grid item md={12}>
              <TextFieldElement
                id="repo-url "
                label="Repo URL"
                variant="outlined"
                size="small"
                fullWidth
                name="repoUrl"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                id="Repo Name"
                label="Repo Name"
                variant="outlined"
                size="small"
                fullWidth
                name="repoName"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                id="Repo Branch"
                label="Repo Branch  "
                variant="outlined"
                size="small"
                fullWidth
                name="repoBranch"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                id="Credentials Id"
                label="Credentials Id"
                variant="outlined"
                size="small"
                fullWidth
                name="credId"
                control={control}
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                id="Playbook Path"
                label="Playbook Path"
                variant="outlined"
                size="small"
                fullWidth
                name="playbookPath"
                control={control}
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
}
