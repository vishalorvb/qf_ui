import { Divider, Grid, Typography } from "@mui/material";
import NavListRendedrer from "../CustomComponent/NavListRenderer";

export default function CustomCode() {
  const listData = [
    {
      name: "first",
      id: 1,
      desc: "first",
    },
  ];
  return (
    <Grid container justifyContent="space-evenly">
      <Grid md={3} item>
        <NavListRendedrer listData={listData} />;
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid md={8} container item direction="column" gap={2}>
        <Grid item>
          <Typography>ClassName</Typography>
        </Grid>
        <Grid item>
          <input />
        </Grid>
        <Grid item>
          <input />
        </Grid>
      </Grid>
    </Grid>
  );
}
