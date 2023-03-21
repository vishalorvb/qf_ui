import axios from "axios";
import { async } from "q";
import { baseUrl } from "../Environment";

export async function createWebTestCase(data) {
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/webtestcase/web-createTestcase`,
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

export async function createApitestcase(data) {
  let res = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/CreateNewTestcase`,
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

export async function createNewtestCase(data) {
  let pid = data.project_id;
  let aid = data.application_id;
  delete data.application_id;
  delete data.project_id;
  let res = axios({
    method: "post",
    url: `${baseUrl}/qfservice/webtestcase/web-createTestcase?projectId=${pid}&applicationId=${aid}`,
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
// export async function createNewtestCase(data) {
//     let pid = data.project_id
//     let aid = data.application_id
//     delete data.application_id
//     delete data.project_id
//     let res = axios({
//         method: 'post',
//         url: `${baseUrl}/qfservice/webtestcase/web-createTestcase?projectId=${pid}&applicationId=${aid}`,
//         data: data
//     }).then(response => {
//         return response.data.status
//     })
//         .catch(err => {
//             return "error"
//         })
//     return res
// }


export function getTestcase(callback, project_id) {
  axios
    .get(
      `${baseUrl}/qfservice/webtestcase/getWebTestcasesInModule?project_id=${project_id}`
    )
    .then((res) => {
      if (res.data.info != null) {
        callback(res.data.info);
      }
    });
}

export function getElementsList(callback, screenId) {
  axios
    .get(
      `${baseUrl}/qfservice/screen/getScreenElementsList?screen_id=${screenId}`
    )
    .then((res) => {
      callback(res.data.info);
    });
}

export async function CreateDataset(data) {
    let x = await axios({
        method:'post',
        data:data,
        url:`${baseUrl}/qfservice/webdataset/web-createDataset`
    }).then(res=>{

        if(res.data.status === "SUCCESS"){
        
            return true
        }
        else{
            return false
        }
    })
 
    return x
}

export function getDataset(callback,projectId,applicationId,testcaseId){
    axios.get(`${baseUrl}/qfservice/webtestcase/api/v1/projects/${projectId}/workflow/${applicationId}/web/testcases/${testcaseId}/datasets`).then(res=>{
        callback(res.data.result)
    })
}

export function getData_for_createDataset(callback, testcaseId, datasetId = 0) {
  axios
    .get(
      `${baseUrl}/qfservice/webdataset/getScreensAndElementsInTestcaseByTestcaseIdorDatasetId?testcase_id=${testcaseId}&dataset_id=${datasetId}`
    )
    .then((res) => {
      callback(res.data.info);
    });
}


export async function deleteDataset(datasetId){
  let x = axios.delete(`${baseUrl}/qfservice/webdataset/deleteWebDataset?dataset_id=${datasetId}`).then(res=>{
    if(res.data.status == "SUCCESS"){
      return true
    }
    else{
      return false
    }
  })
  return x
}