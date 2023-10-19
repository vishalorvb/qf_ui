import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Paper } from "@mui/material";

export default function JobProgressionBar(props) {
  const { progressPercentage, timeLeft, jobName, inProgress } =
    props;
console.log(inProgress)
  return (
    <Paper variant="outlined">
      <Stack direction="row" justifyContent="space-between" p={1}>
        <h4>{progressPercentage ?? 100}% </h4>
        <h4>
          {jobName} Execution is {inProgress ? "in progress..." : "completed"}
        </h4>
        { inProgress &&  <h4>{timeLeft}s left</h4>}
      </Stack>
      <LinearProgress
        sx={{ height: 10 }}
        variant="determinate"
        value={progressPercentage ?? 100}
      />
    </Paper>
  );
}
