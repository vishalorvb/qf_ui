import useHead from "../../hooks/useHead";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function CreateAnsibleInstance() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    releaseName: yup.string().required(),
    releaseDesc: yup.string().required(),
    playbookPath: yup.string().required(),
    credId: yup.string().required(),
    repoBranch: yup.string().required(),
    repoName: yup.string().required(),
    repoUrl: yup.string().required(),
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

  const onSubmitHandler = (data) => {
    console.log({ data });
  };

  return (
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
      <Button type="submit" variant="contained">
        Save
      </Button>
    </form>
  );
}
