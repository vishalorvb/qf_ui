import { Divider, Grid, Stack, Typography } from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";

export default function ReportDetails({ selectedItemData }) {
  console.log(selectedItemData);
  return (
    <Stack gap={1}>
      <Typography sx={{ color: "#5C6780", fontWeight: "bold" }} variant="h5">
        {selectedItemData?.testcase_name}
      </Typography>

      <Divider />

      <Stack direction="row" gap={10}>
        <Stack>
          <Stack direction="row">
            <HourglassTopIcon sx={{ color: "#636161" }} />
            <Typography variant="subtitle1">START TIME</Typography>
          </Stack>
          <Typography
            variant="p"
            style={{ color: "#66BB6A", fontWeight: "bold" }}
          >
            {selectedItemData?.start_time_st}
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row">
            <HourglassBottomIcon sx={{ color: "#636161" }} />
            <Typography variant="subtitle1">END TIME</Typography>
          </Stack>
          <Typography
            variant="p"
            style={{ color: "#EF5350", fontWeight: "bold" }}
          >
            {selectedItemData?.end_time_st}
          </Typography>
        </Stack>
        <Stack>
          <Stack direction="row">
            <SettingsApplicationsIcon sx={{ color: "#636161" }} />
            <Typography variant="subtitle1">EXECUTION TIME</Typography>
          </Stack>
          <Typography
            variant="p"
            style={{ color: "#596981", fontWeight: "bold" }}
          >
            {selectedItemData?.execution_time_st}
          </Typography>
        </Stack>
      </Stack>
      <Divider />

      {selectedItemData?.datasetdata?.map((dataset) => {
        return (
          <>
            {dataset?.result_type === "screen" && (
              <Typography
                sx={{
                  color: "#5C6780",
                  fontSize: "16px",
                  backgroundColor: "#e8f2fd",
                  borderRadius: "5px",
                }}
                variant="h6"
              >
                {dataset?.text}
              </Typography>
            )}
            <Grid>
              {dataset?.result_type === "pass" && (
                <>
                  {dataset?.text.includes("Entered User") === true ? (
                    <KeyboardIcon
                      sx={{ color: "#636161", marginRight: "10px" }}
                    />
                  ) : dataset?.text.includes("Entered Password") === true ? (
                    <VisibilityOffIcon
                      sx={{ color: "#636161", marginRight: "10px" }}
                    />
                  ) : dataset?.text.includes("Text is displayed as :") ===
                    true ? (
                    <CheckCircleIcon
                      sx={{ color: "green", marginRight: "10px" }}
                    />
                  ) : dataset?.text.includes("Clicked on") === true ? (
                    <TouchAppIcon
                      sx={{ color: "#636161", marginRight: "10px" }}
                    />
                  ) : (
                    <KeyboardIcon
                      sx={{ color: "#636161", marginRight: "10px" }}
                    />
                  )}
                  <Typography variant="p">{dataset?.text}</Typography>
                </>
              )}
            </Grid>
            <Grid>
              {dataset?.result_type === "info" && (
                <>
                  <InfoIcon sx={{ color: "#636161", marginRight: "10px" }} />
                  <Typography variant="p">{dataset?.text}</Typography>
                </>
              )}
            </Grid>
            <Grid>
              {dataset?.result_type === "fail" && (
                <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                  {dataset?.result_type.includes("fail") ? (
                    <CancelIcon sx={{ color: "red", marginRight: "10px" }} />
                  ) : (
                    <CheckCircleIcon
                      sx={{ color: "green", marginRight: "10px" }}
                    />
                  )}
                  <Typography variant="p">{dataset?.text}</Typography>
                </div>
              )}
            </Grid>
            {dataset?.result_type === "fail" && (
              <img
                src={`data:image/png;base64,${dataset?.screenshot}`}
                width={"250px"}
              />
            )}
            <Divider />
          </>
        );
      })}
    </Stack>
  );
}
