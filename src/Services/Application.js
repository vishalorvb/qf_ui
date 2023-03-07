import { baseUrl } from "../Environment";
import axios from "axios";

export function getApplication(callback) {
    axios.get(`${baseUrl}/qfservice/applications`).then(res => {
        console.log(res.data.result)
        callback(res.data.result)
    })
}



export function createApplication(data, userId) {
    axios({
        method: 'post',
        data: data,
        url: `${baseUrl}/qfservice/savemodule.do?user_id=${userId}`
    }).then(res => {

    })
    console.log("createing application")
}


export function getPages(callback, applicationId) {
    console.log("get pages called")
    console.log(applicationId)
    axios.get(`${baseUrl}/qfservice/webpages/getWebPagesList?module_id=${applicationId}`).then(res => {
        console.log(res.data)
        if (res.data.info != null) {
            callback(res.data.info)
        }
    })
}