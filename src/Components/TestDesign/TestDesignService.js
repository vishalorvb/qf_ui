import axios from "axios";
import { qfservice } from "../../Environment";

export function GetJiraProjectsAndSprints(callback, projectId) {
  axios
    .post(
      `${qfservice}/qfservice/getJiraProjectsAndSprints?sqe_project_id=${projectId}`
    )
    .then((resp) => {
      if (resp?.data?.status === "SUCCESS") {
        const details = resp?.data?.info;
        callback(details);
      }
    });
}

export function GetJiraIssues(
  callback,
  userId,
  projectId,
  projectKey,
  sprintName,
  statuses
) {
  axios
    .post(
      `${qfservice}/qfservice/getJiraIssues?user_id=${userId}&project_id=${projectId}`,
      {
        project_key: projectKey,
        sprint_name: sprintName,
        statuses: statuses,
      }
    )
    .then((resp) => {
      const details = resp?.data?.info;
      callback(details);
    });
}

export function syncJiraSprintsIssues(callback, projectId) {
  axios
    .post(
      `${qfservice}/qfservice/syncJiraSprintsIssues?project_id=${projectId}`
    )
    .then((resp) => {
      console.log(resp);
      callback(resp);
    });
}
