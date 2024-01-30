import { Axios as axios } from "../utilities/Utility";
import { qfservice } from "../Environment";


export async function getElements(pageId, pageno, size = 10) {
    return await axios.get(`${qfservice}/webpages/getWebPageElementsList1?web_page_id=${pageId}&selected_elements_only=false&page=${pageno}&size=${size}`).then(res => {
        return { totalPage: res.data.info.totalPages, totalElement: res.data.info.totalElements, elements: res.data.info.content }
    })
}

export function getTestset(
    projectId,
    moduleId,
    callback,
    page = 1,
    size = 10,
    settotalPage,
    setTotalElement
) {
    axios
        .get(
            `${qfservice}/getModuleAndTestsets?projectId=${projectId}&moduleId=${moduleId}&page=${page}&size=${size}`
        )
        .then((resp) => {
            const testsets = resp?.data?.info?.content ?? [];
            settotalPage(resp?.data?.info?.totalPages);
            setTotalElement(resp?.data?.info?.totalElements);
            callback(testsets);
        }).catch((err) => {
            console.log(err);
        });
}

export function getApis(callback, applicationId) {
    axios.get(`${qfservice}/${applicationId}/apis`).then((res) => {
        callback(res.data.data.apisList);
    }).catch((err) => {
        console.log(err);
    });
}

export async function createApiRequest(data) {
    let x = axios({
        method: "post",
        data: data,
        url: `${qfservice}/createapi`,
    })
        .then((res) => {
            return true;
        })
        .catch((err) => {
            console.log(err);
        });
    return x;
}

export async function deleteApiRequest(apiId) {
    let x = axios
        .post(`${qfservice}/deleteapi?api_id=${apiId}`)
        .then((res) => {
            return true;
        })
        .catch((res) => {
            return false;
        });
    return x;
}

export function getApiDatasets(callback, testcaseId) {
    axios.get(`${qfservice}/api/testcases/${testcaseId}/datasets`).then((res) => {
        if (res.data.data !== null) {
            callback(res.data.data);
        }
    }).catch((err) => {
        console.log(err);
    });
}

export function getDatasetDetails(callback, datasetId) {
    axios({
        method: "post",
        url: `${qfservice}/GetDatasetDetailsByDatasetId?dataset_id=${datasetId}`,
    }).then((res) => {
        callback(res.data.data.apidatasets);
    }).catch((err) => {
        console.log(err);
    });
}

export async function createApiDataset(userId, Data) {
    let x = await axios({
        method: "post",
        url: `${qfservice}/createdataset?userId=${userId}`,
        data: Data,
    }).then((res) => {
        if (res.data.error === null) {
            return false;
        } else {
            return res.data.error.description;
        }
    }).catch((err) => {
        console.log(err);
    });
    return x;
}

export async function DeleteApiDataset(datasetId) {
    let x = await axios({
        method: "post",
        url: `${qfservice}/DeleteDataset?dataset_id=${datasetId}`,
    }).then((res) => {
        if (res.data.message !== null) {
            return true;
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err);
    });
    return x;
}

export async function getApiDetails(callback, apiId) {
    return axios.post(`${qfservice}/getapibyid?api_id=${apiId}`).then((res) => {
        callback(res.data?.data);
        return res.data?.data;
    });
}

export async function updateApiOrder(data) {
    return await axios({
        method: "post",
        url: `${qfservice}/UpdateOrderOfAPIsInTestcase`,
        data: data,
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
    });
}

//Application Service

export async function getApplication(callback, userId) {
    return await axios.get(`${qfservice}/users/applications?user_id=${userId}`).then((res) => {
        callback(res.data.data ?? []);
        return res.data.data ?? []
    })
        .catch((err) => {
            console.log(err);
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
            res.data.message === "Module Created Successfully" ||
            res.data.message === "Module Updated Successfully"
        ) {
            return res.data.message;
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err);
    });
    return x;
}

export function getElementsDetails(callback, element_id, isDiffElement) {
    axios
        .get(
            `${qfservice}/webpages/getWebPageElementPathsInfo?element_id=${element_id}&is_diff_page_element=${isDiffElement}`
        )
        .then((res) => {
            callback(res.data.info);
        }).catch((err) => {
            console.log(err);
        });
}

