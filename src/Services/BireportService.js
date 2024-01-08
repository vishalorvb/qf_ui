import axios from "axios";
import { biservice } from "../Environment";

export async function deleteReport(testMapId, callback) {
    axios({
        method: "post",
        url: `${biservice}/deletetestsets?testset_map_id=${testMapId}`,
    }).then((res) => {
        callback();
    }).catch((err) => {
        console.log(err);
    });
}