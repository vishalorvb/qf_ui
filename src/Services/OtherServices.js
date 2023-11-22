import { qfservice } from "../Environment";
import axios from "../api/axios";

//http://10.11.12.243:8083/qfservice/api/jobs/savejob

//{

//    "jobName": "qfreportservice",

//    "qfservice": "http://10.11.12.243:8063/qfreportservice/",

//    "apiurl": "actuator/health",

//    "cron": "H 16 * * *",

//    "requestbody": null

//}

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
