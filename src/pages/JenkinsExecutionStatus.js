import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import JobProgressionBar from "../CustomComponent/JobProgressionBar";

export default function JenkinsExecutionStatus() {
  const [logs, setLogs] = useState("");
  const [buildData, setBuilddata] = useState();
  const [insightData, setInsightData] = useState({});
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const username = "qfuser";
      const password = "Pro09!@";
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
      const response1 = await axios.get(
        "http://10.11.12.243:8081/job/Qf_react/api/json?pretty=true",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setBuilddata(response1?.data);
      const logsURL = `http://10.11.12.243:8081/job/Qf_react/lastBuild/logText/progressiveHtml`;
      const insightsURL = `http://10.11.12.243:8081/job/Qf_react/lastBuild/api/json?tree=timestamp,estimatedDuration,result,duration,building,executor[progress]`;
      try {
        while (true) {
          const jenkinLogs = await axios.get(logsURL, {
            headers: {
              Authorization: authHeader,
            },
          });
          const insightData = await axios.get(insightsURL, {
            headers: {
              Authorization: authHeader,
            },
          });
          setLogs(jenkinLogs.data);
          setInsightData(insightData?.data);
          console.log(insightData?.data?.building);
          if (!insightData?.data?.building) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error("Error fetching Jenkins logs:", error);
      }
    } catch (error) {
      console.error("Error fetching Jenkins data:", error);
    }
  };

  return (
    <Stack spacing={2}>
      <div style={{ position: "sticky", top: "0" }}>
        <JobProgressionBar
          progressPercentage={insightData?.executor?.progress}
          timeLeft={
            (insightData?.estimatedDuration - insightData?.duration) / 1000
          }
          jobName={buildData?.name}
          inProgress={insightData?.data?.building}
        />
      </div>
      <pre>{logs}</pre>
    </Stack>
  );
}
