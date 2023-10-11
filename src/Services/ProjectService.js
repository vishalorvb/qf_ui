import axios from "axios";
import {
  authservice,
  biservice,
  dashboard,
  qfservice,
  report,
  userservice,
} from "../Environment";

export async function getProject(callback, userId) {
  return await axios
    .get(`${qfservice}/getProjectsOfUser?userId=${userId}`)
    .then((res) => {
      callback(res.data.info ?? []);
    });
}

export function getProjectDetails(callback, userId, projectId) {
  axios
    .get(
      `${qfservice}/projects/getProjectDetailsByProjectIdAndUserId?user_id=${userId}&project_id=${projectId}`
    )
    .then((res) => {
      callback(res.data.data);
    });
}

export async function makeProjectFav(userId, projectId, value) {
  return await axios
    .post(
      `${qfservice}/makeFavourateProject?userId=${userId}&projectId=${projectId}&isFav=${value}`
    )
    .then((res) => {});
}

export async function createProject(data) {
  let res = await axios({
    method: "post",
    url: `${qfservice}/createProject`,
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
    url: `${qfservice}/updateProject`,
    data: data,
  })
    .then((response) => {
      return response.data.status;
    })
    .catch((err) => {
      return null;
    });
  return res;
}

export async function deleteProject(projectid, userid) {
  let res = await axios
    .put(
      `${qfservice}/projects/Delete?project_id=${projectid}&user_id=${userid}`
    )
    .then((r) => {
      return r.data.status;
    });
  return res;
}

export async function getUsers(callback, orgid, ssoid, token) {
  return await axios
    .get(`${qfservice}/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      callback(res.data.info);
      return res.data.info;
    });
}

export async function getUserOfProject(callback, projectId, userId) {
  return await axios
    .get(
      `${qfservice}/projects/getUsersDetailsByProjectId?project_id=${projectId}`
    )
    .then((res) => {
      callback(res.data.data?.filter((data) => data.id !== userId));
      return res.data.data?.filter((data) => data.id !== userId);
    });
}

export async function getJiraProject(
  callback,
  url,
  username,
  password,
  itstype,
  orgname,
  orgid
) {
  return axios
    .post(
      `${qfservice}/loadJiraProjects?url=${url}&userName=${username}&password=${password}&its_type=${itstype}&org_name=${orgname}&orgId=${orgid}`
    )
    .then((res) => {
      callback(res.data.info);
      return res.data.info === null ? false : true;
    });
}
