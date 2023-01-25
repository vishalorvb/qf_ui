import { useEffect, useState } from "react";
import ListRenderer from "./ListRenderer";
import { getPipelinesHistoryReport } from "../../Services/DevopsServices";
import { useLocation } from "react-router-dom";

export default function ApiAutomation() {
  const [result, setResult] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getPipelinesHistoryReport(setResult, location.state.id, "API");
  }, []);
  return <ListRenderer result={result} />;
}
