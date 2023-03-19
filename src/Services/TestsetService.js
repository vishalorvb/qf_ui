import axios from "axios"
import { baseUrl } from "../Environment"

export function getTestsets(callback, projectId,workflowID) {
    console.log("called")
    axios.get(baseUrl + "qfservice/webtestset/api/v1/projects/"+projectId+"/workflow/"+workflowID+"/web/testsets").then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}

export function getTestcasesOfTestset(callback,testsetId) {
    console.log("called")
    console.log(testsetId);
    axios.get(baseUrl + `/qfservice/webtestset/getTestcasesInWebTestset?testset_id=${testsetId}`).then(res => {
        console.log(res.data.info);
        callback(res.data.info);
    })
}

export function getTestcaseDetails(callback, workflowID,testcaseId) {
    console.log("called")
    axios.get(baseUrl + "/module/" + workflowID + "/GetTestcaseDetailsById/"+ testcaseId ).then(res => {
        console.log(res.data.data.testcase)
        callback(res.data.data.testcase)
    })
}

export function getTestcasesInProjects(callback,projectId) {
    console.log("called")
    axios.get(baseUrl + `/qfservice/webtestcase/getWebTestcasesInfoByProject?project_id=${projectId}`).then(res => {
        console.log(res.data.info);
        callback(res.data.info);
    })
} 

export function createTestset(data) {
    console.log("called")
    axios.post("http://10.11.12.243/qfservice/webtestset/createWebTestset",data ).then(res => {
        console.log("Testset Created Successfully" );
    })
}

export function updateTestset(data) {
    console.log("called")
    axios.post("http://10.11.12.243/qfservice/webtestset/createWebTestset",data ).then(res => {
        console.log("Testset Created Successfully" );
    })
}