import { baseUrl } from "../Environment";
import axios from "axios";

export function getApplication(callback, userId) {
  axios
    .get(`${baseUrl}/qfservice/users/applications?user_id=${userId}`)
    .then((res) => {
      callback(res.data.data);
    });
}
export function getWebApplication(callback, userId, apptype) {
  axios
    .get(`${baseUrl}/qfservice/users/applications?user_id=${userId}`)
    .then((res) => {
      let webapp = res.data.data.filter((app) => {
        if (app.module_type == apptype) {
          return app;
        }
      });
      console.table(webapp);
      callback(webapp);
    });
}

export async function createApplication(data, userId) {
  let x = await axios({
    method: "post",
    data: data,
    url: `${baseUrl}/qfservice/savemodule.do?user_id=${userId}`,
  }).then((res) => {
    console.log(res.data.message);
    if (
      res.data.message == "Module Created Successfully" ||
      res.data.message == "Module Updated Successfully"
    ) {
      return true;
    } else {
      return false;
    }
  });
  return x;
}

export function getPages(callback, applicationId) {
  console.log("get pages called");
  console.log(applicationId);
  axios
    .get(
      `${baseUrl}/qfservice/webpages/getWebPagesList?module_id=${applicationId}`
    )
    .then((res) => {
      console.log(res.data);
      if (res.data.info != null) {
        callback(res.data.info);
      }
    });
}

export function getElementsDetails(callback, element_id, isDiffElement) {
  axios
    .get(
      `${baseUrl}/qfservice/webpages/getWebPageElementPathsInfo?element_id=${element_id}&is_diff_page_element=${isDiffElement}`
    )
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getApplicationOfProject(callback, project_id) {
  axios
    .get(`${baseUrl}/qfservice/projects/applications?project_id=${project_id}`)
    .then((res) => {
      callback(res.data.data);
    });
}

export async function deleteApplication(applicationId, userId) {
  console.log(applicationId);
  return await axios
    .put(
      `${baseUrl}/qfservice/Application/Delete?app_id=${applicationId}&user_id=${userId}`
    )
    .then((res) => {
      console.log(res.data.status);
      if (res.data.status == "SUCCESS") {
        return true;
      }
      return false;
    });
}

export async function getApplicationDetails(applicationId) {
  let x = await axios
    .get(`${baseUrl}/qfservice/getmoduledetails/${applicationId}`)
    .then((res) => {
      return res.data.data;
    });
  return x;
}
