
import { dashboard } from "../Environment";
import axios from "axios"




export function ReportPercentage(callback, projectId, sprintName = 0) {
    axios({
        method: "post",
        url: `${dashboard}/getReportPercentagebyProjectandsprint?project_id=${projectId}${sprintName === 0 ? "" : `&sprintname=${sprintName}`
            }`,
    }).then((res) => {
        callback(Math.floor(res.data.data.total_pass_percentage));
    }).catch((err) => {
        console.log(err);
    });
}

export async function getDashboardDetails(projectId, userId) {
    return await axios.get(
        `${dashboard}/dashboard/${projectId}?userId=${userId}`
    ).then(res => {
        return res
    }).catch((err) => {
        console.log(err);
    });
}


export function getTestsetReport(projectId, applicationId, limit, callback) {
    axios.get(`${dashboard}/getTestsetPassFailcountByProjectIdApplicationId?project_id=${projectId}&module_id=${applicationId}&limit=${limit}`).then(res => {
        callback(res.data.data)
    }).catch((err) => {
        console.log(err);
    });
}