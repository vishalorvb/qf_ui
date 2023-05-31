import axios from "../../api/axios";


export function GetJiraProjectsAndSprints(callback, projectId) {
   axios
      .post(`/qfservice/getJiraProjectsAndSprints?sqe_project_id=${projectId}`)
      .then((resp) => {
       if( resp?.data?.status == 'SUCCESS')
       { 
        const details = resp?.data?.info
        callback(details);
        }
      });
  }

  export function GetJiraIssues(callback, userId,projectId,projectKey,sprintName,statuses) {
   axios
      .post(`/qfservice/getJiraIssues?user_id=${userId}&project_id=${projectId}`, {
        project_key: projectKey,
        sprint_name: sprintName,
        statuses: statuses
      })
      .then((resp) => {
       const details = resp?.data?.info
       callback(details)
      });
  }

  export function syncJiraSprintsIssues(callback,projectId) {
    axios
       .post(`/qfservice/syncJiraSprintsIssues?project_id=${projectId}`)
       .then((resp) => {
        console.log(resp)
        callback(resp)
       });
   }
