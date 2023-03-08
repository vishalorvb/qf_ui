import { baseUrl } from "../Environment";
import axios from "axios";

export function getApplication(callback,userId) {
    // http://localhost:8060/qfservice/users/applications?user_id=73
    axios.get(`${baseUrl}/qfservice/users/applications?user_id=${userId}`).then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}



export async function createApplication(data, userId) {
   let x = await axios({
        method: 'post',
        data: data,
        url: `${baseUrl}/qfservice/savemodule.do?user_id=${userId}`
    }).then(res => {
        console.log(res.data.message)
        if(res.data.message == "Module Created Successfully"){
            return true
        }
        else{
            return false
        }
    })
   return x
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


export function getElementsDetails(callback,element_id){
    axios.get(`${baseUrl}/qfservice/webpages/getWebPageElementPathsInfo?element_id=${element_id}&is_diff_page_element=false`).then(res=>{
        console.log(res.data.info)
        callback(res.data.info)
    })
}

export function getApplicationOfProject(callback,project_id){
    axios.get(`${baseUrl}/qfservice/projects/applications?project_id=${project_id}`).then(res=>{
        callback(res.data.data)
    })
}