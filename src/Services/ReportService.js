import axios from "axios";
import { report } from "../Environment";

export async function getReport(fromDate, toDate, applicationId, userId) {
    return await axios.post(
        `${report}/GetReportsBetweenTwoDates?start_date=${fromDate}&end_date=${toDate}&module_id=${applicationId}&user_id=${userId}`
    ).then(res => {
        return res;
    })
}