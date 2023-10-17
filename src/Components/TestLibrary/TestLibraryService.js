import axios from "axios";
import { qfservice } from "../../Environment";

export function GetSprintsOfJiraProject(callback, userId, projectId) {
  axios
    .postForm(
      `${qfservice}/qfservice/getSprintsOfJiraProject?user_id=${userId}&project_id=${projectId}`
    )
    .then((resp) => {
      callback(resp?.data?.info);
    });
}

export function GetIssuesOfTestlibrary(callback, sprintName, key, projectId) {
  axios
    .postForm(
      `${qfservice}/qfservice/getIssuesOfTestlibrary?sprint_name=${sprintName}&key=${key}&project_id=${projectId}`
    )
    .then((resp) => {
      callback(resp);
    });
}

export function GetTestLibrary(
  callback,
  projectId,
  userId,
  projectKey,
  sprintName,
  issueKey
) {
  let data = {
    project_key: projectKey,
    sprint_name: sprintName,
    issue_key: issueKey,
  };
  axios
    .post(
      `${qfservice}/qfservice/getTestLibrary?project_id=${projectId}&user_id=${userId}`,
      data
    )
    .then((resp) => {
      callback(resp?.data?.info);
    });
}
export function ExportManualTestcases(
  callback,
  projectId,
  userId,
  projectKey,
  sprintKey,
  issueKey
) {
  axios
    .get(
      `${qfservice}/qfservice/export-manual-testcases/${projectKey}/${sprintKey}/${issueKey}?project_id=${projectId}&user_id=${userId}`
    )
    .then((resp) => {
      callback(resp?.data?.info);
    });
}

export function UploadManualTestcasesExcelFile(callback, postData) {
  axios
    .postForm(`${qfservice}/qfservice/uploadManualTestcasesExcelFile`, postData)
    .then((resp) => {
      console.log(resp);
      callback(resp);
    });
}

export async function DeleteManualTestcase(testcaseId) {
  let x = await axios
    .post(
      `${qfservice}/qfservice/deleteManualTestcase?manual_testcase_id=${testcaseId}`
    )
    .then((res) => {
      if (res.data.status == "SUCCESS") {
        return true;
      }
      return false;
    });
  return x;
}
