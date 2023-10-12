import axios from "axios";
<<<<<<< HEAD
import { biservice } from "../Environment";

=======
import {
  authservice,
  biservice,
  dashboard,
  qfservice,
  report,
  userservice,
} from "../Environment";
>>>>>>> 565e4c1e6cb9489fdb190c7ee239220ebcd645e4

export async function deleteReport(testMapId, callback) {
  console.log("delete report service");
  axios({
    method: "post",
    url: `${biservice}/bireport/deletetestsets?testset_map_id=${testMapId}`,
  }).then((res) => {
    callback();
  });
}
