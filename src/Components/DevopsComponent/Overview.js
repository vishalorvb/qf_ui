import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { SettingsInputComponent } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPipelinesHistoryReport } from "../../Services/DevopsServices";

export default function Overview() {
  const [result, setResult] = useState({});
  const [resultRender, setResultRender] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(setResult, location.state.id, "INFO");
  }, []);

  useEffect(() => {
    for (const key in result) {
      if (!key.includes("response")) {
        setResultRender((ps) => [...ps, { name: key, status: result[key] }]);
      }
    }
  }, [result]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper orientation="vertical">
        {resultRender?.map((label) => (
          <Step completed={label.status} key={label.name}>
            <StepLabel>{label.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
