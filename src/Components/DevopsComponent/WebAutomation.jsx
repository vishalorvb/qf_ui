import { useEffect, useState } from "react";
import ListRenderer from "./ListRenderer";
import { getPipelinesHistoryReport } from "../../Services/QfService";
import { useLocation } from "react-router-dom";
import { Alert } from "@mui/material";

export default function WebAutomation() {
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(setResult, setError, location.state.id, "WEB");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return result?.length > 0 ? (
    <ListRenderer result={result} />
  ) : (
    <Alert severity="error">{error}</Alert>
  );
}
