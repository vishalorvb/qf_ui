import useHead from "../../hooks/useHead";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
export default function CreatePipeline() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Pipeline",
      };
    });
  }, []);
  return (
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
          <TextField
            id="release-name"
            label="Release Name"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id="release-description"
            label="Release Description"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id="select"
            label="CICD Type"
            fullWidth
            select
            size="small"
          >
            <MenuItem value="Jenkins">Jenkins</MenuItem>
            <MenuItem value="Gitops">Gitops</MenuItem>
          </TextField>
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
          <TextField
            id="select"
            label="Select Release"
            select
            size="small"
            fullWidth
          >
            <MenuItem value="Jenkins">Jenkins</MenuItem>
            <MenuItem value="Gitops">Gitops</MenuItem>
          </TextField>
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
          <TextField
            id="select"
            label="Select web Testset"
            select
            size="small"
            fullWidth
          >
            <MenuItem value="Jenkins">Jenkins</MenuItem>
            <MenuItem value="Gitops">Gitops</MenuItem>
          </TextField>
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
          <TextField
            id="select"
            label="Select API Testset"
            select
            size="small"
            fullWidth
          >
            <MenuItem value="Jenkins">Jenkins</MenuItem>
            <MenuItem value="Gitops">Gitops</MenuItem>
          </TextField>
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
          <TextField
            id="Sonar-cube-code-Path"
            label="Sonar cube code Path"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id="Sonar-cube-Project-Key"
            label="Sonar cube Project Key"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <Typography>Code Quality</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item md={2}>
          <TextField
            id="Unit-testset-path"
            label="Unit testset path"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
}