export function getApplicationOfProject(callback, project_id) {
    axios
        .get(`${qfservice}/projects/applications?project_id=${project_id}`)
        .then((res) => {
            callback(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
}

export async function deleteApplication(applicationId, userId) {
    return await axios
        .put(
            `${qfservice}/Application/Delete?app_id=${applicationId}&user_id=${userId}`
        )
        .then((res) => {
            if (res.data.status === "SUCCESS") {
                return true;
            }
            return false;
        }).catch((err) => {
            console.log(err);
        });
}

// Devops service
export function getPipelines(callback, project_id) {
    // This function except name of state as a callback and set value in that state
    axios.get(`${qfservice}/pipeline/${project_id}`).then((res) => {
        callback(res?.data?.data);
    }).catch((err) => {
        console.log(err);
    });
}

export function getPipelinesHistory(callback, release_log, id) {
    // This function except name of state as a callback and set value in that state
    axios.get(`${qfservice}/pipeline/${id}/release`).then((res) => {
        callback(res?.data?.data?.pipelinehisotory);
        release_log(res?.data?.data1);
    }).catch((err) => {
        console.log(err);
    });
}

export function getCreatePipelineData(
    callback,
    setdefaultData,
    id,
    project_id
) {
    axios.get(`${qfservice}/project/${project_id}/pipeline/${id}`).then((res) => {
        const data = res?.data?.data;
        callback(data);
        setdefaultData({
            releaseName: data?.pipelinerelase?.release_name,
            releaseDesc: data?.pipelinerelase?.release_desc,
            cicdType: data?.pipelinerelase?.cicd_type,
            release: data?.pipelinerelase?.ansiblereleaseId,
            webTest: data?.pipelinerelase?.webTestsetId,
            ApiTest: data?.pipelinerelase?.apiTestsetid,
            sonrCubePath: data?.pipelinerelase?.code_quality_path,
            sonrCubeKey: data?.pipelinerelase?.code_quality_project_key,
            unitTestPath: data?.pipelinerelase?.unittesttestset_path,
        });
    }).catch((err) => {
        console.log(err);
    });
}

export function getPipelinesHistoryReport(callback, setError, id, tag) {
    // This function except name of state as a callback and set value in that state
    axios.get(`${qfservice}/pipeline/report/${id}/${tag}`).then((res) => {
        setError(res?.data?.error?.description);
        const result = res?.data?.data;
        if (result !== null) {
            const unittestset = result?.unittestset;
            const apiresult = result?.apiresult;
            const webresult = result?.webresult;
            const sonarcubereport = result?.sonarcubereport?.issues;
            const pipelinereport = result?.pipelinereport;

            switch (tag) {
                case "API":
                    callback(apiresult);

                    break;
                case "WEB":
                    callback(webresult);

                    break;
                case "UNITTEST":
                    callback(unittestset);

                    break;
                case "INFO":
                    callback(pipelinereport);

                    break;
                case "SONAR":
                    callback(sonarcubereport);

                    break;

                default:
                    callback([]);
                    break;
            }
        }
    });
}

export function executePipeline(callback, id, userId) {
    axios
        .post(`${qfservice}/executepipeline?release_id=${id}&user_id=${userId}`)
        .then((res) => {
            callback(res?.data?.message);
        }).catch((err) => {
            console.log(err);
        });
}

export async function getReleaseInstances(callback, project_id) {
    return await axios
        .get(`${qfservice}/release-management/${project_id}`)
        .then((res) => {
            res?.data?.data !== null && callback(res?.data?.data);
        }).catch((err) => {
            console.log(err);
        });
}

export async function deleteInstance(projectId, instanceId) {
    return await axios
        .delete(
            `${qfservice}/DeleteRelease?release_id=${instanceId}&project_id=${projectId}`
        )
        .then((resp) => { }).catch((err) => {
            console.log(err);
        });
}

export async function getGitData(callback, releaseId, historyId, projectId) {
    axios
        .get(
            `${qfservice}/pipelinelogs/${releaseId}/logs/${historyId}?projectId=${projectId}`
        )
        .then((res) => {
            let status = {
                initialize: false,
                continuousIntegration: false,
                releaseAutomationTest: false,
                testAutomation: false,
            };
            status.initialize = res.data.stages?.Initialize[0].status;
            status.continuousIntegration =
                res.data?.stages["Continuous Integration"][0].status;
            status.releaseAutomationTest =
                res.data?.stages["Release Automation (Test)"][0].status;
            status.testAutomation = res.data?.stages["Test Automation"][0].status;
            callback(status);
        }).catch((err) => {
            console.log(err);
        });
}

export async function getReleaseHistory(projectId, releaseId, callback) {
    axios
        .get(
            `${qfservice}/project/${projectId}/ansible-release/${releaseId}/release-history`
        )
        .then((res) => {
            callback([res.data.data.webReleaseHistories] ?? []);
        }).catch((err) => {
            console.log(err);
        });
}

export async function release(projectId, releaseId, userId) {
    return await axios
        .post(
            `${qfservice}/ExecuteRelease?release_id=${releaseId}&project_id=${projectId}&user_id=${userId}`
        )
        .then((res) => {
            if (res.data.status === "FAIL") return false;
            else return res.data.info.id;
        }).catch((err) => {
            console.log(err);
        });
}

//Project service

export async function getProject(callback, userId, setSnackbarData) {
    return await axios
        .get(`${qfservice}/getProjectsOfUser?userId=${userId}`)
        .then((res) => {
            callback(res.data.info ?? []);
            if (!res.data.info || res.data?.info?.length === 0) {
                setSnackbarData({
                    status: true,
                    message: "Projects Not Found!",
                    severity: "warning",
                });
            }
        })
        .catch((err) => console.log(err));
}

export function getProjectDetails(callback, userId, projectId) {
    axios
        .get(
            `${qfservice}/projects/getProjectDetailsByProjectIdAndUserId?user_id=${userId}&project_id=${projectId}`
        )
        .then((res) => {
            callback(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
}

export async function makeProjectFav(userId, projectId, value) {
    return await axios
        .post(
            `${qfservice}/makeFavourateProject?userId=${userId}&projectId=${projectId}&isFav=${value}`
        )
        .then((res) => { }).catch((err) => {
            console.log(err);
        });
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
        }).catch((err) => {
            console.log(err);
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
        }).catch((err) => {
            console.log(err);
        });
    return res;
}

export async function getUserOfProject(callback, projectId, userId) {
    return await axios
        .get(
            `${qfservice}/projects/getUsersDetailsByProjectId?project_id=${projectId}`
        )
        .then((res) => {
            callback(res.data.data?.filter((data) => data.id !== userId));
            return res.data.data?.filter((data) => data.id !== userId);
        }).catch((err) => {
            console.log(err);
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
        }).catch((err) => {
            console.log(err);
        });
}

//Testcase Service

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
    }).catch((err) => {
        console.log(err);
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
        }).catch((err) => {
            console.log(err);
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
        }).catch((err) => {
            console.log(err);
        });
    return x;
}

export async function deleteDataset(datasetId) {
    let x = axios
        .delete(`${qfservice}/webdataset/deleteWebDataset?dataset_id=${datasetId}`)
        .then((res) => {
            if (res.data.status === "SUCCESS") {
                return true;
            } else {
                return false;
            }
        }).catch((err) => {
            console.log(err);
        });
    return x;
}

export async function CreateTestCaseService(data) {
    let x = await axios({
        method: "post",
        url: `${qfservice}/webtestcase/CreateWebTestCase`,
        data: data,
    }).then((res) => {
        if (res.data.info !== null) {
            return res.data.message;
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err);
    });
    return x;
}
export async function createApitestcase(data) {
    let x = await axios({
        method: "post",
        url: `${qfservice}/createApiTestCaseAddApisToTestcase`,
        data: data,
    }).then((res) => {
        if (res.data.info !== null) {
            return res.data.message;
        } else {
            return false;
        }
    }).catch((err) => {
        console.log(err);
    });
    return x;
}

export async function DeleteTestCase(testcaseId) {
    let x = await axios
        .delete(
            //`${qfservice}/webtestcase/deleteWebTestcase?testcase_id=${testcaseId}`
            `${qfservice}/webtestcase/softDeleteTestcase?testcase_id=${testcaseId}`
        )
        .then((res) => {
            if (res.data.status === "SUCCESS") {
                return true;
            }
            return false;
        }).catch((err) => {
            console.log(err);
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
        }).catch((err) => {
            console.log(err);
        });
}

export async function getAlltestcaseOfApplicationandSubapplication(
    projectId,
    moduleId,
    callback,
    setPagesize,
    totalElement,
    page = 1,
    size = 10
) {
    return await axios
        .get(
            //`${qfservice}/getModuleAndTestcases?projectId=${projectId}&moduleId=${moduleId}`
            `${qfservice}/getModuleAndTestcases?projectId=${projectId}&moduleId=${moduleId}&page=${page}&size=${size}`
        )
        .then((res) => {
            callback(res.data.info.content ?? []);
            setPagesize(res.data.info.totalPages);
            totalElement(res.data.info.totalElements);
        })
        .catch((err) => {
            callback([]);
        }).catch((err) => {
            console.log(err);
        });
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
        }).catch((err) => {
            console.log(err);
        });
}

