import axios from "axios"
import { baseUrl } from "../Environment"

export function getTestsets(callback, projectId,workflowID) {
    console.log("called")
    axios.get(baseUrl + "qfservice/webtestset/api/v1/projects/"+projectId+"/workflow/"+workflowID+"/web/testsets").then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}

export function getTestcasesOfTestset(callback, workflowID,testsetId) {
    console.log("called")
    console.log(testsetId);
    axios.get(baseUrl + "/workflow/" + workflowID + "/api/testsets/"+ testsetId +"/testcases").then(res => {
        console.log(res.data.data)
        callback(res.data.data)
    })
}

export function getTestcaseDetails(callback, workflowID,testcaseId) {
    console.log("called")
    axios.get(baseUrl + "/module/" + workflowID + "/GetTestcaseDetailsById/"+ testcaseId ).then(res => {
        console.log(res.data.data.testcase)
        callback(res.data.data.testcase)
    })
}

export function createTestset(data) {
    console.log("called")
    axios.post("http://10.11.12.240/qfservice/webtestset/createWebTestset",data ).then(res => {
        console.log("Testset Created Successfully" );
    })
}

export function updateTestset(data) {
    console.log("called")
    axios.post("http://10.11.12.240/qfservice/webtestset/createWebTestset",data ).then(res => {
        console.log("Testset Created Successfully" );
    })
}