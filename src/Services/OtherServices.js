import { qfservice } from "../Environment";
import axios from "axios";

export async function scheduleJob(data) {
  return await axios({
    method: "post",
    data: data,
    url: `${qfservice}/qfscheduler/api/jobs/savejob`,
  })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
