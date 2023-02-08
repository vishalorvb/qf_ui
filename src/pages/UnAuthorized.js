import { Grid, Typography } from "@mui/material";

export default function () {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={12}
        md={12}
        sx={{
          backgroundImage: "url(unauthorized.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          backgroundSize: "100%",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
