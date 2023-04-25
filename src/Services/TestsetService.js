import axios from "axios"
import { baseUrl } from "../Environment"

export function getTestsets(callback, projectId,workflowID) {
    axios.get(baseUrl + "qfservice/webtestset/api/v1/projects/"+projectId+"/workflow/"+workflowID+"/web/testsets").then(res => {
        callback(res.data.data)
    })
}

export function getTestcasesOfTestset(callback,testsetId) {
    console.log(testsetId);
    axios.get(baseUrl + `/qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`).then(res => {
        callback(res.data.info);
    })
}

export function getTestcaseDetails(callback, workflowID,testcaseId) {
    axios.get(baseUrl + "/module/" + workflowID + "/GetTestcaseDetailsById/"+ testcaseId ).then(res => {
        callback(res.data.data.testcase)
    })
}

export function getTestcasesInProjects(callback,projectId) {
    axios.get(baseUrl + `/qfservice/webtestcase/getWebTestcasesInfoByProject?project_id=${projectId}`).then(res => {
        callback(res.data.info);
    })
} 

export function createTestset(data) {
    axios.post("http://10.11.12.243/qfservice/webtestset/createWebTestset",data ).then(res => {
        console.log("Testset Created Successfully" );
    })
}

export function updateTestset(data) {
    axios.post("http://10.11.12.243/qfservice/webtestset/createWebTestset",data ).then(res => {
        console.log("Testset Created Successfully" );
    })
}