export async function getSprint(callback, projectId) {
    return await axios
        .get(`${qfservice}/getsprints?project_id=${projectId}`)
        .then((res) => {
            callback(res.data.data.sprints ?? []);
            return res.data.data.sprints ?? [];
        }).catch((err) => {
            console.log(err);
        });
}

export function getIssues(callback, userId, projectId, data) {
    axios({
        method: "post",
        url: `${qfservice}/getJiraIssues?user_id=${userId}&project_id=${projectId}`,
        data: data,
    }).then((res) => {
        callback(res.data.info);
    }).catch((err) => {
        console.log(err);
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
        }).catch((err) => {
            console.log(err);
        });
}

export function getApiOfApplication(callback, moduleId) {
    axios.get(`${qfservice}//testcase/${moduleId}/apisByModuleId`).then((res) => {
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
        .get(`${qfservice}/screen/getScreenElementsList?screen_id=${screenId}`)
        .then((res) => {
            callback(res.data.info);
            return res.data.info;
        }).catch((err) => {
            console.log(err);
        });
}

export async function getSprint_in_testcase(projectId, webtestcaseid) {
    return axios
        .get(
            //  `${baseUrl}/${qfservice}/webtestcase/getTestcaseSprints?api_testcase_id=${apitestcaseid}&web_testcase_id=${webtestcaseid}`
            `${qfservice}/webtestcase/getTestcaseSprints?project_id=${projectId}&testcase_id=${webtestcaseid}`
        )
        .then((res) => {
            if (res.data.info === null) {
                return [];
            }
            return res.data.info?.filter((sprint) => sprint.is_selected);
        }).catch((err) => {
            console.log(err);
        });
}

export async function getTestcaseDetails(testcaseId, callback) {
    return await axios
        .get(
            `${qfservice}/webtestcase/getWebTestcaseInfo?testcase_id=${testcaseId}`
        )
        .then((res) => {
            return res.data.info ?? {};
        }).catch((err) => {
            console.log(err);
        });
}

// testset service

export function getTestsets(callback, projectId, workflowID) {
    axios
        .get(
            qfservice +
            "/webtestset/api/v1/projects/" +
            projectId +
            "/workflow/" +
            workflowID +
            "/web/testsets"
        )
        .then((res) => {
            callback(res.data.data ?? []);
        }).catch((err) => {
            console.log(err);
        });
}

export function getTestcasesInProjects(
    callback,
    projectId,
    applicationId,
    testsetId
) {
    axios
        .get(
            qfservice +
            `/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
        )
        .then((res) => {
            callback(res.data.info ?? []);
        });
    axios
        .get(
            qfservice +
            `/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
        )
        .then((res) => {
            callback(res.data.info ?? []);
        }).catch((err) => {
            console.log(err);
        });
}

export function createTestset(data) {
    axios
        .post(qfservice + "/webtestset/createWebTestset", data)
        .then((res) => { }).catch((err) => {
            console.log(err);
        });
    axios
        .post(`${qfservice}/webtestset/createWebTestset`, data)
        .then((res) => { }).catch((err) => {
            console.log(err);
        });
}

export function updateTestset(data) {
    axios
        .post(`${qfservice}/webtestset/createWebTestset`, data)
        .then((res) => { }).catch((err) => {
            console.log(err);
        });
}

export async function getEnvironment(projectId, moduleId, callback) {
    return await axios
        .get(
            `${qfservice}/build-environment?project_id=${projectId}&module_id=${moduleId}`
        )
        .then((res) => {
            callback(res.data.data ?? []);
            return res.data.data;
        }).catch((err) => {
            console.log(err);
        });
}

export async function getExecutionLocation(projectId, moduleId, callback) {
    return await axios
        .get(
            `${qfservice}/execution-environment?module_id=${moduleId}&project_id=${projectId}`
        )
        .then((res) => {
            callback(res.data.data ?? []);
            return res.data.data;
        }).catch((err) => {
            console.log(err);
        });
}
export async function getTestcaseInTestset(testsetId, callback) {
    return await axios
        .get(
            `${qfservice}/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
        )
        .then((res) => {
            callback(res.data.info);
            return res.data.info;
        }).catch((err) => {
            console.log(err);
        });
}
export async function getCustomCodeList(moduleId, userId, callback) {
    return await axios
        .get(`${qfservice}/customcode?module_id=${moduleId}&user_id=${userId}`)
        .then((res) => {
            callback(res.data);
        }).catch((err) => {
            console.log(err);
        });
}
export async function getCustomCode(codeId, callback) {
    return await axios
        .get(`${qfservice}/customcodeById?Id=${codeId}`)
        .then((res) => {
            callback(res.data);
        }).catch((err) => {
            console.log(err);
        });
}

export async function customCodeCreate(postdata, callback) {
    return await axios
        .post(`${qfservice}/addcustomcode`, postdata)
        .then((res) => {
            callback({
                status: true,
                message: res.data.message,
                severity: res.data.status,
            });
        }).catch((err) => {
            console.log(err);
        });
}

export async function customCodeDelete(id, callback) {
    return await axios
        .post(`${qfservice}/deletecustomcode?customcode_id=${id}`)
        .then((res) => {
            callback({
                status: true,
                message: res.data.message,
                severity: res.data.status,
            });
        }).catch((err) => {
            console.log(err);
        });
}
