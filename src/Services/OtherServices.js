import { baseUrl } from "../Environment"
import axios from "../api/axios"

//http://10.11.12.243:8083/qfservice/api/jobs/savejob



//{

//    "jobName": "qfreportservice",

//    "baseurl": "http://10.11.12.243:8063/qfreportservice/",

//    "apiurl": "actuator/health",

//    "cron": "H 16 * * *",

//    "requestbody": null

//}


export function scheduleJob(data) {
    axios({
        method: "post",
        data: data,
        url: `${baseUrl}/qfservice/api/jobs/savejob`
    })
}