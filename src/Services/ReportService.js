import axios from "axios";
import { biservice } from "../Environment";

export async function deleteReport(testMapId, callback) {
    axios({
        method: "post",
        url: `${biservice}/bireport/deletetestsets?testset_map_id=${testMapId}`,
    }).then((res) => {
        callback();
    });
}


export async function getReport(fromDate, toDate, applicationId, userId) {
    return await axios.post(
        `${biservice}/qfreportservice/GetReportsBetweenTwoDates?start_date=${fromDate}&end_date=${toDate}&module_id=${applicationId}&user_id=${userId}`
    ).then(res => {
        return res;
    })
}