import axios from "../../api/axios";


export function GetJiraProjectsAndSprints(callback, jiraUserId) {
   axios
      .postForm(`/qfservice/getJiraProjectsAndSprints`, {
        jira_user_id: jiraUserId
       
      })
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
