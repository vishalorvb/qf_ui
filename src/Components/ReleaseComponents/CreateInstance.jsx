import useHead from "../../hooks/useHead";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { qfservice } from "../../Environment";
export default function CreateAnsibleInstance() {
  const location = useLocation();
  const [msg, setMsg] = useState(false);

  const schema = yup.object().shape({
    releaseName: yup.string().required().max(30, "Max length exceeded"),
    releaseDesc: yup.string().required(),
    repoBranch: yup.string().required(),
    repoUrl: yup.string().url(),
    serverCredentialId: yup.string().required(),
    warName: yup.string().required(),
    repoUsername: yup.string().required(),
    repoAccessToken: yup.string().required(),
    serverUrl: yup.string().required(),
    serverType: yup.string().required(),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Instance",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitHandler = (data) => {
    console.log(data);
    axios
      .post(
        `${qfservice}/CreateWebRelease?release_id=${
          location?.state?.id ? location?.state?.id : 0
        }&module_id=${location?.state?.module_id}&release_name=${
          data?.releaseName
        }&release_desc=${data?.releaseDesc}&app_server_type=${
          data?.serverType
        }&app_server_url=${data?.serverUrl}&app_server_credentials_id=${
          data?.serverCredentialId
        }&war_name=${data?.warName}&app_source_code_branch_name=${
          data?.repoBranch
        }&app_source_code_repo_access_token=${data?.repoAccessToken}&username=${
          data?.repoUsername
        }&git_url=${
          data?.repoUrl
        }&local_repo_path&where_to_build&build_folder_path&build_services_path&build_backup_path&heart_beat_urls&project_path&allowed_users_to_release`
      )
      .then((resp) => {
        console.log(resp);
        const respMsg = resp?.data?.message;
        const info = resp?.data?.info;
        setMsg(respMsg);
        info && reset();
      });
  };

  return (
    <>
      <SnackbarNotify
        open={msg && true}
        close={setMsg}
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
                control={control}
                id="release-name"
                name="releaseName"
                label="Release Name"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Release Name"
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                control={control}
                id="release-description"
                name="releaseDesc"
                label="Release Description"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Release Description"
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <AccordionTemplate name="Release" defaultState={true}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item md={6}>
              <TextFieldElement
                control={control}
                id="Server-URL"
                name="serverUrl"
                label="Server URL"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Server URL"
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                control={control}
                id="Server-Type"
                label="Server Type"
                name="serverType"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Server Type"
              />
            </Grid>
            <Grid item md={12}>
              <TextFieldElement
                control={control}
                id="Server-Credentials-Id"
                label="Server-Credentials-Id"
                name="serverCredentialId"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Server CredentialId"
              />
            </Grid>

            <Grid item md={12}>
              <TextFieldElement
                control={control}
                id="War-Name"
                label="War Name "
                name="warName"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="War Name"
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
                control={control}
                id="Repo-Username"
                label="Repo Username"
                name="repoUsername"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Repository Username"
              />
            </Grid>
            <Grid item md={6}>
              <TextFieldElement
                control={control}
                id="repo-access-token "
                label="Repo Access Token "
                name="repoAccessToken"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Repository Token"
              />
            </Grid>
            <Grid item md={12}>
              <TextFieldElement
                control={control}
                id="repo-url "
                label="Repo URL"
                name="repoUrl"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Repository Url"
              />
            </Grid>

            <Grid item md={12}>
              <TextFieldElement
                control={control}
                id="Repo Branch"
                label="Repo Branch  "
                name="repoBranch"
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Repository Branch"
              />
            </Grid>
          </Grid>
        </AccordionTemplate>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </>
  );
}
