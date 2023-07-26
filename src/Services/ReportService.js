import axios from "axios";
import { baseUrl } from "../Environment";

export async function deleteReport(testMapId, callback) {
  console.log("delete report service");
  axios({
    method: "post",
    url: `${baseUrl}/Biservice/bireport/deletetestsets?testset_map_id=${testMapId}`,
  }).then((res) => {
    callback();
  });
}
