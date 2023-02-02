import { Divider, Grid, MenuItem, Select, Typography } from "@mui/material";

export default function Execution() {
  return (
    <div>
      <h3>Please Select a Project</h3>
      <Divider></Divider>
      <Grid container spacing={1}>
        <Grid item md={2}>
          <Typography variant="p" gutterBottom>
            Project Name
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Select
            size="small"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
            // onChange={handleChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={"Post"}>Post</MenuItem>
            <MenuItem value={"Get"}>Get</MenuItem>
            <MenuItem value={"Put"}>Put</MenuItem>
            <MenuItem value={"Delete"}>Delete</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}
