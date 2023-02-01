import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { SettingsInputComponent } from "@mui/icons-material";

const steps = [
  "Initialization",
  "Ansible Code",
  "Code Quality",
  "Unit Test",
  "Deployment",
  "Api Automation",
  "Web Automation",
  "Send Results to QF",
];

export default function Overview() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper orientation="vertical">
        {steps.map((label) => (
          <Step completed key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
