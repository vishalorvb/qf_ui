import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { SettingsInputComponent } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPipelinesHistoryReport } from "../../Services/DevopsServices";
import { Alert } from "@mui/material";

export default function Overview() {
  const [result, setResult] = useState({});
  const [resultRender, setResultRender] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(setResult, setError, location.state.id, "INFO");
  }, []);

  let include = ["initialization","git","deployment","apiautomation","webautomation","codequality"]
  useEffect(() => {
    for (const key in result) {
      if (include.includes(key)) {
        setResultRender((ps) => [...ps, { name: key, status: result[key] }]);
      }
    }
  }, [result]);

  

  return (
    <Box sx={{ width: "100%" }}>
      {resultRender?.length > 0 ? (
        <Stepper orientation="vertical">
          {resultRender?.map((label) => (
            <Step completed={label.status} key={label.name}>
              <StepLabel>{label.name}</StepLabel>
            </Step>
          ))}
           <Step completed={true} key={"Finished"}>
              <StepLabel>{"Finished"}</StepLabel>
            </Step>
        </Stepper>
      ) : (
        <Alert severity="error">{error}</Alert>
      )}
    </Box>
  );
}
