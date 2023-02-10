import axios from "axios"
import { async } from "q"
import { baseUrl } from "../Environment"


const userid = 4

export function getProject(callback, userId=userid) {
    // This function except name of state as a callback and set value in that state     
    axios.get(baseUrl + "/qfservice/projects?user_id=" + userId).then(res => {
        console.log(res.data.result.projects_list)
        callback(res.data.result.projects_list)
    })
}

export async function createProject(data) {
    console.log("calling createProject")
    let res = await axios({
        method: 'post',
        url: `${baseUrl}/qfservice/createProject`,
        data: data
    }).then(response=>{
        return response.data.status
    })
    .catch(err => {
        return "error"
    })
    console.log(res)
    // console.log(res.data.status)
    return res
}

export async function updateProject(data) {
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/updateProject`,
    data: data,
  });
  return res;
}

export async function deleteProject(projectid,userid=userid,gid){
   let res = await axios.delete(`${baseUrl}/qfservice/deleteProject?projectId=${projectid}&userId=${userid}&orgId=${gid}`).then(res=>{
        console.log(res.data.status)
        return res.data.status
    })
    console.log(res)
    return res
}


export function getTestcases(callback, workflowID) {
  axios
    .get(baseUrl + "/qfservice/api/workflow/" + workflowID + "/api/testcases")
    .then((res) => {
      console.log(res.data.data);
      callback(res.data.data);
    });
}

export function getWebpages(callback, moduleId) {
  console.log("Calling getWebpages");
  axios
    .get(`${baseUrl}/qfservice/webpages/getWebPagesList?module_id=${moduleId}`)
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getWebpagesElementList(callback, web_page_id) {
  console.log("Calling webpage list");
  axios
    .get(
      `${baseUrl}/qfservice/webpages/getWebPageElementsList?web_page_id=${web_page_id}`
    )
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getScreen(callback, moduleId) {
  console.log("calling getScreen");
  axios
    .get(`${baseUrl}/qfservice/screen/getScreensList?module_id=${moduleId}`)
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getModules(callback, projectid) {
  console.log("calling getModules");
  axios.get(`${baseUrl}/qfservice/getprojectmodules/${projectid}`).then((res) => {
    console.log(res.data);
    callback(res.data.data);
  });
}

export async function getApis(projectid, callback) {
    console.log("calling getApis")
    let module
    let moduleid
    await axios.get(`${baseUrl}/qfservice/getprojectmodules/${projectid}`).then(res => {
        console.log(res.data.data)
        module = res.data.data
    })
    console.log(module)
    await module.forEach(element => {
        console.log("Inside for each")
        if (element.module_name == "API") {
            moduleid = element.module_id;
            console.log(element.module_id)
        }
    });
    console.log(moduleid)
    axios.get(`${baseUrl}/qfservice/${moduleid}/apis`).then(res => {
        console.log(res.data.data.apisList)
        callback(res.data.data.apisList)
    })
}

export async function getApiModuleId(projectid, callback) {
    let module
    let moduleid
    await axios.get(`${baseUrl}/qfservice/getprojectmodules/${projectid}`).then(res => {
        module = res.data.data
    })
    module.forEach(element => {
        if (element.module_name == "API") {
            moduleid = element.module_id;
            console.log(element.module_id)
            callback(moduleid)
            return
        }
    });

}

export function createAPI(data) {
    axios({
        method: 'post',
        url: `${baseUrl}/qfservice/createapi`,
        data: data
    })

}




