import axios from "axios";
import {
  authservice,
  biservice,
  dashboard,
  qfservice,
  report,
  userservice,
} from "../Environment";

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
      callback(res.data.data);
    });
}

export function getTestcaseDetails(callback, workflowID, testcaseId) {
  axios
    .get(
      qfservice +
        "/module/" +
        workflowID +
        "/GetTestcaseDetailsById/" +
        testcaseId
    )
    .then((res) => {
      callback(res.data.data.testcase);
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
        `${qfservice}/qfservice/webtestcase/getWebTestcasesInfoByProjectIdByApplicationId?project_id=${projectId}&module_id=${applicationId}`
    )
    .then((res) => {
      callback(res.data.info ?? []);
    });
}

export function createTestset(data) {
  axios
    .post(`${qfservice}/qfserviceebtestset/createWebTestset`, data)
    .then((res) => {
      console.log("Testset Created Successfully");
    });
}

export function updateTestset(data) {
  axios
    .post(`${qfservice}/qfserviceebtestset/createWebTestset`, data)
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
      callback(res.data ?? []);
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
