import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import { Box, Grid, TextField } from "@mui/material";
export default function CreateInstance() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Instance",
      };
    });
  }, []);
  return (
    <Box>
      <AccordionTemplate name="Release Info" defaultState={true}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={6}>
            <TextField
              id="release-name"
              label="Release Name"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="release-description"
              label="Release Description"
              variant="outlined"
              size="small"
              fullWidth
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
            <TextField
              id="Server-URL"
              label="Server URL"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="Server-URL"
              label="Server URL"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="Server-Credentials-Id"
              label="Server-Credentials-Id"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item md={12}>
            <TextField
              id="War-Name"
              label="War Name "
              variant="outlined"
              size="small"
              fullWidth
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
            <TextField
              id="Repo-Username"
              label="Repo Username"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="repo-access-token "
              label="Repo Access Token "
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="repo-url "
              label="Repo URL"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item md={12}>
            <TextField
              id="Repo Branch"
              label="Repo Branch  "
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </AccordionTemplate>
    </Box>
  );
}
