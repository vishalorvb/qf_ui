import axios from "axios"
import { baseUrl } from "../Environment"


let userId = 1

export function getProject(callback) {
    // This function except name of state as a callback and set value in that state     
    axios.get(baseUrl + "/projects?user_id=" + userId).then(res => {
        console.log(res.data.result.projects_list)
        callback(res.data.result.projects_list)
    })
}



export function getTestsets(callback, workflowID) {
    console.log("called")
    axios.get(baseUrl + "/workflow/" + workflowID + "/api/testsets").then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}
