import axios from "axios";
import { async } from "q";
import { baseUrl } from "../Environment";



export function getProject(callback, userId ) {
  // This function except name of state as a callback and set value in that state
  axios.get(baseUrl + "/qfservice/projects?user_id=" + userId).then((res) => {
    callback(res.data.result.projects_list);
  });
}
async function getModuleId(projectId, modulename) {
console.log(projectId)
let moduleId = null;
  let allmodules = await axios.get(`${baseUrl}/qfservice/getprojectmodules/${projectId}`).then((res) => {
    console.log(res.data.data)
    return res.data.data
  })
   allmodules.forEach(e => {
    if (e.module_name == modulename) {
      console.log(e.module_id)
      moduleId =e.module_id
      return e.module_id
    }
  })
  return moduleId
}

export async function createProject(data) {
  console.log("calling createProject");
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/createProject`,
    data: data,
  })
    .then((response) => {
      return response.data.status;
    })
    .catch((err) => {
      return "error";
    });
  console.log(res);
  // console.log(res.data.status)
  return res;
}

export async function updateProject(data) {
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/updateProject`,
    data: data,
  }).then((response) => {
    return response.data.status;
  }).catch((err) => {
    return null
  })
  return res;
}

export async function deleteProject(projectid, userid , gid) {
  // let res = await axios
  //   .delete(
  //     `${baseUrl}/qfservice/deleteProject?projectId=${projectid}&userId=${userid}&orgId=${gid}`
  //   )
  //   .then((res) => {
  //     console.log(res.data.status);
  //     return res.data.status;
  //   });
  // console.log(res);
  // return res;
  let res = await axios.put(`${baseUrl}/qfservice/SoftDelete?project_id=${projectid}&user_id=${userid}`).then(r=>{
    console.log(r.data.status);
    return r.data.status
  })
  return res;
}

export function getTestcases(callback, moduleId) {
  axios
    .get(baseUrl + "/qfservice/api/workflow/" + moduleId + "/api/testcases")
    .then((res) => {
      console.log(res.data.data);
      callback(res.data.data);
    });
}

export async function getWebTestCase(callback, projectId) {

  let mid = await getModuleId(projectId, "WEB").then(res=>{
    console.log(res)
    return res
  })
  console.log(mid)
  await axios.get(`${baseUrl}/qfservice/webtestcase//api/v1/projects/${projectId}/workflow/${mid}/web/testcases`).then(res => {
    console.log(res.data.result)
    callback(res.data.result)
  })

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
      `${baseUrl}qfservice/webpages/getWebPageElementsList?web_page_id=${web_page_id}`
    )
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getScreen(callback, moduleId) {
  console.log("calling getScreen");
  axios
    .get(`http://10.11.12.242:8080/qfservice/screen/getScreensList?module_id=${moduleId}`)
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getModules(callback, projectid) {
  console.log("calling getModules");
  axios
    .get(`${baseUrl}/qfservice/getprojectmodules/${projectid}`)
    .then((res) => {
      console.log(res.data);
      callback(res.data.data);
    });
}



export async function getApis(projectid, callback) {
  console.log("calling getApis");
  let module;
  let moduleid;
  await axios
    .get(`${baseUrl}/qfservice/getprojectmodules/${projectid}`)
    .then((res) => {
      console.log(res.data.data);
      module = res.data.data;
    });

  await module.forEach((element) => {
    console.log("Inside for each");
    if (element.module_name == "API") {
      moduleid = element.module_id;
      console.log(element.module_id);
    }
  });

  axios.get(`${baseUrl}/qfservice/${moduleid}/apis`).then((res) => {
    console.log(res.data.data.apisList);
    callback(res.data.data.apisList);
  });
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
      console.log(element.module_id);
      callback(moduleid);
      return;
    }
  });
}

export async function createAPI(data) {
  console.log("Creating API service")
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/createapi`,
    data: data
  }).then(response => {
    console.log("api called")
    console.log(response.data.error)
    return response.data.error
  }).catch(err => {
    console.log(err)
  })
    .then((response) => {
      return response.data.error;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
}

export async function updateAPI(data) {
  console.log("Update API service")
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/updateapi`,
    data: data,
  })
    .then((response) => {
      return response.data.error;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
}

export function getApibyid(moduleid, callback) {
  axios
    .post(`${baseUrl}/qfservice/getapibyid?api_id=${moduleid}`)
    .then((res) => {
      console.log(res.data.data);
      callback(res.data.data);
    });
}

export async function deleteApi(apiid) {
  let x = axios
    .post(`${baseUrl}/qfservice/deleteapi?api_id=${apiid}`)
    .then((res) => {
      console.log(res.data.error);
      return res.data.error;
    });
  return x;
}


export function getUsers(callback,orgid,ssoid,token){
  axios.get(`${baseUrl}/qfauthservice/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    console.log(res.data.info)
    callback(res.data.info);
    // setLeftuser(res.data.info)
  })
}