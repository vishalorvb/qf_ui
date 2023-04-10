import axios from "axios";
import { baseUrl } from "../Environment";



export function getProject(callback, userId ) {
  // This function except name of state as a callback and set value in that state
  axios.get(baseUrl + "/qfservice/projects?user_id=" + userId).then((res) => {
    callback(res.data.result.projects_list);
  });
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

export async function deleteProject(projectid, userid ) {

  let res = await axios.put(`${baseUrl}/qfservice/projects/Delete?project_id=${projectid}&user_id=${userid}`).then(r=>{
    console.log(r.data.status);
    return r.data.status
  })
  return res;
}

// export function getTestcases(callback, moduleId) {
//   axios
//     .get(baseUrl + "/qfservice/api/workflow/" + moduleId + "/api/testcases")
//     .then((res) => {
//       console.log(res.data.data);
//       callback(res.data.data);
//     });
// }



// export function getWebpages(callback, moduleId) {
//   console.log("Calling getWebpages");
//   axios
//     .get(`${baseUrl}/qfservice/webpages/getWebPagesList?module_id=${moduleId}`)
//     .then((res) => {
//       console.log(res.data.info);
//       callback(res.data.info);
//     });
// }

// export function getWebpagesElementList(callback, web_page_id) {
//   console.log("Calling webpage list");
//   axios
//     .get(
//       `${baseUrl}qfservice/webpages/getWebPageElementsList?web_page_id=${web_page_id}`
//     )
//     .then((res) => {
//       console.log(res.data.info);
//       callback(res.data.info);
//     });
// }

// export function getScreen(callback, moduleId) {
//   console.log("calling getScreen");
//   axios
//     .get(`http://10.11.12.242:8080/qfservice/screen/getScreensList?module_id=${moduleId}`)
//     .then((res) => {
//       console.log(res.data.info);
//       callback(res.data.info);
//     });
// }

// export function getModules(callback, projectid) {
//   console.log("calling getModules");
//   axios
//     .get(`${baseUrl}/qfservice/getprojectmodules/${projectid}`)
//     .then((res) => {
//       console.log(res.data);
//       callback(res.data.data);
//     });
// }




export function getUsers(callback,orgid,ssoid,token){
  axios.get(`${baseUrl}/qfauthservice/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    callback(res.data.info);

  })
}

export function getUserOfProject(callback,projectId){
  axios.get(`${baseUrl}/qfservice/projects/getUsersDetailsByProjectId?project_id=${projectId}`).then(res=>{
    console.log(res.data.data)
    callback(res.data.data);
  })
}