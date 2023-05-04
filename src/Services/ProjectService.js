import axios from "axios";
import { baseUrl } from "../Environment";



export function getProject(callback, userId) {
  axios.get(`${baseUrl}/qfservice/getProjectsOfUser?userId=${userId}`).then(res => {
    console.log(res.data.info)
    callback(res.data.info)
  })
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
    console.log(r.data.status);
    return r.data.status
  })
  return res;
}

export function getUsers(callback, orgid, ssoid, token) {
  axios.get(`${baseUrl}/qfauthservice/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      callback(res.data.info);

    })
}

export function getUserOfProject(callback, projectId) {
  axios.get(`${baseUrl}/qfservice/projects/getUsersDetailsByProjectId?project_id=${projectId}`).then(res => {
    callback(res.data.data);
  })
}

export function getJiraProject(callback, url, username, password, itstype, orgname, orgid) {
  axios.post(`${baseUrl}/qfservice/loadJiraProjects?url=${url}&userName=${username}&password=${password}&its_type=${itstype}&org_name=${orgname}&orgId=${orgid}`).then(res => {
    console.log(res.data.info)
    callback(res.data.info)
  })
}