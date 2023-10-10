import { baseUrl, authservice, biservice, dashboard, qfservice, report, userservice } from "../Environment";
import axios from "axios";

export function getApplication(callback, userId) {
    axios
        .get(`${qfservice}/users/applications?user_id=${userId}`)
        .then((res) => {
            callback(res.data.data);
        });
}
export function getWebApplication(callback, userId, apptype) {
    axios
        .get(`${qfservice}/users/applications?user_id=${userId}`)
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
        url: `${qfservice}/savemodule.do?user_id=${userId}`,
    }).then((res) => {
        console.log(res.data.message);
        if (
            res.data.message == "Module Created Successfully" ||
            res.data.message == "Module Updated Successfully"
        ) {
            return res.data.message;
        } else {
            return false;
        }
    });
    return x;
}

export function getPages(callback, applicationId) {
    axios
        .get(
            `${qfservice}/webpages/getWebPagesList?module_id=${applicationId}`
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
            `${qfservice}/webpages/getWebPageElementPathsInfo?element_id=${element_id}&is_diff_page_element=${isDiffElement}`
        )
        .then((res) => {
            console.log(res.data.info);
            callback(res.data.info);
        });
}

export function getApplicationOfProject(callback, project_id) {
    axios
        .get(`${qfservice}/projects/applications?project_id=${project_id}`)
        .then((res) => {
            callback(res.data.data);
        });
}

export async function deleteApplication(applicationId, userId) {
    console.log(applicationId);
    return await axios
        .put(
            `${qfservice}/Application/Delete?app_id=${applicationId}&user_id=${userId}`
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
        .get(`${qfservice}/getmoduledetails/${applicationId}`)
        .then((res) => {
            return res.data.data;
        });
    return x;
}
