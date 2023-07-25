import axios from "axios";
import { baseUrl } from "../Environment";

export async function CreateDataset(data) {
    let x = await axios({
        method: "post",
        data: data,
        url: `${baseUrl}/qfservice/webdataset/web-createDataset`,
    }).then((res) => {
        if (res.data.status === "SUCCESS") {
            return false;
        } else {
            return res.data.message;
        }
    });

    return x;
}

export function getDataset(callback, projectId, applicationId, testcaseId) {
    axios
        .get(
            `${baseUrl}/qfservice/webtestcase/api/v1/projects/${projectId}/workflow/${applicationId}/web/testcases/${testcaseId}/datasets`
        )
        .then((res) => {
            callback(res.data.result);
            return res.data.result;
        });
}

export async function getData_for_createDataset(
    callback,
    testcaseId,
    datasetId = 0
) {
    let x = axios
        .get(
            `${baseUrl}/qfservice/webdataset/getScreensAndElementsInTestcaseByTestcaseIdorDatasetId?testcase_id=${testcaseId}&dataset_id=${datasetId}`
        )
        .then((res) => {
            callback(res.data.info);
            return true;
        });
    return x;
}

export async function deleteDataset(datasetId) {
    let x = axios
        .delete(
            `${baseUrl}/qfservice/webdataset/deleteWebDataset?dataset_id=${datasetId}`
        )
        .then((res) => {
            if (res.data.status == "SUCCESS") {
                return true;
            } else {
                return false;
            }
        });
    return x;
}

export async function CreateTestCaseService(data) {
    let x = await axios({
        method: "post",
        url: `${baseUrl}/qfservice/webtestcase/CreateWebTestCase`,
        data: data,
    }).then((res) => {
        if (res.data.info != null) {
            return res.data.message;
        } else {
            return false;
        }
    });
    return x;
}
export async function createApitestcase(data) {
    let x = await axios({
        method: "post",
        url: `${baseUrl}/qfservice/createApiTestCaseAddApisToTestcase`,
        data: data,
    }).then((res) => {
        if (res.data.info != null) {
            return res.data.message;
        } else {
            return false;
        }
    });
    return x;
}

export async function DeleteTestCase(testcaseId) {
    let x = await axios
        .delete(
            `${baseUrl}/qfservice/webtestcase/deleteWebTestcase?testcase_id=${testcaseId}`
        )
        .then((res) => {
            if (res.data.status == "SUCCESS") {
                return true;
            }
            return false;
        });
    return x;
}

export function GetTestCase(callback, projectId, applicationId) {
    axios
        .get(
            `${baseUrl}/qfservice/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
        )
        .then((resp) => {
            const testcases = resp?.data?.info ?? [];
            callback(testcases);
        });
}

export function getSprint(callback, projectId) {
    axios
        .get(`${baseUrl}/qfservice/getsprints?project_id=${projectId}`)
        .then((res) => {
            callback(res.data.data.sprints);
        });
}

export function getIssues(callback, userId, projectId,data) {
    axios({
        method: "post",
        url: `${baseUrl}/qfservice/getJiraIssues?user_id=${userId}&project_id=${projectId}`,
        data: data,
    }).then((res) => {
       callback(res.data.info)
    });
   
}

export async function getPagesForTestcase(callback, projectId, moduleId) {
    return await axios
        .get(
            `${baseUrl}/qfservice/webtestcase/getScreensForTestcase?module_id=${moduleId}&project_id=${projectId}`
        )
        .then((res) => {
            callback(res.data.info === null ? [] : res.data.info[0]?.webpagesList);
            return res.data.info === null ? [] : res.data.info[0]?.webpagesList;
        });
}
export async function getPagesIntestcase(
    callback,
    projectId,
    moduleId,
    testcaseId
) {
    return await axios
        .get(
            `${baseUrl}/qfservice/webtestcase/getScreensInTestcase?module_id=${moduleId}&project_id=${projectId}&testcase_id=${testcaseId}`
        )
        .then((res) => {
            callback(res.data.info === null ? [] : res.data.info[0]?.webpagesList);
            console.log(res.data.info === null ? [] : res.data.info[0]?.webpagesList);
        });
}

export function getApiOfApplication(callback, moduleId) {
    axios
        .get(`${baseUrl}/qfservice//testcase/${moduleId}/apisByModuleId`)
        .then((res) => {
            callback(res.data.data.apisList);
        });
}

export function getApiOfTestcase(callback, testcaseId) {
    axios.get(`${baseUrl}/qfservice/testcase/${testcaseId}/apis`).then((res) => {
        callback(res.data.data.apisList);
    });
}


export async function getElement(screenId, callback) {
    return await axios.get(`${baseUrl}/qfservice/screen/getScreenElementsList?screen_id=${screenId}`).then(res => {
        callback(res.data.info)
        return res.data.info
    })
}


export async function getSprint_in_testcase(projectId,testcaseId){
    return axios.get(`${baseUrl}/qfservice/webtestcase/getTestcaseSprints?project_id=${projectId}&testcase_id=${testcaseId}`).then(res =>{
        if(res.data.info ==null){
            return []
        }
        return res.data.info?.filter(sprint => sprint.is_selected)
    })
}
