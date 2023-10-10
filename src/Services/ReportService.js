import axios from "axios";
import { baseUrl, authservice, biservice, dashboard, qfservice, report, userservice } from "../Environment";


export async function deleteReport(testMapId, callback) {
    console.log("delete report service");
    axios({
        method: "post",
        url: `${biservice}/bireport/deletetestsets?testset_map_id=${testMapId}`,
    }).then((res) => {
        callback();
    });
}
