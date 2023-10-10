import axios from "axios";
import { baseUrl, authservice, biservice, dashboard, qfservice, report, userservice } from "../Environment";


export async function CreateDataset(data) {
    let x = await axios({
        method: "post",
        data: data,
        url: `${qfservice}/webdataset/web-createDataset`,
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
            `${qfservice}/webtestcase/api/v1/projects/${projectId}/workflow/${applicationId}/web/testcases/${testcaseId}/datasets`
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
            `${qfservice}/webdataset/getScreensAndElementsInTestcaseByTestcaseIdorDatasetId?testcase_id=${testcaseId}&dataset_id=${datasetId}`
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
            `${qfservice}/webdataset/deleteWebDataset?dataset_id=${datasetId}`
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
        url: `${qfservice}/webtestcase/CreateWebTestCase`,
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
        url: `${qfservice}/createApiTestCaseAddApisToTestcase`,
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
            `${qfservice}/webtestcase/deleteWebTestcase?testcase_id=${testcaseId}`
        )
        .then((res) => {
            if (res.data.status == "SUCCESS") {
                return true;
            }
            return false;
        });
    return x;
}

export async function GetTestCase(
    callback,
    projectId,
    applicationId,
    failedTestcase,
    testsetId
) {
    return await axios
        .get(
            `${qfservice}/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId`,
            {
                params: {
                    project_id: projectId,
                    module_id: applicationId,
                    failTestcases: failedTestcase,
                    testset_id: testsetId,
                },
            }
        )
        .then((resp) => {
            const testcases = resp?.data?.info ?? [];
            callback(testcases);
        });
}

export async function getAlltestcaseOfApplicationandSubapplication(moduleId, callback) {
    return await axios.get(`${qfservice}/getModuleAndTestcases?moduleId=${moduleId}`).then(res => {
        callback(res.data ?? [])
    })
}

export function GetTestCase_V2fortestset(
    callback,
    projectId,
    applicationId,
    testsetId
) {
    axios
        .get(
            `${qfservice}/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId1`,
            {
                params: {
                    project_id: projectId,
                    module_id: applicationId,
                    testset_id: testsetId,
                },
            }
        )
        .then((resp) => {
            const testcases = resp?.data?.info ?? [];
            callback(testcases);
        });
}

export async function getSprint(callback, projectId) {
    return await axios
        .get(`${qfservice}/getsprints?project_id=${projectId}`)
        .then((res) => {
            callback(res.data.data.sprints ?? []);
            return res.data.data.sprints ?? []
        });
}

export function getIssues(callback, userId, projectId, data) {
    axios({
        method: "post",
        url: `${qfservice}/getJiraIssues?user_id=${userId}&project_id=${projectId}`,
        data: data,
    }).then((res) => {
        callback(res.data.info);
    });
}

export async function getPagesForTestcase(callback, projectId, moduleId) {
    return await axios
        .get(
            `${qfservice}/webtestcase/getScreensForTestcase?module_id=${moduleId}&project_id=${projectId}`
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
            `${qfservice}/webtestcase/getScreensInTestcase?module_id=${moduleId}&project_id=${projectId}&testcase_id=${testcaseId}`
        )
        .then((res) => {
            callback(res.data.info === null ? [] : res.data.info[0]?.webpagesList);
        });
}

export function getApiOfApplication(callback, moduleId) {
    axios
        .get(`${qfservice}//testcase/${moduleId}/apisByModuleId`)
        .then((res) => {
            callback(res.data.data.apisList);
        });
}

export function getApiOfTestcase(callback, testcaseId) {
    axios.get(`${qfservice}/testcase/${testcaseId}/apis`).then((res) => {
        callback(res.data.data.apisList);
    });
}

export async function getElement(screenId, callback) {
    return await axios
        .get(
            `${qfservice}/screen/getScreenElementsList?screen_id=${screenId}`
        )
        .then((res) => {
            callback(res.data.info);
            return res.data.info;
        });
}

export async function getSprint_in_testcase(projectId, webtestcaseid) {
    return axios
        .get(
            //  `${baseUrl}/qfservice/webtestcase/getTestcaseSprints?api_testcase_id=${apitestcaseid}&web_testcase_id=${webtestcaseid}`
            `${qfservice}/webtestcase/getTestcaseSprints?project_id=${projectId}&testcase_id=${webtestcaseid}`
        )
        .then((res) => {
            if (res.data.info == null) {
                return [];
            }
            return res.data.info?.filter((sprint) => sprint.is_selected);
        });
}


export async function getTestcaseDetails(testcaseId, callback) {
    return await axios.get(`${qfservice}/webtestcase/getWebTestcaseInfo?testcase_id=${testcaseId}`).then(res => {
        return res.data.info ?? {}
    })
}