import axios from "axios"
import { baseUrl } from "../Environment"


// let userId = 1

export function getProject(callback,userId) {
    // This function except name of state as a callback and set value in that state     
    axios.get(baseUrl + "/projects?user_id=" + userId).then(res => {
        console.log(res.data.result.projects_list)
        callback(res.data.result.projects_list)
    })
}





export function getTestcases(callback, workflowID) {
   
    axios.get(baseUrl + "/api/workflow/" + workflowID + "/api/testcases").then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}

<<<<<<< HEAD

export function getWebpages(callback,moduleId){
    console.log("Calling getWebpages")
    axios.get(`${baseUrl}/webpages/getWebPagesList?module_id=${moduleId}`).then(res => {
        console.log(res.data.info)
        callback(res.data.info)
    })
}

export function getWebpagesElementList(callback,web_page_id){
    console.log("Calling webpage list")
    axios.get(`${baseUrl}/webpages/getWebPageElementsList?web_page_id=${web_page_id}`).then(res => {
        console.log(res.data.info)
        callback(res.data.info)
    })
}
=======
>>>>>>> 987bd88b9a568e02316c61c9c29d37563e1d4a39
