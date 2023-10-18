import axios from "axios";
import { dashboard } from "../Environment";

export function ReportPercentage(callback, projectId, sprintName = 0) {
  axios({
    method: "post",
    url: `${dashboard}/qfdashboard/getReportPercentagebyProjectandsprint?project_id=${projectId}${
      sprintName === 0 ? "" : `&sprintname=${sprintName}`
    }`,
  }).then((res) => {
    console.log(res.data);
    callback(Math.floor(res.data.data.total_pass_percentage));
  });
}

export function getDashboardDetails(projectId, userId) {
  return axios.get(
    `${dashboard}/qfdashboard/dashboard/${projectId}?userId=${userId}`
  );
}
