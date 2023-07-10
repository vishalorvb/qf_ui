import axios from "axios";
import { baseUrl } from "../Environment";



export function getProject(callback, userId) {
  axios.get(`${baseUrl}/qfservice/getProjectsOfUser?userId=${userId}`).then(res => {
    callback(res.data.info)
  })
}

export function getProjectDetails(callback,userId,projectId){
axios.get(`${baseUrl}/qfservice/projects/getProjectDetailsByProjectIdAndUserId?user_id=${userId}&project_id=${projectId}`).then(res =>{
    callback(res.data.data)
})
}

export async function makeProjectFav(userId,projectId,value){
    return await axios.post(`${baseUrl}/qfservice/makeFavourateProject?userId=${userId}&projectId=${projectId}&isFav=${value}`).then(res=>{
    })
}

export async function createProject(data) {
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

export async function deleteProject(projectid, userid) {

  let res = await axios.put(`${baseUrl}/qfservice/projects/Delete?project_id=${projectid}&user_id=${userid}`).then(r => {
    return r.data.status
  })
  return res;
}

export async function getUsers(callback, orgid, ssoid, token) {
  return await axios.get(`${baseUrl}/qfuserservice/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      callback(res.data.info);
      return res.data.info
    })
}

export async function getUserOfProject(callback, projectId,userId) {
  return await axios.get(`${baseUrl}/qfservice/projects/getUsersDetailsByProjectId?project_id=${projectId}`).then(res => {
    callback(res.data.data?.filter(data => data.id !== userId));
    return res.data.data?.filter(data => data.id !== userId)
  })
}

export function getJiraProject(callback, url, username, password, itstype, orgname, orgid) {
  axios.post(`${baseUrl}/qfservice/loadJiraProjects?url=${url}&userName=${username}&password=${password}&its_type=${itstype}&org_name=${orgname}&orgId=${orgid}`).then(res => {
    callback(res.data.info)
  })
}