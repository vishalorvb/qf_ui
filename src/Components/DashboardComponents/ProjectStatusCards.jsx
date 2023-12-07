import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { Grid, Paper, Stack, Typography } from "@mui/material";

export default function ProjectStatusCards({
  testCases,
  dataSets,
  totalSprint,
}) {
  const cardsIconsSx = { fontSize: 100, color: "#009fee" };

  const cardsData = [
    {
      name: "Total Testcases",
      data: testCases,
      icon: <SettingsApplicationsIcon sx={cardsIconsSx} />,
    },
    {
      name: "Total Datasets",
      data: dataSets,
      icon: <AssignmentIcon sx={cardsIconsSx} />,
    },
    {
      name: "Total Sprints",
      data: totalSprint,
      icon: <ManageSearchIcon sx={cardsIconsSx} />,
    },
  ];

  const cardx = cardsData?.map((cardObject) => {
    return (
      <Grid item md={4}>
        <Paper variant="outlined" sx={{ borderColor: "#b3e6ff" }}>
          <Stack direction="row">
            {cardObject.icon}
            <Stack pl={2} sx={{ backgroundColor: "#b3e6ff", width: "100%" }}>
              <Typography variant="h3">{cardObject.data ?? 0}</Typography>
              <Typography variant="subtitle1" align="left" component="div">
                <b>{cardObject.name}</b>
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    );
  });

  return (
    <Grid container spacing={3}>
      {cardx}
    </Grid>
  );
}
