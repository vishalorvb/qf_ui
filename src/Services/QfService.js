import axios from "../api/axios";
import { qfservice } from "../Environment";

export function getApis(callback, applicationId) {
  axios.get(`${qfservice}/qfservice/${applicationId}/apis`).then((res) => {
    callback(res.data.data.apisList);
  });
}

export async function createApiRequest(data) {
  let x = axios({
    method: "post",
    data: data,
    url: `${qfservice}/qfservice/createapi`,
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
    .post(`${qfservice}/qfservice/deleteapi?api_id=${apiId}`)
    .then((res) => {
      return true;
    })
    .catch((res) => {
      return false;
    });
  return x;
}

export function getApiDatasets(callback, testcaseId) {
  axios
    .get(`${qfservice}/qfservice/api/testcases/${testcaseId}/datasets`)
    .then((res) => {
      if (res.data.data != null) {
        callback(res.data.data);
      }
    });
}

export function getDatasetDetails(callback, datasetId) {
  axios({
    method: "post",
    url: `${qfservice}/qfservice/GetDatasetDetailsByDatasetId?dataset_id=${datasetId}`,
  }).then((res) => {
    callback(res.data.data.apidatasets);
  });
}

export async function createApiDataset(userId, Data) {
  let x = await axios({
    method: "post",
    url: `${qfservice}/qfservice/createdataset?userId=${userId}`,
    data: Data,
  }).then((res) => {
    if (res.data.error == null) {
      return false;
    } else {
      console.log(res.data.error.description);
      return res.data.error.description;
    }
  });
  return x;
}

export async function DeleteApiDataset(datasetId) {
  let x = await axios({
    method: "post",
    url: `${qfservice}/qfservice/DeleteDataset?dataset_id=${datasetId}`,
  }).then((res) => {
    if (res.data.message !== null) {
      return true;
    } else {
      return false;
    }
  });
  return x;
}

export async function getApiDetails(callback, apiId) {
  return axios
    .post(`${qfservice}/qfservice/getapibyid?api_id=${apiId}`)
    .then((res) => {
      callback(res.data?.data);
      return res.data?.data;
    });
}

export async function updateApiOrder(data) {
  return await axios({
    method: "post",
    url: `${qfservice}/qfservice/UpdateOrderOfAPIsInTestcase`,
    data: data,
  }).then((res) => {
    return res.data;
  });
}

//Application Service

export function getApplication(callback, userId) {
  axios
    .get(`${qfservice}/qfservice/users/applications?user_id=${userId}`)
    .then((res) => {
      callback(res.data.data);
    });
}
//export function getWebApplication(callback, userId, apptype) {
//    axios
//        .get(`${qfservice}/qfservice/users/applications?user_id=${userId}`)
//        .then((res) => {
//            let webapp = res.data.data.filter((app) => {
//                if (app.module_type == apptype) {
//                    return app;
//                }
//            });
//            console.table(webapp);
//            callback(webapp);
//        });
//}

export async function createApplication(data, userId) {
  let x = await axios({
    method: "post",
    data: data,
    url: `${qfservice}/qfservice/savemodule.do?user_id=${userId}`,
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

//export function getPages(callback, applicationId) {
//    axios
//        .get(
//            `${qfservice}/qfservice/webpages/getWebPagesList?module_id=${applicationId}`
//        )
//        .then((res) => {
//            console.log(res.data);
//            if (res.data.info != null) {
//                callback(res.data.info);
//            }
//        });
//}

export function getElementsDetails(callback, element_id, isDiffElement) {
  axios
    .get(
      `${qfservice}/qfservice/webpages/getWebPageElementPathsInfo?element_id=${element_id}&is_diff_page_element=${isDiffElement}`
    )
    .then((res) => {
      console.log(res.data.info);
      callback(res.data.info);
    });
}

export function getApplicationOfProject(callback, project_id) {
  axios
    .get(
      `${qfservice}/qfservice/projects/applications?project_id=${project_id}`
    )
    .then((res) => {
      callback(res.data.data);
    });
}

export async function deleteApplication(applicationId, userId) {
  console.log(applicationId);
  return await axios
    .put(
      `${qfservice}/qfservice/Application/Delete?app_id=${applicationId}&user_id=${userId}`
    )
    .then((res) => {
      console.log(res.data.status);
      if (res.data.status == "SUCCESS") {
        return true;
      }
      return false;
    });
}

//export async function getApplicationDetails(applicationId) {
//    let x = await axios
//        .get(`${qfservice}/qfservice/getmoduledetails/${applicationId}`)
//        .then((res) => {
//            return res.data.data;
//        });
//    return x;
//}

// Devops service
export function getPipelines(callback, project_id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${qfservice}/qfservice/pipeline/${project_id}`).then((res) => {
    callback(res?.data?.data);
  });
}

export function getPipelinesHistory(callback, release_log, id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${qfservice}/qfservice/pipeline/${id}/release`).then((res) => {
    callback(res?.data?.data?.pipelinehisotory);
    release_log(res?.data?.data1);
  });
}

export function getCreatePipelineData(
  callback,
  setdefaultData,
  id,
  project_id
) {
  axios
    .get(`${qfservice}/qfservice/project/${project_id}/pipeline/${id}`)
    .then((res) => {
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
    });
}

export function getPipelinesHistoryReport(callback, setError, id, tag) {
  // This function except name of state as a callback and set value in that state
  axios
    .get(`${qfservice}/qfservice/pipeline/report/${id}/${tag}`)
    .then((res) => {
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
    .post(
      `${qfservice}/qfservice/executepipeline?release_id=${id}&user_id=${userId}`
    )
    .then((res) => {
      callback(res?.data?.message);
    });
}

//export function createPipeline(callback, params, id, project_id, userId) {
//    axios
//        .post(`${qfservice}/qfservice/Createpipeline`, null, {
//            params: {
//                project_id: project_id,
//                release_name: params.releaseName,
//                release_desc: params.releaseDesc,
//                ansiblereleaseId: params.release,
//                webTestsetId: params.webTest,
//                code_quality_path: params.sonrCubePath,
//                code_quality_project_key: params.sonrCubeKey,
//                unittesttestset_path: params.unitTestPath,
//                apiTestsetid: params.ApiTest,
//                cicd_type: params.cicdType,
//                user_id: userId,
//                release_id: id,
//            },
//        })
//        .then((res) => {
//            callback(res?.data?.data.pipelinehisotory);
//        });
//}

export async function getReleaseInstances(callback, project_id) {
  return await axios
    .get(`${qfservice}/qfservice/release-management/${project_id}`)
    .then((res) => {
      res?.data?.data !== null && callback(res?.data?.data);
    });
}

export async function deleteInstance(projectId, instanceId) {
  return await axios
    .delete(
      `${qfservice}/qfservice/DeleteRelease?release_id=${instanceId}&project_id=${projectId}`
    )
    .then((resp) => {});
}

export async function getGitData(callback, releaseId, historyId, projectId) {
  axios
    .get(
      `${qfservice}/qfservice/pipelinelogs/${releaseId}/logs/${historyId}?projectId=${projectId}`
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
    });
}

export async function getReleaseHistory(projectId, releaseId, callback) {
  axios
    .get(
      `${qfservice}/qfservice/project/${projectId}/ansible-release/${releaseId}/release-history`
    )
    .then((res) => {
      callback([res.data.data.webReleaseHistories] ?? []);
    });
}

export async function release(projectId, releaseId, userId) {
  return await axios
    .post(
      `${qfservice}/qfservice/ExecuteRelease?release_id=${releaseId}&project_id=${projectId}&user_id=${userId}`
    )
    .then((res) => {
      if (res.data.status == "FAIL") return false;
      else return res.data.info.id;
    });
}

//Project service

export async function getProject(callback, userId) {
  return await axios
    .get(`${qfservice}/qfservice/getProjectsOfUser?userId=${userId}`)
    .then((res) => {
      callback(res.data.info ?? []);
    });
}

export function getProjectDetails(callback, userId, projectId) {
  axios
    .get(
      `${qfservice}/qfservice/projects/getProjectDetailsByProjectIdAndUserId?user_id=${userId}&project_id=${projectId}`
    )
    .then((res) => {
      callback(res.data.data);
    });
}

export async function makeProjectFav(userId, projectId, value) {
  return await axios
    .post(
      `${qfservice}/qfservice/makeFavourateProject?userId=${userId}&projectId=${projectId}&isFav=${value}`
    )
    .then((res) => {});
}

export async function createProject(data) {
  let res = await axios({
    method: "post",
    url: `${qfservice}/qfservice/createProject`,
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
    url: `${qfservice}/qfservice/updateProject`,
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
      `${qfservice}/qfservice/projects/Delete?project_id=${projectid}&user_id=${userid}`
    )
    .then((r) => {
      return r.data.status;
    });
  return res;
}

export async function getUsers(callback, orgid, ssoid, token) {
  return await axios
    .get(
      `${qfservice}/qfservice/user/listUsers?orgId=${orgid}&ssoId=${ssoid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      callback(res.data.info);
      return res.data.info;
    });
}

export async function getUserOfProject(callback, projectId, userId) {
  return await axios
    .get(
      `${qfservice}/qfservice/projects/getUsersDetailsByProjectId?project_id=${projectId}`
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
      `${qfservice}/qfservice/loadJiraProjects?url=${url}&userName=${username}&password=${password}&its_type=${itstype}&org_name=${orgname}&orgId=${orgid}`
    )
    .then((res) => {
      callback(res.data.info);
      return res.data.info === null ? false : true;
    });
}

//Testcase Service

export async function CreateDataset(data) {
  let x = await axios({
    method: "post",
    data: data,
    url: `${qfservice}/qfservice/webdataset/web-createDataset`,
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
      `${qfservice}/qfservice/webtestcase/api/v1/projects/${projectId}/workflow/${applicationId}/web/testcases/${testcaseId}/datasets`
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
      `${qfservice}/qfservice/webdataset/getScreensAndElementsInTestcaseByTestcaseIdorDatasetId?testcase_id=${testcaseId}&dataset_id=${datasetId}`
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
      `${qfservice}/qfservice/webdataset/deleteWebDataset?dataset_id=${datasetId}`
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
    url: `${qfservice}/qfservice/webtestcase/CreateWebTestCase`,
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
    url: `${qfservice}/qfservice/createApiTestCaseAddApisToTestcase`,
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
      `${qfservice}/qfservice/webtestcase/deleteWebTestcase?testcase_id=${testcaseId}`
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
      `${qfservice}/qfservice/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId`,
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

export async function getAlltestcaseOfApplicationandSubapplication(
  projectId,
  moduleId,
  callback
) {
  return await axios
    .get(
      `${baseUrl}/qfservice/getModuleAndTestcases?projectId=${projectId}&moduleId=${moduleId}`
    )
    .then((res) => {
      callback(res.data ?? []);
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
      `${qfservice}/qfservice/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId1`,
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
    .get(`${qfservice}/qfservice/getsprints?project_id=${projectId}`)
    .then((res) => {
      callback(res.data.data.sprints ?? []);
      return res.data.data.sprints ?? [];
    });
}

export function getIssues(callback, userId, projectId, data) {
  axios({
    method: "post",
    url: `${qfservice}/qfservice/getJiraIssues?user_id=${userId}&project_id=${projectId}`,
    data: data,
  }).then((res) => {
    callback(res.data.info);
  });
}

export async function getPagesForTestcase(callback, projectId, moduleId) {
  return await axios
    .get(
      `${qfservice}/qfservice/webtestcase/getScreensForTestcase?module_id=${moduleId}&project_id=${projectId}`
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
      `${qfservice}/qfservice/webtestcase/getScreensInTestcase?module_id=${moduleId}&project_id=${projectId}&testcase_id=${testcaseId}`
    )
    .then((res) => {
      callback(res.data.info === null ? [] : res.data.info[0]?.webpagesList);
    });
}

export function getApiOfApplication(callback, moduleId) {
  axios
    .get(`${qfservice}/qfservice//testcase/${moduleId}/apisByModuleId`)
    .then((res) => {
      callback(res.data.data.apisList);
    });
}

export function getApiOfTestcase(callback, testcaseId) {
  axios
    .get(`${qfservice}/qfservice/testcase/${testcaseId}/apis`)
    .then((res) => {
      callback(res.data.data.apisList);
    });
}

export async function getElement(screenId, callback) {
  return await axios
    .get(
      `${qfservice}/qfservice/screen/getScreenElementsList?screen_id=${screenId}`
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
      `${qfservice}/qfservice/webtestcase/getTestcaseSprints?project_id=${projectId}&testcase_id=${webtestcaseid}`
    )
    .then((res) => {
      if (res.data.info == null) {
        return [];
      }
      return res.data.info?.filter((sprint) => sprint.is_selected);
    });
}

export async function getTestcaseDetails(testcaseId, callback) {
  return await axios
    .get(
      `${qfservice}/qfservice/webtestcase/getWebTestcaseInfo?testcase_id=${testcaseId}`
    )
    .then((res) => {
      return res.data.info ?? {};
    });
}

// testset service

export function getTestsets(callback, projectId, workflowID) {
  axios
    .get(
      qfservice +
        "/qfservice/webtestset/api/v1/projects/" +
        projectId +
        "/workflow/" +
        workflowID +
        "/web/testsets"
    )
    .then((res) => {
      callback(res.data.data);
    });
  axios
    .get(
      qfservice +
        "/qfservice/webtestset/api/v1/projects/" +
        projectId +
        "/workflow/" +
        workflowID +
        "/web/testsets"
    )
    .then((res) => {
      callback(res.data.data);
    });
}

//export function getTestcaseDetails(callback, workflowID, testcaseId) {
//    axios
//        .get(
//            baseUrl +
//            "/module/" +
//            workflowID +
//            "/GetTestcaseDetailsById/" +
//            testcaseId
//        )
//        .then((res) => {
//            callback(res.data.data.testcase);
//        });
//    axios
//        .get(
//            qfservice +
//            "/module/" +
//            workflowID +
//            "/GetTestcaseDetailsById/" +
//            testcaseId
//        )
//        .then((res) => {
//            callback(res.data.data.testcase);
//        });
//}

export function getTestcasesInProjects(
  callback,
  projectId,
  applicationId,
  testsetId
) {
  axios
    .get(
      qfservice +
        `/qfservice/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
    )
    .then((res) => {
      callback(res.data.info ?? []);
    });
  axios
    .get(
      qfservice +
        `/qfservice/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
    )
    .then((res) => {
      callback(res.data.info ?? []);
    });
}

export function createTestset(data) {
  axios
    .post(qfservice + "/qfservice/webtestset/createWebTestset", data)
    .then((res) => {
      console.log("Testset Created Successfully");
    });
  axios
    .post(`${qfservice}/qfservice/webtestset/createWebTestset`, data)
    .then((res) => {
      console.log("Testset Created Successfully");
    });
}

export function updateTestset(data) {
  axios
    .post(`${qfservice}/qfservice/webtestset/createWebTestset`, data)
    .then((res) => {
      console.log("Testset Created Successfully");
    });
}

export async function getEnvironment(projectId, moduleId, callback) {
  return await axios
    .get(
      `${qfservice}/qfservice/build-environment?project_id=${projectId}&module_id=${moduleId}`
    )
    .then((res) => {
      callback(res.data.data ?? []);
      return res.data.data;
    });
}

export async function getExecutionLocation(projectId, moduleId, callback) {
  return await axios
    .get(
      `${qfservice}/qfservice/execution-environment?module_id=${moduleId}&project_id=${projectId}`
    )
    .then((res) => {
      callback(res.data.data ?? []);
      return res.data.data;
    });
}
export async function getTestcaseInTestset(testsetId, callback) {
  return await axios
    .get(
      `${qfservice}/qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`
    )
    .then((res) => {
      callback(res.data.info);
      return res.data.info;
    });
}
