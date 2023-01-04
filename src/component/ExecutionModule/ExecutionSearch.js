import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Paper, Autocomplete, TextField } from "@mui/material";
import Table from "../CustomComponent/Table";

export default function ExecutionSearch() {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Shawshank Redemption", year: 1994 },
  ];

  const columns = [
    { field: "id", headerName: "S.no.", flex: 1 },
    {
      field: "ProjectName",
      headerName: "Project Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "AutomationType",
      headerName: "Automation Type",
      flex: 3,
      sortable: false,
    },
    {
      field: "ExecutionEnv",
      headerName: "Execution Env",
      flex: 3,
      sortable: false,
    },
    {
      field: "TestingEnv",
      headerName: "Testing Env",
      flex: 3,
      sortable: false,
    },
    {
      field: "ExecutionPerc",
      headerName: "Execution %",
      flex: 3,
      sortable: false,
    },
  ];

  const rows = [
    {
      id: 1,
      ProjectName: "Snow",
      AutomationType: "Jon",
      ExecutionEnv: 35,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 2,
      ProjectName: "Lannister",
      AutomationType: "Cersei",
      ExecutionEnv: 42,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 3,
      ProjectName: "Lannister",
      AutomationType: "Jaime",
      ExecutionEnv: 45,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 4,
      ProjectName: "Stark",
      AutomationType: "Arya",
      ExecutionEnv: 16,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 5,
      ProjectName: "Targaryen",
      AutomationType: "Daenerys",
      ExecutionEnv: null,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 6,
      ProjectName: "Melisandre",
      AutomationType: null,
      ExecutionEnv: 150,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 7,
      ProjectName: "Clifford",
      AutomationType: "Ferrara",
      ExecutionEnv: 44,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 8,
      ProjectName: "Frances",
      AutomationType: "Rossini",
      ExecutionEnv: 36,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 9,
      ProjectName: "Roxie",
      AutomationType: "Harvey",
      ExecutionEnv: 65,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
    {
      id: 10,
      ProjectName: "Roxie",
      AutomationType: "Harvey",
      ExecutionEnv: 65,
      TestingEnv: "tnvenv",
      ExecutionPerc: "abhi",
    },
  ];

  return (
    <Paper elevation={1} sx={{ padding: "10px" }}>
      <Container
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ marginBottom: "10px" }}
        >
          <Grid item xs={6} sm={6} md={5}>
            <label>
              <Typography variant="body2">
                Automation Type<span className="importantfield">*</span>:
              </Typography>
            </label>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {" "}
            <Autocomplete
              options={top100Films}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ marginBottom: "10px" }}
        >
          <Grid item xs={6} sm={6} md={4}>
            <label>
              <Typography variant="body2">
                Project<span className="importantfield">*</span>:
              </Typography>
            </label>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {" "}
            <Autocomplete
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ marginBottom: "10px" }}
        >
          <Grid item xs={6} sm={6} md={5}>
            <label>
              <Typography variant="body2">
                Execution Env. <span className="importantfield">*</span>:
              </Typography>
            </label>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {" "}
            <Autocomplete
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ marginBottom: "10px" }}
        >
          <Grid item xs={6} sm={6} md={5}>
            <label>
              <Typography variant="body2">
                Testing Env.<span className="importantfield">*</span>:
              </Typography>
            </label>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {" "}
            <Autocomplete
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ marginBottom: "10px" }}
        >
          <Grid item xs={6} sm={6} md={4}>
            <label>
              <Typography variant="body2">
                Status <span className="importantfield">*</span>:
              </Typography>
            </label>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            {" "}
            <Autocomplete
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Grid>
        </Grid>
        <Table columns={columns} rows={rows} hidefooter={false} />
      </Container>
    </Paper>
  );
}
