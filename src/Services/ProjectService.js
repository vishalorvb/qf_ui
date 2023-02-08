import axios from "axios"
import { async } from "q"
import { baseUrl } from "../Environment"




export function getProject(callback, userId) {
    // This function except name of state as a callback and set value in that state     
    axios.get(baseUrl + "/projects?user_id=" + userId).then(res => {
        console.log(res.data.result.projects_list)
        callback(res.data.result.projects_list)
    })
}

export async function createProject(data) {
    let res = await axios({
        method: 'post',
        url: `${baseUrl}/createProject`,
        data: data
    })
    return res
}

export async function updateProject(data) {
    let res = await axios({
        method: 'post',
        url: `${baseUrl}/updateProject`,
        data: data
    })
    return res
}



export function getTestcases(callback, workflowID) {

    axios.get(baseUrl + "/api/workflow/" + workflowID + "/api/testcases").then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}



export function getWebpages(callback, moduleId) {
    console.log("Calling getWebpages")
    axios.get(`${baseUrl}/webpages/getWebPagesList?module_id=${moduleId}`).then(res => {
        console.log(res.data.info)
        callback(res.data.info)
    })
}

export function getWebpagesElementList(callback, web_page_id) {
    console.log("Calling webpage list")
    axios.get(`${baseUrl}/webpages/getWebPageElementsList?web_page_id=${web_page_id}`).then(res => {
        console.log(res.data.info)
        callback(res.data.info)
    })
}


export function getScreen(callback, moduleId) {
    console.log("calling getScreen")
    axios.get(`${baseUrl}/screen/getScreensList?module_id=${moduleId}`).then(res => {
        console.log(res.data.info)
        callback(res.data.info)
    })
}

export function getModules(callback, projectid) {
    console.log("calling getModules")
    axios.get(`${baseUrl}/getprojectmodules/${projectid}`).then(res => {
        console.log(res.data)
        callback(res.data.data)
    })
}

export async function getApis(projectid, callback) {
    let module
    let moduleid
    await axios.get(`${baseUrl}/getprojectmodules/${projectid}`).then(res => {
        module = res.data.data
    })
    module.forEach(element => {
        if (element.module_name == "API") {
            moduleid = element.module_id;
            return
        }
    });
    axios.get(`${baseUrl}/${moduleid}/apis`).then(res => {
       console.log(res.data.data.apisList)
       callback(res.data.data.apisList)
    })
}

export async function getApiModuleId(projectid){
    
}




